---
title: 'The status column will fail you (and the balance one too)'
description: 'Storing the current state of an entity is the most natural thing in the world. It is also the decision that will cost you the most in a financial system.'
pubDate: 2026-06-09
lang: en
slug: the-status-column-will-fail-you
translationSlug: la-columna-status-te-va-a-fallar
tags: [fintech, event sourcing, ledger, architecture, backend]
readingTime: '7 min read'
status: draft
---

Nobody wants to open their bank account and see less money out of nowhere. Whether you are a bank, a payment processor, or an aggregator, the most important thing in a financial system is data consistency and integrity. The balance must never lie.

I did not learn what I am about to tell you from a book. I learned it wrestling with the uncomfortable question: *"how do we reconstruct what happened?"* — and discovering that with the design we had, we could not. I will tell it the way I lived it: in levels, because almost nobody hits this problem all at once. You get there little by little.

## Level 1: a `status` column

You start with the obvious. You have an entity — an order, a payment, an account — and you need to know what state it is in. You add a `status` column: `pending`, `processing`, `done`.

It works. For most products, it works perfectly. Most of us start this way, storing the current state of the entity, and that is fine.

## Level 2: allowed transitions

It grows a bit. Now knowing the state is not enough: there are states you cannot jump to. A `done` payment should never go back to `pending`. A `failed` one should never move to `processing`.

So you define allowed transitions. And once there are more than three states, the logic of "which can move to which" starts getting complicated: valid combinations, impossible combinations, edge cases. You solve it with a state machine and move on.

## Level 3: the question neither the code nor the database can answer

And one day the question that breaks everything arrives:

> *"What did this look like last Wednesday at 4:30pm?"*

And you realize something: you were always storing **the latest** state. Overwriting. Every `UPDATE` erased the previous version. You have no way to reconstruct the history at a point in time, because the history was never stored.

The code cannot compute it and the database does not have it. It simply does not exist.

In an ordinary system, that is annoying. In finance, it is unacceptable: audits, disputes, reconciliation, regulation — all of that needs to answer *what happened and when*, not just *what exists now*.

## That has a name: event sourcing

The solution is not a better column. It is inverting who is in charge.

Instead of storing the current state and updating it, you store a record of **movements** that only grows (*append-only*) and is never edited (*immutable*). The current state is something you **derive** from that record.

That is called **event sourcing**: your source of truth is the sequence of things that happened, not a snapshot of the present. The present is a computation.

(A worthwhile aside: *event sourcing* is not the same as *event-driven*. Event-driven is how your components communicate; event sourcing is how you persist the truth. They get confused all the time.)

## In finance it is called a ledger (and it has an accounting trick)

When you apply event sourcing to the financial domain, you get a **ledger**. And ledgers bring a piece that architecture posts almost never mention: **double-entry accounting**.

The idea, no accounting degree required:

- every movement has two sides that must square — debits and credits, one column that adds and one that subtracts
- the two cancel each other out: their sum is zero

Why does it matter? Because **double-entry does not prevent the error: it makes it impossible to hide.** If the two columns do not cancel to zero, the books do not balance, and you *know instantly* that something broke. It is a consistency check built into the data model. Not a magic shield — a detector that cannot be turned off.

## It is not about dropping the column: it is about taking its crown

Here is the part that is hardest to grasp, and the one that reconciles everything above.

Moving to a ledger does **not** mean dropping the `balance` column or the `status` column. It means moving them to a different place.

The balance does not disappear. It stops being **the truth** and becomes a **view** — a projection, a derivation, a snapshot of the log. The source of truth is the record of movements; the balance (and the status) are derived from it, and you can rebuild them whenever you want.

That is why I say the ledger belongs **from day one**: not because you have to give up reading a balance quickly, but because that value should always have been a reconstructible computation, not something you edit by hand while crossing your fingers that no bug leaves it inconsistent.

The `status` is not erased from the story. It just loses the crown.

## "But that doesn't scale" — snapshots

The objection shows up immediately: if the balance is derived by summing *all* the movements, what happens when an account has two million entries? Do you sum two million rows every time someone asks how much they have?

No. In practice you **materialize snapshots**: every so often you store an already-computed balance ("up to entry N, the balance was Y"). A read takes the latest snapshot and only sums what came after. Fast.

The key: **the snapshot is a cache, not the truth.** If you doubt it, you rebuild it by re-deriving from the log. The cleanest analogy is git: the commit log is the immutable truth, but you do not replay the whole history to know the current state — you have a working tree (the snapshot). If it gets corrupted, you regenerate it from the commits. Never the other way around.

## The ledger is not free

And no, a ledger is not free. Nor is it a silver bullet. It is more code, it is harder to query, and it forces you to think about things a CRUD let you ignore.

**Idempotency**, for example. In payments, retries are the norm, not the exception: the network drops, the user double-clicks, the webhook arrives twice. If every request writes a movement with no further checks, you just charged twice. With an append-only log you must guarantee that the same event, no matter how many times it arrives, produces exactly one change.

It sounds obvious until you implement it. But that is precisely the point of the ledger: it does not remove the complexity, it puts it in front of you from day one instead of hiding it until a customer complains they were charged double.

## What I actually learned

I am not writing this from theory. I lived it building a stablecoin. And the most interesting part is not that we did not know the right path — we knew it. At some point the accounting did run on a truly immutable ledger.

What happened is more mundane and more terrifying: the provider of that ledger deprecated it, a migration was forced, the migration to the new solution was left half-done, and meanwhile a good part of the system kept running on `status` columns and faith. And not just the financial part. Everything.

That is the part nobody tells you: very often the team *knows* the right pattern. The problem is that the architecture is decided on day one, when everything is small and a ledger looks like over-engineering — and by the time it hurts, migrating the foundations with real money flowing on top costs ten times more.

## The point, beyond money

I told you this with money because that is where the pain is most obvious. But the underlying problem chases you in any system: **storing only the current state and losing the history.**

The double-entry ledger is the financial version of something bigger: stop storing only where you are, and start storing how you got there. Living without the ability to answer *what happened and when* hurts across the whole system, not just in the balance. Money is just where the bill arrives first.

If you are starting something today, do not wait for it to hurt to understand this.

Which side of this story are you on?
