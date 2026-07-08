---
title: 'Systems Thinking'
description: 'La AI puede escribir el código por ti. Lo que no puede hacer es ver los efectos de segundo orden de cada decisión. Esa habilidad tiene nombre, y es entrenable.'
pubDate: 2026-07-08
lang: es
slug: pensamiento-sistemico
translationSlug: systems-thinking
tags: [systems thinking, arquitectura, ai, software engineering]
readingTime: '10 min de lectura'
status: published
---

Ya hay agentes de AI que escriben código más rápido que tú. Y mejor. No se cansan, no se aburren.

Y sin embargo, hay una habilidad que no pueden reemplazar: saber cómo se ve un buen sistema. Qué hay que tener en cuenta cuando lo diseñas. Eso es "gusto".

Esa habilidad es el systems thinking. Una aclaración rápida antes de seguir: no es lo mismo que system design. El systems thinking es la disciplina de pensar en el todo y sus interacciones; el system design es su aplicación al software. Este post va de la primera, aterrizada en la segunda.

## Qué es systems thinking

Es la habilidad de pensar en un sistema como un todo. De pensar en los efectos de primer y segundo orden.

¿Qué pasa si cambio esto? ¿Cómo afecta al resto? Tengo un problema, lo puedo resolver de esta manera... pero si agrego esa solución, ¿qué pasa? ¿Cuál es el tradeoff? ¿Qué otras cosas pueden fallar por agregarla?

- El **efecto de primer orden** es el efecto inmediato de agregar (o quitar) eso que queremos.
- El **efecto de segundo orden** es la consecuencia que ese cambio produce en el resto del sistema.

Eso es lo que necesitamos entender. Eso es systems thinking.

### La Analogía

Imagina un bosque. Tiene su propio ecosistema: regula el clima, sostiene a los animales, a la fauna y a la flora que crecen en él.

Ahora deforestamos la zona. El efecto de primer orden es obvio: menos bosque. Ya está.

Pero los ciclos de agua cambian. La temperatura sube. Los animales migran distinto. La flora desaparece. Todo eso también pasa, solo que no se ve desde donde estás parado con la motosierra.

Esos son los efectos de segundo orden: los que solo aparecen cuando haces zoom out y te preguntas "si hago esto, ¿cómo afecta al todo?".

## Cuatro ejemplos en software

### Caché

Tu aplicación está lenta. Muchas peticiones a data que podría cachearse. Alguien dice: agreguemos una capa de caché. Y probablemente es buena solución.

Ese es el efecto de primer orden: menos latencia, menos carga contra la base de datos. Genial.

¿El de segundo orden? Que agregar caché es fácil, lo puede hacer cualquiera. El problema es qué pasa cuando la data cambia. Cuando a los usuarios les sigue llegando la versión vieja y no la actualizada. Porque lo fácil es agregar la capa; lo difícil es invalidarla. Y para eso hay múltiples estrategias, cada una con su costo.

*"There are only two hard things in Computer Science: cache invalidation and naming things"* – Phil Karlton

### Polling a escala

Consultar un endpoint repetidamente para detectar cambios de estado.

Tu API tiene un endpoint donde los clientes consultan el estado de algo por ID. Súper común. Un endpoint que valida, busca en la base de datos y responde. Ya está.

Ahora piénsalo en escala. Un millón de clientes. Si cada uno te hace un request en el mismo segundo, ya tienes un millón. ¿Y si todos hacen polling constantemente?

Pensemos en un procesador de pagos que procesa en menos de un minuto. Los clientes quieren el estado más actualizado posible, así que consultan una y otra vez, y cuando detectan el cambio, disparan su lógica. Un millón de usuarios haciendo 10 req/min (que es bajo) son 10 millones de requests en el mismo minuto. Sin que nadie se ponga de acuerdo, por pura estadística. El fenómeno tiene nombre: **thundering herd**.

El servicio se ahoga, se satura, se cae por degradación.

Ok, una solución puede ser que lo resolvamos con webhooks. Buena jugada. Pero ¿cómo aseguras que la notificación llegue? ¿Que el cambio de estado sí le llegue al cliente? No eliminaste el problema: lo cambiaste por otro. Ahora tienes que garantizar la entrega.

### Procesamiento asíncrono

Decides desacoplar: microservicios, una cola de mensajería, procesamiento asíncrono.

Tiene sentido. Crear una orden o un pago no lo quieres procesar de forma síncrona: es bloqueante, tiene lógica compleja, conlleva muchas cosas. Lo mandas a una cola y un worker lo procesa. Efecto de primer orden: creo la cola, proceso. Cool.

Hasta que un día la orden está creada en la base de datos (porque crearla es barato)... pero al procesador nunca le llegó el mensaje. Nada se agendó. Nada se procesó. Escribiste en dos sistemas —la base de datos y la cola— sin una transacción que cubra a los dos, y uno falló. Eso tiene nombre: **dual-write problem**. Y de ahí salen patrones como Outbox.

Desacoplar te compró throughput. Te cobró en garantías de entrega.

### Subir archivos

Necesitas subir archivos a un object storage como S3.

¿Lo subo directo desde el cliente? ¿Y la seguridad? Ok, lo mando a través del servidor. Vale, pero ahora cargas al servidor con cada archivo.

Solución: una URL pre-firmada. El cliente sube directo y el servidor no carga con nada. ¿El tradeoff? Ahora tienes que manejar bien los permisos del servicio que firma la URL, y el tiempo de expiración de esa URL.

La carga no desapareció del sistema. La seguridad tampoco. Se mudaron de lugar.

### El patrón que se repite

En los cuatro casos la solución de primer orden es fácil. Y con AI, supremamente fácil. El costo real vive en el segundo orden: la invalidación, la entrega, los permisos, la escala.

La AI puede implementar cada una de estas soluciones. Totalmente válido. Pero los efectos de segundo orden, por lo general, no los tiene en cuenta. Los puede manejar, sí, pero solo si se lo pides. Y para pedírselo, primero tienes que verlos, conocerlos y saber cómo funcionan.

Ese es todo el punto. La AI no es mala; todos la usamos y está bien que así sea. Pero ver, decidir y reconocer esos efectos sigue siendo criterio humano. El systems thinking busca exactamente eso: prever lo que solo se ve cuando haces zoom out y piensas el sistema como un todo.

## See around corners

Eso que hicimos en los cuatro ejemplos tiene nombre en inglés: seeing around corners. Ver más allá del efecto inmediato. Explorar posibilidades, oportunidades, retos. Anticiparte: considerar los tradeoffs, los escenarios, lo que cada decisión implica antes de tomarla.

## Un sistema es más que la suma de sus partes

*The whole is greater than the sum of its parts* – Aristóteles

Un sistema no es un montón de cosas puestas juntas. Es cómo esas piezas interactúan entre sí y se afectan unas a otras. Por eso tenemos que dejar de aprender solo cómo funcionan las cosas por separado y empezar a aprender cómo funcionan en conjunto.

Piensa en el mecanismo interno de un reloj. Muchos engranajes, cada uno cumple una función. Se construyen por separado, sí, pero planeando cómo van a integrarse y qué rol juega cada uno dentro del todo. Juntos hacen que el reloj funcione.

O piénsalo como una orquesta: el código es el instrumento, el sistema es la música. La AI puede tocar cualquier instrumento on-demand. Pero alguien tiene que dirigir. Alguien tiene que saber cuándo y cómo encajan mejor los instrumentos. Ese alguien somos nosotros. Por ahora la AI no puede dirigir, porque no tiene criterio, porque no sabe lo que queremos... y nosotros no sabemos que la AI no lo sabe.

## La teoría de Naur

En 1985, Peter Naur escribió **"Programming as Theory Building"**. Su tesis: *el código no es el programa. El programa es lo que vive en la cabeza del programador*:

- cómo las piezas se conectan entre sí
- por qué lo hacen de esa manera
- qué pasa si remueves una

Eso es el programa. El código es solo su manifestación.

Hoy los agentes de AI generan el código on-demand. Pero el programa sigue necesitando habitar en tu cabeza. Y sin embargo, estamos dejando de construir la teoría de Naur.

El resultado es que tenemos más **cognitive debt** que nunca: la deuda de entendimiento que acumulas cada vez que mandas a producción código que no entiendes. Como toda deuda, cobra intereses. Cada cambio futuro sobre ese código cuesta más.

De ahí salen preguntas que escucho seguido:

"Si la AI escribe código mejor y más rápido que yo, ¿vale la pena aprender a programar?" Sí, totalmente. El código es la parte fácil de programar. Siempre lo fue. Tu valor está en resolver problemas, no en escribir código.

"Si la AI escribe todo el código, ¿cómo construyo el criterio para evaluarlo?" Con systems thinking, con system design, con gusto. Y eso se adquiere con exposición, con tiempo, enfrentándote a problemas difíciles y resolviéndolos.

Y hay preguntas que siguen siendo fundamentales para crear sistemas, con o sin AI:

- ¿Dónde vive el estado? ¿Quién tiene la verdad del sistema?
- ¿Dónde vive el feedback? ¿Qué nos dice que el sistema funciona como debería?
- ¿Qué pasa si borro esto? ¿Somos capaces de responderlo? ¿Tenemos el programa en la cabeza?

De eso se trata la teoría de Naur.

## La AI: nueva capa de abstracción, no magia

La AI no es magia. Es software.

Es la nueva capa de abstracción, como en su momento lo fue assembly, luego C, luego los lenguajes de alto nivel como Python. Pero esas abstracciones venían con una garantía: el compilador preserva la semántica de tu código al convertirlo en machine code. Mismo input, mismo output. No necesitabas entender lo que pasaba detrás porque la abstracción era confiable.

Los LLMs no ofrecen esa garantía. Están diseñados para dar una respuesta plausible y verosímil. No sienten, no piensan, no razonan en el sentido humano: son redes neuronales que predicen el siguiente token de manera estocástica. Mismo prompt, respuestas distintas. Similares, pero no idénticas.

Y ojo, el punto de fondo no es el determinismo: puedes configurar un modelo para que sea **casi** determinista. El punto es qué te garantiza cada abstracción. El compilador te garantiza corrección. El LLM te garantiza plausibilidad. Son contratos distintos, y confundirlos sale carísimo.

La AI está acá para quedarse, eso es seguro. El agentic engineering —usar herramientas como Claude Code, Codex, entre otras— será la nueva forma de producir código. El stack ahora es SDD workflows, agent harnesses, coding agents. Pero justamente por eso, la experiencia acumulada es lo que más valor está ganando. Saber dónde están los edge cases, qué puede salir mal y cómo afecta: eso **es ahora una core skill**.

## Por qué esta skill importa más que nunca

El systems thinking siempre fue importante. Se construía con los años, con experiencia acumulada. Ahora, en un mundo donde la AI genera el código por nosotros, es más importante todavía. Y la necesitas desde el día uno.

Cada senior ahí afuera (yo incluido) desarrolló esta habilidad a punta de fallos en sistemas que diseñamos mal desde el inicio. No es nada fancy ni discurso motivacional: el sufrimiento de haber hecho las cosas mal y aprender del error era (es) el currículum.

Generar código con AI que ni siquiera entiendes es como la comida rápida. Rápida, disponible, "sabrosa". La AI es realmente útil para quien ya sabe cómo luce un buen código, para quien ya tiene el gusto y el criterio.

Y está naciendo una generación —vibe coders, juniors que arrancaron con la AI en la mano, incluso seniors que delegaron de más— que puede producir software funcionando sin haber desarrollado todavía ese criterio. No es culpa de nadie: nada en el flujo de trabajo actual te obliga a desarrollarlo. Y ahí está la oportunidad. Como nadie te lo exige, **quien decida entrenarlo deliberadamente se diferencia solo**.

El mercado va a premiar a los que entrenen la skill. La práctica deliberada es lo que va a marcar la diferencia entre los que coman fast food y los que aprendan a cocinar (de verdad) su propia comida.

Esta es una habilidad que todos necesitamos desarrollar. Y usar.

## Cómo entrenar la habilidad

Lo mejor de todo: es entrenable. ¿Cómo?

### Volver a las bases: diagramar

Como software engineers, volviendo a las basics: diagramando sistemas. Diagramas de flujo, causal loop diagrams, diagramas de secuencia, de arquitectura. ¿Cómo se ve esto a alto nivel?

### Estudiar sistemas en acción

Ingeniería inversa de productos que ya escalaron.

¿Cómo funciona Uber? ¿Cómo balancea oferta y demanda en tiempo real? ¿Cómo funciona la tarifa dinámica? ¿Cómo decide Netflix qué miniatura mostrarte, qué recomendarte, y por qué?

De esos casos se aprende justamente porque escalaron: qué errores cometieron, qué hicieron bien, cómo arrancaron, cómo lo terminaron haciendo después y cómo migraron de lo uno a lo otro.

### Empezar de menos a más

Cuando diseñamos un sistema, empezamos de menos a más. Nadie arranca con microservicios el día uno, ¿no? (no deberían)

Lo más básico de cualquier arquitectura son tres componentes: cliente, servidor, base de datos.

- **El cliente**: una app mobile, una página web, una Raspberry Pi que le hace peticiones a tu servidor. Lo que sea.
- **El servidor**: donde corre la lógica, donde se aplican las business rules.
- **La base de datos**: donde guardas la información.

Nota que no hablamos de tecnologías. Ni qué base de datos, ni qué cloud, ni qué lenguaje. Es un diagrama a alto nivel de cómo se ve la aplicación a grandes rasgos. De ahí agregas o cambias componentes según aparezcan las necesidades y los problemas.
¿Y cómo los resuelves? Pensando el sistema como un todo: cada cambio trae efectos de primer y segundo orden, y el sistema se complica un poco más cada vez.

### Construir modelos mentales

Un mental model es una representación simplificada de cómo creemos que funciona algo. Un esquema que usas para entender una situación, decidir o predecir. No es la realidad completa: es un mapa. Y como todo mapa, es incompleto pero útil.

Hay modelos mentales para psicología, economía, ingeniería de software y para la vida en general. Estos son los que más uso para pensar sistemas:

- **Efectos de segundo orden**: no solo importa la consecuencia inmediata, sino lo que esa consecuencia produce después. "Y luego, ¿qué pasa?". Es el hilo conductor de este post entero.
- **Feedback loops**: de refuerzo (se autoamplifica) y de balance (se autorregula). Interés compuesto vs. termostato. En software: un retry storm es un loop de refuerzo — timeouts → retries → más carga → más timeouts → caída; es el ejemplo del polling. El autoscaling es de balance: más carga → más instancias → menos carga por instancia.
- **Cuellos de botella y constraints**: el sistema avanza tan rápido como su etapa más lenta. No optimices todo: encuentra la restricción que gobierna el ritmo y optimiza ahí. En el ejemplo del caché, el cuello de botella era la base de datos. Por eso el caché funciona: ataca la restricción, no los síntomas.
- **Tradeoffs**: casi todo es una negociación entre cosas buenas que compiten (velocidad vs. robustez, latencia vs. throughput), no la búsqueda de la solución perfecta. Los cuatro ejemplos de este post son tradeoffs. Lo bueno que dejas de elegir es el costo de oportunidad; lo malo que aceptas, la desventaja asumida.
- **Descomposición**: divide y vencerás. Partir un problema grande en subproblemas manejables. Es lo que haces cuando partes un flujo síncrono en una cola y workers.

*Thinking in Systems* de Donella Meadows y *The Fifth Discipline* de Peter Senge son la literatura madre del tema.

(De por qué los fundamentos importan más que las herramientas hay tanto que decir que va en su propio post.)

### Usar la AI como tutor, no como atajo

El problema no es la AI. Es cómo y para qué la usamos.

Usada como herramienta de aprendizaje —no como shortcut—, la AI puede ser un gran tutor: un senior dev con muchísima paciencia, que nunca se cansa y está disponible 24/7 para responder todas tus preguntas.

Otra práctica: escribe algo de código a mano cada semana. Lo que sea, de memoria. Obliga a tu cerebro a pensar más lento, a entender antes de escribir. Eso construye modelos mentales (o evita que pierdas los que ya construiste durante años).

**Usa la AI para entender mejor y más rápido**. No para producir más líneas de código ni cerrar más PRs: esas son métricas de vanidad, no de calidad. La AI es un amplificador de lo que ya sabes, no un sustituto del entendimiento.

### Entrenamiento deliberado

Nada te obliga a entrenar esto más allá de tu disciplina. Estas cuatro prácticas funcionan:

1. **Diseña antes de promptear**. Entiende el problema antes de escribir una línea. Escribir código siempre fue la parte fácil; lo difícil es entender el problema, descomponerlo y luego ingeniártelas para que las partes funcionen como un todo. Dibuja los componentes, cómo se comunican, los flujos de data, qué puede fallar en cada paso y cómo mitigarlo. Si no puedes dibujarlo, no lo entiendes lo suficiente. Y la AI asumirá todo lo que no definas.
2. **Specs como scaffolding**. La spec es la estructura de apoyo temporal para construir el sistema; no es el producto final. Escribe el qué y el porqué antes de que la AI escriba el cómo: el problema, los constraints, el criterio de éxito, la definition of done, los failure modes.
3. **Pregúntate**: ¿qué pasa si borro esto? Elige un componente que hayas mandado a producción. ¿Qué se rompe? ¿Cómo? ¿Qué impacto tiene? El objetivo es que la respuesta no sea un "idk".
4. **Construye la teoría de Naur**. Estudia el código que la AI generó. No apagues el cerebro. No lo aceptes solo porque ves que los tests pasaron.

## Una última cosa

La AI reemplaza la escritura de código – la parte fácil de programar, no el pensar en sistemas, no el entender el problema y diseñar una solución.

La skill es desarrollable, no prompteable.

## Referencias

- Peter Naur, "Programming as Theory Building" (1985), publicado en *Microprocessing and Microprogramming*.
- Donella Meadows, *Thinking in Systems: A Primer*.
- Peter Senge, *The Fifth Discipline*.
- [TwoHardThings – Martin Fowler](https://martinfowler.com/bliki/TwoHardThings.html) (origen documentado de la cita de Phil Karlton).
