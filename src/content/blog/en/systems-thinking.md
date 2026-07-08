---
title: 'Systems Thinking'
description: 'AI can write the code for you. What it cannot do is see the second-order effects of every decision. That skill has a name, and it is trainable.'
pubDate: 2026-07-08
lang: en
slug: systems-thinking
translationSlug: pensamiento-sistemico
tags: [systems thinking, architecture, ai, software engineering]
readingTime: '10 min read'
status: published
---

There are already AI agents that write code faster than you. And better. They don't get tired, they don't get bored.

And yet, there's one skill they can't replace: knowing what a good system looks like. Knowing what to watch for when you design one. That's "taste".

That skill is systems thinking. A quick clarification before we go on: it's not the same as system design. Systems thinking is the discipline of thinking about the whole and its interactions; system design is its application to software. This post is about the first, grounded in the second.

## What is systems thinking

It's the ability to think about a system as a whole. To think in first and second-order effects.

What happens if I change this? How does it affect the rest? I have a problem, I can solve it this way... but if I add that solution, what happens? What's the tradeoff? What else can break because of it?

- The **first-order effect** is the immediate effect of adding (or removing) the thing we want.
- The **second-order effect** is the consequence that change produces in the rest of the system.

That's what we need to understand. That's systems thinking.

### The Analogy

Picture a forest. It has its own ecosystem: it regulates the climate, it sustains the animals, the fauna and the flora that grow in it.

Now we deforest the area. The first-order effect is obvious: less forest. That's it.

But the water cycles change. The temperature rises. Animals migrate differently. The flora disappears. All of that happens too — you just can't see it from where you're standing with the chainsaw.

Those are the second-order effects: the ones that only show up when you zoom out and ask yourself "if I do this, how does it affect the whole?".

## Four examples in software

### Caching

Your application is slow. Lots of requests for data that could be cached. Someone says: let's add a cache layer. And it's probably a good solution.

That's the first-order effect: less latency, less load on the database. Great.

The second-order one? Adding a cache is easy, anyone can do it. The problem is what happens when the data changes. When users keep getting the old version instead of the fresh one. Because the easy part is adding the layer; the hard part is invalidating it. And there are multiple strategies for that, each with its own cost.

*"There are only two hard things in Computer Science: cache invalidation and naming things"* – Phil Karlton

### Polling at scale

Hitting an endpoint repeatedly to detect state changes.

Your API has an endpoint where clients query the state of something by ID. Super common. An endpoint that validates, queries the database and responds. That's it.

Now think about it at scale. A million clients. If each one sends a request in the same second, that's already a million. What if they all poll constantly?

Think of a payment processor that processes in under a minute. Clients want the freshest state possible, so they query over and over, and the moment they detect the change, they trigger their own logic. A million users doing 10 req/min (which is low) is 10 million requests in the same minute. Without anyone coordinating, out of pure statistics. The phenomenon has a name: **thundering herd**.

The service chokes, saturates, and degrades until it goes down.

Ok, one solution could be webhooks. Good move. But how do you make sure the notification arrives? That the state change actually reaches the client? You didn't eliminate the problem: you traded it for another one. Now you have to guarantee delivery.

### Async processing

You decide to decouple: microservices, a message queue, async processing.

It makes sense. You don't want to process the creation of an order or a payment synchronously: it's blocking, it involves complex logic, and there are a lot of moving parts. You send it to a queue and a worker processes it. First-order effect: I create the queue, I process. Cool.

Until one day the order exists in the database (because creating it is cheap)... but the processor never got the message. Nothing was scheduled. Nothing was processed. You wrote to two systems —the database and the queue— without a transaction covering both, and one of them failed. That has a name: the **dual-write problem**. And that's where patterns like Outbox come from.

Decoupling bought you throughput. It charged you in delivery guarantees.

### File uploads

You need to upload files to an object storage like S3.

Do I upload straight from the client? What about security? Ok, I'll route it through the server. Fine, but now you're loading the server with every file.

Solution: a pre-signed URL. The client uploads directly and the server carries nothing. The tradeoff? Now you have to properly handle the permissions of the service that signs the URL, and the expiration time of that URL.

The load didn't leave the system. Neither did the security. They just moved.

### The pattern that repeats

In all four cases the first-order solution is easy. And with AI, extremely easy. The real cost lives in the second order: invalidation, delivery, permissions, scale.

AI can implement every one of these solutions. Totally valid. But the second-order effects? It usually doesn't take them into account. It can handle them, yes, but only if you ask for it. And to ask for it, you first have to see them, know them, and know how they work.

That's the whole point. AI isn't bad; we all use it and that's fine. But seeing, deciding and recognizing those effects is still human judgment. That's exactly what systems thinking is after: foreseeing what only becomes visible when you zoom out and think of the system as a whole.

## See around corners

What we just did in those four examples has a name: seeing around corners. Looking past the immediate effect. Exploring possibilities, opportunities, challenges. Anticipating: weighing the tradeoffs, the scenarios, what each decision implies before making it.

## A system is more than the sum of its parts

*The whole is greater than the sum of its parts* – Aristotle

A system isn't a bunch of things put together. It's how those pieces interact and affect each other. That's why we have to stop learning only how things work in isolation and start learning how they work together.

Think of the inner mechanism of a watch. Lots of gears, each one with its own function. They're built separately, sure, but planned around how they'll integrate and what role each one plays within the whole. Together they make the watch work.

Or think of it as an orchestra: the code is the instrument, the system is the music. AI can play any instrument on-demand. But someone has to conduct. Someone has to know when and how the instruments fit best together. That someone is us. For now AI can't conduct, because it has no judgment, because it doesn't know what we want... and we don't know that AI doesn't know.

## Naur's theory

In 1985, Peter Naur wrote **"Programming as Theory Building"**. His thesis: *the code is not the program. The program is what lives in the programmer's head*:

- how the pieces connect to each other
- why they do it the way they do
- what happens if you remove one

That's the program. The code is just its manifestation.

Today AI agents generate code on-demand. But the program still needs to live in your head. And yet, we're building Naur's theory less and less.

The result is more **cognitive debt** than ever: the debt of understanding you accumulate every time you ship code to production that you don't understand. Like all debt, it charges interest. Every future change on that code costs more.

Out of this come questions I hear often:

"If AI writes code better and faster than me, is it worth learning to program?" Yes, absolutely. Code is the easy part of programming. It always was. Your value is in solving problems, not writing code.

"If AI writes all the code, how do I build the judgment to evaluate it?" With systems thinking, with system design, with taste. And those are acquired through exposure, through time, by facing hard problems and solving them.

And there are questions that remain fundamental to building systems, with or without AI:

- Where does the state live? Who holds the truth of the system?
- Where does the feedback live? What tells us the system is working as it should?
- What happens if I delete this? Can we answer that? Do we have the program in our head?

That's what Naur's theory is about.

## AI: a new abstraction layer, not magic

AI is not magic. It's software.

It's the new abstraction layer, like assembly was in its day, then C, then high-level languages like Python. But those abstractions came with a guarantee: the compiler preserves the semantics of your code when turning it into machine code. Same input, same output. You didn't need to understand what happened underneath because the abstraction was reliable.

LLMs don't offer that guarantee. They're designed to give a plausible, believable answer. They don't feel, don't think, don't reason in the human sense: they're neural networks predicting the next token stochastically. Same prompt, different answers. Similar, but not identical.

And look, the deeper point isn't determinism: you can configure a model to be **almost** deterministic. The point is what each abstraction guarantees you. The compiler guarantees correctness. The LLM guarantees plausibility. Those are different contracts, and confusing them gets seriously expensive.

AI is here to stay, that's for sure. Agentic engineering —using tools like Claude Code, Codex, among others— will be the new way of producing code. The stack now is SDD workflows, agent harnesses, coding agents. But precisely because of that, accumulated experience is what's gaining the most value. Knowing where the edge cases are, what can go wrong and how it affects the system: that **is now a core skill**.

## Why this skill matters more than ever

Systems thinking was always important. It was built over the years, with accumulated experience. Now, in a world where AI generates the code for us, it matters even more. And you need it from day one.

Every senior out there (myself included) built this skill through failures in systems we designed badly from the start. Nothing fancy, no motivational speech: the pain of doing things wrong and learning from the mistakes was (is) the curriculum.

Generating AI code you don't even understand is like fast food. Fast, available, "tasty". AI is genuinely useful for those who already know what good code looks like, who already have the taste and the judgment.

And a generation is emerging —vibe coders, juniors who started with AI in hand, even seniors who over-delegated— that can produce working software without having developed that judgment yet. It's nobody's fault: nothing in today's workflow forces you to develop it. And that's the opportunity. Since nobody demands it from you, **whoever decides to train it deliberately stands out on their own**.

The market will reward those who train the skill. Deliberate practice is what will make the difference between those who eat fast food and those who learn to (actually) cook their own meals.

This is a skill we all need to develop. And use.

## How to train the skill

Best of all: it's trainable. How?

### Back to basics: diagramming

As software engineers, going back to basics: diagramming systems. Flow diagrams, causal loop diagrams, sequence diagrams, architecture diagrams. What does this look like at a high level?

### Study systems in action

Reverse-engineer products that already scaled.

How does Uber work? How does it balance supply and demand in real time? How does surge pricing work? How does Netflix decide which thumbnail to show you, what to recommend, and why?

You learn from those cases precisely because they scaled: what mistakes they made, what they got right, how they started, how they ended up doing it, and how they migrated from one to the other.

### Start small, grow from there

When we design a system, we go from less to more. Nobody starts with microservices on day one, right? (they shouldn't)

The most basic form of any architecture is three components: client, server, database.

- **The client**: a mobile app, a web page, a Raspberry Pi hitting your server. Whatever.
- **The server**: where the logic runs, where the business rules apply.
- **The database**: where you store the information.

Notice we're not talking technologies. Not which database, which cloud, which language. It's a high-level diagram of what the application roughly looks like. From there you add or change components as needs and problems show up.
And how do you solve them? Thinking of the system as a whole: every change brings first and second-order effects, and the system gets a bit more complex every time.

### Build mental models

A mental model is a simplified representation of how we think something works. A framework you use to understand a situation, decide, or predict. It's not the full reality: it's a map. And like every map, it's incomplete but useful.

There are mental models for psychology, economics, software engineering and life in general. These are the ones I use the most for thinking about systems:

- **Second-order effects**: what matters isn't just the immediate consequence, but what that consequence produces next. "And then what?". It's the thread running through this entire post.
- **Feedback loops**: reinforcing (self-amplifying) and balancing (self-regulating). Compound interest vs. thermostat. In software: a retry storm is a reinforcing loop — timeouts → retries → more load → more timeouts → outage; it's the polling example. Autoscaling is a balancing one: more load → more instances → less load per instance.
- **Bottlenecks and constraints**: the system moves as fast as its slowest stage. Don't optimize everything: find the constraint that governs the pace and optimize there. In the caching example, the bottleneck was the database. That's why the cache works: it attacks the constraint, not the symptoms.
- **Tradeoffs**: almost everything is a negotiation between competing good things (speed vs. robustness, latency vs. throughput), not the search for the perfect solution. The four examples in this post are tradeoffs. The good you give up is the opportunity cost; the bad you accept, the assumed downside.
- **Decomposition**: divide and conquer. Breaking a big problem into manageable subproblems. It's what you do when you split a synchronous flow into a queue and workers.

*Thinking in Systems* by Donella Meadows and *The Fifth Discipline* by Peter Senge are the foundational reading on the subject.

(There's so much to say about why fundamentals matter more than tools that it's getting its own post.)

### Use AI as a tutor, not a shortcut

The problem isn't AI. It's how we use it, and what for.

Used as a learning tool —not a shortcut—, AI can be a great tutor: a senior dev with endless patience, who never gets tired and is available 24/7 to answer every question you have.

Another practice: write some code by hand every week. Anything, from memory. It forces your brain to think slower, to understand before writing. That builds mental models (or keeps you from losing the ones you already built over the years).

**Use AI to understand better and faster**. Not to produce more lines of code or close more PRs: those are vanity metrics, not quality metrics. AI is an amplifier of what you already know, not a substitute for understanding.

### Deliberate practice

Nothing forces you to train this beyond your own discipline. These four practices work:

1. **Design before prompting**. Understand the problem before writing a single line. Writing code was always the easy part; the hard part is understanding the problem, breaking it down, and then figuring out how to make the parts work as a whole. Draw the components, how they communicate, the data flows, what can fail at each step and how to mitigate it. If you can't draw it, you don't understand it well enough. And AI will assume everything you don't define.
2. **Specs as scaffolding**. The spec is the temporary support structure for building the system; it's not the final product. Write the what and the why before AI writes the how: the problem, the constraints, the success criteria, the definition of done, the failure modes.
3. **Ask yourself**: what happens if I delete this? Pick a component you've shipped to production. What breaks? How? What's the impact? The goal is for the answer not to be "idk".
4. **Build Naur's theory**. Study the code AI generated. Don't turn your brain off. Don't accept it just because you saw the tests pass.

## One last thing

AI replaces writing code – the easy part of programming, not thinking in systems, not understanding the problem and designing a solution.

The skill is trainable, not promptable.

## References

- Peter Naur, "Programming as Theory Building" (1985), published in *Microprocessing and Microprogramming*.
- Donella Meadows, *Thinking in Systems: A Primer*.
- Peter Senge, *The Fifth Discipline*.
- [TwoHardThings – Martin Fowler](https://martinfowler.com/bliki/TwoHardThings.html) (documented origin of the Phil Karlton quote).
