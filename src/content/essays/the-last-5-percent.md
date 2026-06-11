---
title: "The Last 5%"
description: "The last 5% of AI deployment is where value, risk, and accountability concentrate. It is where institutions reveal themselves — and where AI systems fail."
status: published
published: 2026-05-11
tags: [agentic-ux, governance]
related: [no-lifeguard-on-duty]
---

Where institutions reveal themselves — and AI systems fail.

Forty-five minutes.

That is all it took.

On the morning of August 1, 2012, Knight Capital deployed new software into its trading infrastructure. The rollout appeared routine. The system had been tested. Markets opened normally.

Then dormant legacy code activated on one of eight production servers and began executing unintended trades across the market.

Forty-five minutes later, Knight Capital had accumulated over $7 billion in unwanted positions and lost $460 million.

The company never recovered.

The important part is not that the system failed.

Everything fails.

People fail. Markets fail. Institutions fail. Governance fails.

The important part is where the failure occurred.

Not in the demo. Not in the pilot. Not in the benchmark. Not in the controlled environment where the system had already convinced everyone it worked.

It failed at the edge.

A narrow production condition. A configuration nobody fully understood. A warning signal that existed but never became action quickly enough. Ninety-seven automated alerts had fired before markets even opened. None of them was treated as an alarm. When Knight's engineers eventually intervened, they rolled back the new code on the seven servers where it had been deployed correctly, which spread the problem rather than containing it.

That is where systems reveal themselves.

I have spent much of my career inside transitions where technology became operationally unavoidable before institutions understood how to absorb it.

Digital transformation had that shape.

Distributed intelligence had that shape.

The AI tsunami has it now, only faster.

Much faster.

The pattern repeats with remarkable consistency.

The first wave is always capability. Look what the system can do.

The second wave is adoption. How quickly can we deploy it? What's the ROI?

The third wave is institutional. What happens when the system is mostly right, economically valuable, widely embedded, and still wrong in ways the organization cannot govern?

That is the last 5%.

The phrase sounds small.

It is not.

The first 95% creates excitement. It produces demos, pilots, funding rounds, keynote stages, productivity studies, and executive urgency.

The last 5% is where the real institution lives.

The exception. The denied claim. The edge-case borrower. The unusual transaction. The rare diagnosis. The sensor anomaly. The confused customer whose circumstances fall outside system assumptions.

Three things concentrate there at once.

Value concentrates there, because the modal case generates volume but the edge case determines whether the deployment was right. Risk concentrates there, because the failures that produce regulatory action, fiduciary breach, and reputational consequence are almost never the typical interaction. Accountability concentrates there, because the exception is where institutional learning either happens or is suppressed.

This three-dimensional concentration is the structural feature most current AI commentary misses.

Andrej Karpathy describes the engineering geometry through what he calls the "march of nines": the distance from 99% to 99.9% is not the same kind of work as the distance from 90% to 99%, and the demo lives at the first nine while civilization lives in the later ones. He is right about the engineering. Ethan Mollick and his Harvard Business School and BCG colleagues describe the capability distribution through the "jagged frontier": AI is uneven across tasks of apparently similar difficulty, and the jaggedness is a structural feature rather than a temporary gap. They are right about the unevenness. Sayash Kapoor, Arvind Narayanan, and their Princeton co-authors have shown empirically that reliability is a different property than accuracy, and that capability gains have not produced corresponding reliability gains. They are right about the measurement gap. Karim Lakhani and his Harvard and Microsoft co-authors have written about the "last mile" as a problem of organizational and process redesign. They are right about the organizational dimension.

Each of them is looking at the same thing from a different angle.

None of them is looking at all three at once.

The last 5% is not three problems that happen to overlap. It is one structural location that requires all three lenses simultaneously to be addressed.

This is not a new phenomenon.

Manufacturing learned this decades ago.

Joseph Juran's quality work made visible what operators already understood intuitively: defects are not evenly distributed. A small number of causes create a disproportionate share of consequences. Six Sigma later transformed that observation into industrial discipline. The distance between "mostly reliable" and "production-grade reliable" was not incremental. Every remaining defect became harder to detect, harder to reproduce, and exponentially more expensive to eliminate.

The final defects were never just leftovers.

They defined the system.

AI has reintroduced this old production problem at category scale.

Partly because the systems are powerful.

Partly because the systems are opaque.

Mostly because organizations are confusing capability with deployability.

Those are not the same thing.

A model can write convincingly, summarize accurately, automate workflows, coordinate agents, and reason persuasively while still remaining unsafe to trust in specific production conditions.

The enterprise problem is not that AI systems occasionally fail.

Enterprise systems do not require perfection.

They require governable failure and nimble remediation.

That distinction matters.

A bounded failure can be managed. A visible failure can be escalated. A recoverable failure can be absorbed. An accountable failure can become institutional learning.

Failures that are ambiguous, statistically diluted, economically externalized, or operationally invisible become something else.

They become policy. They become culture. They become the operating model.

Boeing learned this catastrophically with MCAS — the Maneuvering Characteristics Augmentation System added to the 737 MAX to compensate for a handling characteristic introduced by the MAX's larger, repositioned engines.

The system functioned correctly under normal conditions. The fatal problem emerged through a narrow edge case involving a faulty angle-of-attack sensor feeding incorrect data into a tightly coupled control system that pilots had not been adequately prepared to understand.

The danger was not continuous failure.

The danger was that the organization no longer fully understood the boundary conditions of reliability.

The edge case became an institutional event.

Will trust ever return?

IBM Watson for Oncology exposed a quieter version of the same pattern.

The system was trained through curated expertise and controlled assumptions. Then production arrived.

Real patients. Messy records. Incomplete data. Conflicting protocols. Ambiguous diagnoses. Clinical judgment that resisted standardization.

Watson learned the world its developers prepared for it. Production exposed the world that actually existed.

That is where systems meet reality.

Production is where reality attacks the assumptions embedded in the model.

The healthcare claims systems reveal something darker.

Sometimes the last 5% remains unresolved not because institutions cannot see it, but because resolving it costs more than absorbing the damage.

This is suppression economics. Will enterprise history repeat itself with the rush to Agentic Systems?

A claims-denial system can be operationally successful at scale and catastrophically wrong for the cancer patients forced to fight it, simultaneously, because the production feedback signal that would surface the failure is structurally suppressed. The UnitedHealth nH Predict litigation surfaced an internal estimate that roughly 90% of denials were overturned on appeal. The same litigation surfaced an appeal rate of approximately 0.2%. Both numbers can be true at once. Together they describe a system in which the failures exist, the failures are known, and the failures are economically rational to maintain because the production environment does not require them to be visible. A Senate Permanent Subcommittee on Investigations report found that UnitedHealthcare's denial rate for post-acute care more than doubled, from 10.9% in 2020 to 22.7% in 2022, after the algorithm was put to work.

This is the institutional revelation that most production-readiness commentary refuses to see. The last 5% is not always a measurement problem. It is sometimes a design choice — the kind of choice that gets made when the cost of resolving edge cases exceeds the cost of absorbing the cases that escalate. Cigna's PXDX algorithm, processing 300,000 denials in two months at an average of 1.2 seconds per claim, operated under the same logic. A former Cigna doctor described it plainly to ProPublica: "We literally click and submit. It takes all of 10 seconds to do 50 at a time." The system was not failing. The system was succeeding at exactly what it was designed to do, which was to process volume through a workflow that bypassed the individual review that would have surfaced the failures.

That is not deployment failure.

That is deployment policy.

The last 5% is rarely abstract.

It usually has a face.

A patient discharged too early. A family trapped in appeals. A qualified applicant filtered out. A pilot fighting a system he did not know existed. A trader watching losses compound faster than the institution can respond.

The edge case becomes a person before it becomes a lawsuit. Then it becomes a regulatory issue. Then a governance issue. Then a reputational issue. Then a case study.

By then, everyone can suddenly see the pattern.

The harder question is why the institution could not see it sooner.

Or did not want to. Let's call a duck a duck — fear, ego, greed. These are not stupid people.

This is why human oversight keeps returning to the center of enterprise AI discussions.

Not because humans are magically superior. They are not. Humans are inconsistent, political, emotional, biased, tired, and expensive.

But institutions still require somewhere to locate responsibility.

Human oversight survives because accountability survives.

That may eventually change. But if it changes, it will not happen because models become more intelligent. It will happen because institutions develop governance systems capable of absorbing machine-driven accountability at production scale.

We are nowhere near that today.

Most enterprise AI deployments still optimize for speed, cost reduction, workflow compression, competitive pressure, and productivity signaling. Far fewer optimize for bounded failure, edge-condition governance, production observability, accountability routing, or institutional resilience.

The asymmetry matters.

Especially because the last 5% is rarely where organizations begin. It is where they arrive after the easy gains are exhausted.

That is why the current AI moment feels simultaneously inevitable and unstable.

The productivity gains are real. The pressure is real. The competitive stakes are real.

So are the failure modes.

The danger is not that AI will be useless.

The danger is that it will be useful enough to deploy before it becomes governable enough to trust.

That is where institutions get hurt.

Not by fantasy. By partial success. By systems that work well enough to spread and fail unclearly enough to evade accountability.

The next phase of enterprise AI will not be defined by who produces the most impressive demo. That phase is already crowded.

It will be defined by which organizations can govern the boundary conditions. Who can identify the exception before it compounds. Who can route accountability before harm disappears into statistics. Who can distinguish automation from abdication.

The first 95% creates and, oftentimes, forces adoption with or without the enterprise culture on board.

The last 5% reveals whether the institution and its culture were ready at all.

What gets escalated, what gets absorbed, what gets routed, and what gets quietly suppressed — these are not deployment details. They are the institutional fingerprint. They are how organizations announce, without intending to, what they actually believe about the people their systems are operating on.

That is where AI systems fail.

That is where institutions reveal themselves.
