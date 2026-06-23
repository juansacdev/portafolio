---
title: 'La columna status te va a fallar (y la de balance también)'
description: 'Guardar el estado actual de una entidad es lo más natural del mundo. También es la decisión que más caro te va a cobrar en un sistema financiero.'
pubDate: 2026-06-09
lang: es
slug: la-columna-status-te-va-a-fallar
translationSlug: the-status-column-will-fail-you
tags: [fintech, event sourcing, ledger, arquitectura, backend]
readingTime: '7 min de lectura'
status: published
---

Ninguno quiere entrar a su cuenta bancaria y ver que de la nada tiene menos dinero. Ya sea un banco, un procesador de pagos o un agregador, lo más importante en un sistema financiero es la consistencia e integridad de los datos. Que el saldo nunca mienta.

Esto que voy a contar no lo aprendí en un libro. Lo aprendí lidiando con la pregunta incómoda: *"¿cómo reconstruimos qué pasó?"* — y descubriendo que con el diseño que teníamos, no se podía. Lo voy a contar como yo lo viví: por niveles, porque casi nadie llega al problema de una. Se llega de a poco.

## Nivel 1: una columna `status`

Empiezas con lo obvio. Tienes una entidad —una orden, un pago, una cuenta— y necesitas saber en qué estado está. Le pones una columna `status`: `pending`, `processing`, `done`.

Funciona. Para la mayoría de productos, funciona perfecto. La mayoría arrancamos así, guardando el estado actual de la entidad, y está bien.

## Nivel 2: las transiciones permitidas

Crece un poco. Ahora no basta con saber el estado: hay estados a los que no puedes saltar. Un pago `done` no debería volver a `pending`. Un `failed` no debería pasar a `processing`.

Entonces defines transiciones permitidas. Y cuando hay más de tres estados, la lógica de "cuál puede pasar a cuál" empieza a complicarse: combinaciones válidas, combinaciones imposibles, casos raros. Lo resuelves con una máquina de estados y sigues.

## Nivel 3: la pregunta que ni el código ni la base de datos pueden responder

Y un día llega la pregunta que rompe todo:

> *"¿Cómo estaba esto el miércoles pasado a las 4:30pm?"*

Y te das cuenta de algo: siempre estuviste guardando **el último** estado. Sobrescribiendo. Cada `UPDATE` borró la versión anterior. No tienes forma de reconstruir la historia en un punto del tiempo, porque la historia nunca se guardó.

Ni el código la puede calcular ni la base de datos la tiene. Simplemente no existe.

En un sistema cualquiera, eso es molesto. En finanzas, es inaceptable: auditoría, disputas, reconciliación, regulación — todo eso necesita responder *qué pasó y cuándo*, no solo *qué hay ahora*.

## Eso tiene un nombre: event sourcing

La solución no es una columna mejor. Es invertir quién manda.

En lugar de guardar el estado actual y actualizarlo, guardas un registro de **movimientos** que solo crece (*append-only*) y nunca se edita (*inmutable*). El estado actual lo **derivas** de ese registro.

Eso se llama **event sourcing**: tu fuente de verdad es la secuencia de cosas que pasaron, no una foto del presente. El presente es un cálculo.

(Un aparte que vale la pena: *event sourcing* no es lo mismo que *event-driven*. Event-driven es cómo se comunican tus componentes; event sourcing es cómo persistes la verdad. Se confunden todo el tiempo.)

## En finanzas se llama ledger (y tiene un truco contable)

Cuando aplicas event sourcing al dominio financiero, tienes un **ledger**. Y los ledgers traen una pieza que casi nunca se menciona en los posts de arquitectura: la **doble partida contable** (*double-entry accounting*).

La idea, sin contaduría de por medio:

- cada movimiento tiene dos lados que tienen que cuadrar — débitos y créditos, una columna que suma y otra que resta
- entre ambas se cancelan: su suma da cero

¿Por qué importa? Porque **la doble partida no impide el error: lo hace imposible de esconder.** Si las dos columnas no cancelan a cero, los libros no cuadran, y *sabes al instante* que algo se rompió. Es un check de consistencia incorporado en el modelo de datos. No es un escudo mágico — es un detector que no se puede apagar.

## No es botar la columna: es quitarle la corona

Acá está la parte que más cuesta entender, y la que reconcilia todo lo anterior.

Pasar a un ledger **no significa** botar la columna `balance` ni la columna `status`. Significa cambiarlas de lugar.

El balance no desaparece. Deja de ser **la verdad** y pasa a ser una **vista** — una proyección, una derivación, una foto del log. La fuente de verdad es el registro de movimientos; el balance (y el status) los derivas de ahí, y los puedes reconstruir cuando quieras.

Por eso digo que el ledger va **desde el día uno**: no porque tengas que renunciar a leer un balance rápido, sino porque ese dato siempre debió ser un cálculo reconstruible, no algo que editas a mano y cruzas los dedos para que ningún bug lo deje inconsistente.

El `status` no se borra de la historia. Solo se le quita la corona.

## "Pero eso no escala" — los snapshots

La objeción aparece de inmediato: si el balance se deriva sumando *todos* los movimientos, ¿qué pasa cuando una cuenta tiene dos millones de asientos? ¿Sumas dos millones de filas cada vez que alguien pregunta cuánto tiene?

No. En la práctica **materializas snapshots**: cada cierto punto guardas un balance ya calculado ("hasta el asiento N, el balance era Y"). Una lectura toma el último snapshot y solo suma lo que vino después. Rápido.

La clave: **el snapshot es un caché, no la verdad.** Si dudas de él, lo reconstruyes re-derivando desde el log. La analogía más limpia es git: el log de commits es la verdad inmutable, pero no relees toda la historia para saber el estado actual — tienes un working tree (el snapshot). Si se daña, lo regeneras desde los commits. Nunca al revés.

## El ledger no es gratis

Y no, un ledger no es gratis. Ni es una bala de plata. Es más código, es más difícil de consultar, y te obliga a pensar en cosas que con un CRUD ignorabas.

La **idempotencia**, por ejemplo. En pagos los reintentos son la norma, no la excepción: la red se cae, el usuario le da doble click, el webhook llega dos veces. Si cada request escribe un movimiento sin más, terminaste cobrando dos veces. Con un log append-only tienes que garantizar que el mismo evento, llegue las veces que llegue, produzca un solo cambio.

Suena obvio hasta que lo implementas. Pero ese es justo el punto del ledger: no te quita la complejidad, te la pone enfrente desde el día uno en vez de escondértela hasta que un cliente reclama que le descontaron el doble.

## Lo que de verdad aprendí

No escribo esto desde la teoría. Lo viví construyendo una stablecoin. Y lo más interesante no es que no supiéramos cuál era el camino correcto — lo sabíamos. En algún momento la contabilidad sí corrió sobre un ledger inmutable de verdad.

Lo que pasó es más mundano y más aterrador: el proveedor de ese ledger lo deprecó, tocó migrar, la migración a la nueva solución quedó a medias, y mientras tanto buena parte del sistema siguió funcionando sobre columnas `status` y fe. Y no solo la parte financiera. Todo.

Esa es la parte que nadie te cuenta: muchas veces el equipo *sabe* cuál es el patrón correcto. El problema es que la arquitectura se decide el día uno, cuando todo es pequeño y un ledger parece sobre-ingeniería — y para cuando duele, migrar los cimientos con plata real corriendo encima cuesta diez veces más.

## El punto, más allá del dinero

Te lo conté con dinero porque ahí el dolor es más obvio. Pero el problema de fondo te persigue en cualquier sistema: **guardar únicamente el estado actual y perder la historia.**

El ledger con doble partida es la versión financiera de algo más grande: dejar de guardar solo dónde estás, y empezar a guardar cómo llegaste ahí. Vivir sin poder responder *qué pasó y cuándo* duele en todo el sistema, no solo en el balance. El dinero solo es donde primero te cobran la factura.

Si estás arrancando algo hoy, no esperes a que duela para entenderlo.

¿Tú de qué lado de esta historia estás?
