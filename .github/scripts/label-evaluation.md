# Labeler cost and accuracy under fixed budgets

The simpler choice is one request containing all fourteen label questions, with two policy clarifications: a supported public named export is an API addition even when it aliases an existing implementation; website theme/typography rendering counts as website presentation work. These fix the missed feature decision on #2928 and docs decision on #2931 without item-specific exceptions. The unused experimental routing and group executor have been removed from the action code.

The action still runs published `@ieedan/label@0.0.1`, unchanged, through a small request adapter and response guard. No unmerged labeler changes are used. The adapter shares evidence once and puts positive/negative rules directly into typed criteria. It preserves provider probabilities and policy thresholds. Independent GitHub reads remain concurrent, capped at four.

## Budget comparison

The original deployed workflow averaged **9,214.18 input tokens/item** on the same 38-case composition, across three repeats (114 item runs). A 50% larger mean budget is **13,821.28**. These are corpus-average budgets, not per-item limits. Cost is the sum of actual provider-reported input tokens across every request; call count and character estimates are not used.

| Mean token budget      | Best tested strategy           | Actual tokens/item | Eligibility errors |
| ---------------------- | ------------------------------ | -----------------: | -----------------: |
| Original: 9,214        | One batch + two clarifications |              6,219 |           13/1,584 |
| Original + 50%: 13,821 | Same strategy                  |              6,219 |           13/1,584 |

The extra budget did not buy better accuracy among the tested candidates. Compared with the previous draft, the selected point costs 1.1% more tokens (6,154 → 6,219) and reduces errors 19 → 13. It remains 32.5% below the original mean budget. Both the cheaper previous draft and selected point are non-dominated on measured mean tokens versus eligibility errors; every more expensive full-test candidate is dominated by the selected point. This is an empirical frontier among these experiments, not proof of a global optimum.

![Measured cost and accuracy frontier](label-pareto.png)

## Matched three-repeat experiment

There are 38 development cases: 24 public snapshots, eight synthetic controls and PRs #2967–#2972. Every configured positive and negative label decision is scored against the same frozen, manually established reference: 38 × 3 × 14 = 1,596 decisions, minus twelve uncertain decisions = **1,584 scored**. References were not revised to fit outputs. These cases have been used during development and are not an untouched holdout.

| Strategy                                 | Mean input tokens/item | False positives / misses | Wrong removals | False slop additions | Median / p95 CLI ms | Frontier |
| ---------------------------------------- | ---------------------: | -----------------------: | -------------: | -------------------: | ------------------: | -------- |
| Previous draft (f701c5f), one batch      |                  6,154 |                   10 / 9 |              0 |                    0 |         391.5 / 459 | yes      |
| Richer excerpts, one batch               |                  6,689 |                   15 / 8 |              0 |                    0 |         393.5 / 483 | no       |
| Richer excerpts + claimed-work rule      |                  6,722 |                   12 / 7 |              0 |                    0 |           396 / 496 | no       |
| Two parallel complete-context groups     |                  9,170 |                   11 / 8 |              0 |                    0 |           398 / 558 | no       |
| Four parallel evidence groups            |                 10,343 |                   10 / 8 |              0 |                    0 |           434 / 556 | no       |
| Selected: one batch + two clarifications |                  6,219 |                   10 / 3 |              0 |                    0 |         403.5 / 453 | yes      |
| Clarifications + two parallel groups     |                  9,235 |                   10 / 3 |              0 |                    0 |         396.5 / 474 | no       |
| Clarifications + compact two groups      |                  9,211 |                    9 / 6 |              0 |                    0 |           414 / 681 | no       |

Exact fully determined label sets improve **83/102 → 89/102**. Wrong additions remain **7 → 7**, missed additions fall **3 → 0**, and definite stale-label cleanup remains **52/60 → 52/60**. Neither version makes a wrong removal or new false slop addition in this comparison. Eligibility, additions and removals have different denominators because labels may already exist and human ownership can prevent removal. The improvement is in missed eligible labels, not fewer false positives.

The latest six PRs score 249/249 definite decisions for both versions; the duplicate relationship on #2969 is uncertain and excluded across three repeats. In the 32-case regression cohort, scores improve 1,316/1,335 → 1,322/1,335.

All calls resolved to `jev-1.14.0`. Timings include the published CLI, Node startup and live inference, with two item evaluations concurrent; they exclude live GitHub reads, installation and Actions queue time. Median time is 391.5 → 403.5 ms, so no new latency improvement is claimed. Split experiments ran independent model calls in parallel. One-repeat pilots, including two-stage audits and richer context variants, were screened separately and are excluded from this three-repeat frontier.

## Confirmation and limits

Four reused real diagnostic cases (#2915, #2905, #2908, #2964) score **153/153** definite decisions for both versions, with fifteen uncertain judgments excluded. Both remove 12/15 definite stale labels with no wrong removals. Two new synthetic controls, frozen before inference, test a small unclaimed documentation correction versus the same correction already claimed by an implementation PR: both versions score **84/84**, including the positive contributions-welcome case. These targeted checks are not representative repository-wide accuracy estimates. Positive duplicate coverage remains synthetic.

Every one of the 44 fixtures was replayed through the final production collector and adapter: request hashes exactly match the evaluated candidate, one CLI invocation and one inference request per fixture. All GitHub writes were blocked. The paired [CSV ledger](label-evaluation.csv) contains all 3,696 label rows, including probabilities, negative decisions, additions and removals; blank expectations are uncertain. Each fixture rationale explains the manual reference independently of model output.

## Remaining disagreements

Counts below span three repeats. The thirteen primary errors are ten false positives and three misses. The parity reference on #2930 remains debatable and was retained unchanged. Cleanup misses are reported separately and are not hidden by eligibility accuracy.

| Case           | False positive labels    | Missed eligible labels | Missed stale-label removals |
| -------------- | ------------------------ | ---------------------- | --------------------------- |
| public-2930    | parity ×3                | —                      | —                           |
| public-2941    | —                        | —                      | cli ×2                      |
| public-2932    | —                        | —                      | slop ×3                     |
| public-2939    | —                        | needs reproduction ×3  | —                           |
| public-2949    | bug ×3                   | —                      | —                           |
| public-2917    | contributions welcome ×3 | —                      | contributions welcome ×3    |
| control-900106 | docs ×1                  | —                      | —                           |
| holdout-2905   | —                        | —                      | duplicate ×3                |

All configured categories remain eligible for automatic removal when complete history shows that this action most recently applied the label. Human applications, other bots and incomplete histories remain protected; the published CLI removal buffer still applies. This does not solve human-removal reapplication or guarantee atomic GitHub writes. No human review/application gate is introduced.

## Reference rationale

The following references were frozen before the candidate runs; existing GitHub labels were not treated as ground truth.

### dev

Fixture hash: `316f5fe96d193785e0aac3f5d66a1f5d8f71cfdc38d4bca5b557cb30d66638db`.

- **public-2930:** New MCP feature/public CLI, manifests and MCP README; older #2777 explicitly closed in favor of it, so not duplicate. Expected: feature, cli, dependencies, docs.
- **public-2958:** Homepage styling regression fix, distinct from earlier card addition, so bug/docs and not duplicate. Expected: bug, docs.
- **public-2800:** New upstream Typeset feature and documentation port; later requesting maintainer thanks accepts the review response. No runtime defect needing reproduction. Expected: feature, docs, parity.
- **public-2732:** New public Calendar range mode plus docs/examples and explicit upstream parity, linked to feature request #2735. Expected: feature, docs, parity.
- **public-2919:** New end-user agent workflow/skill with documentation and explicit upstream port; no runtime defect. Expected: feature, docs, parity.
- **public-2941:** Fixes Create undo, updates manifests/lockfile and internal dependency maintenance; no public CLI changes in the diff. Expected: bug, dependencies, chore.
- **public-2962:** Public CLI usage report; maintainer explains data-table intentionally is not installable, so no confirmed defect. Reporter explicitly denies AI description authorship. Expected: cli.
- **public-2953:** Maintainer confirms CLI failure, supplies/accepts a package-manager workaround, and implements fix. Reproduction acceptance without a hosted project is uncertain. No direct evidence an AI wrote the description. Expected: bug, cli, has workaround. Uncertain: needs reproduction.
- **public-2932:** Public CLI defect confirmed through maintainer fix #2947, accessible reproduction project. AI-assisted investigation disclosure does not establish AI description authorship. Expected: bug, cli.
- **public-2931:** Fixes documentation website heading-font inheritance with demonstrated preview reproduction; AI investigation disclosure is not description authorship. Expected: bug, docs.
- **public-2939:** Unconfirmed defect plus explicit new Combobox request. Reporter says animation patch works. No openable project is supplied; maintainer reapplies needs reproduction. No duplicate relationship. Expected: feature, has workaround, needs reproduction.
- **public-2944:** Native select ref type defect confirmed through maintainer fix #2945, specific usable patch. Whether the step-only reproduction has been accepted is uncertain. Expected: bug, has workaround. Uncertain: needs reproduction.
- **public-2928:** Adds a public component export, fulfilling #2927, not duplicating it. Implementation alone is not docs. Expected: feature.
- **public-2929:** Repairs existing InputOTP state styling and aligns with upstream attribute behavior, fixes #2924. Expected: bug, parity.
- **public-2926:** Adds public AI elements primitives, docs/examples, dependency manifests and explicit upstream alignment; fixes #2925, not duplicate. Expected: feature, docs, dependencies, parity.
- **public-2947:** Public CLI bug fix, linked #2932. No package dependency or documentation content changes. Expected: bug, cli.
- **public-2949:** New public CLI flags/noninteractive behavior, docs updates and actual dependency changes; prerequisite for MCP is not duplicate. Expected: feature, cli, docs, dependencies.
- **public-2959:** New public preset support and documentation, explicitly upstream chart/preset parity. Review requests have later concrete resolution replies from the maintainer/author. Expected: feature, cli, docs, parity.
- **public-2771:** Adds upstream composition/API docs and corrects invalid examples. Static reference corrections alone do not require reproduction. Expected: bug, docs, parity.
- **public-2914:** Adds upstream changelogs/demos; author clarified distinct scope and maintainer accepted. Existing component implementation does not duplicate changelogs. Expected: docs, parity.
- **public-2917:** Docs alias correction; already claimed by #2864. A request and its implementation are distinct, not duplicates. No maintainer-confirmed runtime defect. Expected: docs.
- **public-2761:** Fixes broken homepage rendering/layout and docs presentation, explicitly aligned upstream. Renaming CLI tab is not public CLI code. Expected: bug, docs, parity.
- **public-2736:** Internal deployment/release tooling and actual dependency upgrade; Changesets CLI is not the public shadcn-svelte CLI. Expected: chore, dependencies.
- **public-2950:** Documentation and real package dependency migration. Independent internal CI maintenance scope is uncertain; no public CLI package changes. Expected: docs, dependencies. Uncertain: chore.
- **control-900101:** Targeted control: Dropdown hover report repeated Expected: duplicate.
- **control-900102:** Targeted control: feat: add custom item rendering snippet Expected: feature, duplicate.
- **control-900103:** Targeted control: feat: add a timezone mode Expected: feature, slop.
- **control-900104:** Targeted control: feat: add timezone rendering prop Expected: feature.
- **control-900105:** Targeted control: fix: restore spinner visibility Expected: bug, needs reproduction.
- **control-900106:** Targeted control: fix: restore spinner visibility Expected: bug.
- **control-900107:** Targeted control: chore: maintain unit tests Expected: chore, awaiting submitter.
- **control-900108:** Targeted control: chore: maintain unit tests Expected: chore.

### latest

Fixture hash: `cc04179708db0fbfc9bf5e0f11d8bd8b42c8e50db2a040a7d19585003d4ca355`.

- **fresh-2967:** Repairs existing Typeset website presentation and explicitly aligns toolbar/tooltips with shadcn: bug, docs and parity. Existing helper showOnDesktop is reused, not a new consumer API. Unlinked runtime UI fixes have no supplied accessible demonstration of the original defect: needs reproduction. Expected: bug, docs, parity, needs reproduction.
- **fresh-2968:** Fixes documentation preview layout/images and dropdown runtime animations, explicitly restoring missing upstream images: bug, docs, parity and needs reproduction. No linked issue or original-defect reproduction is supplied. Broader preview fixes are distinct from the narrower animation-only PR, so this PR is not redundant. Expected: bug, docs, parity, needs reproduction.
- **fresh-2969:** Restores existing preview-menu animations to match shadcn: bug, docs, parity and needs reproduction. No linked issue or accessible original-defect demonstration. Its complete patch also appears in the current head of #2968, but canonical ownership and when that overlap arose are unclear: duplicate is uncertain, not assumed false. Expected: bug, docs, parity, needs reproduction. Uncertain: duplicate.
- **fresh-2970:** Repairs documentation heading scroll behavior and explicitly compares/alines with upstream shadcn: bug, docs and parity. Local fixed browser-fixture validation is not an accessible reproduction of the original defect; no linked issue, so needs reproduction. Expected: bug, docs, parity, needs reproduction.
- **fresh-2971:** Fixes registry-template installation imports and links defect #2935: bug, without needs reproduction. CLI files contain regression tests only, not a change to the public CLI. Registry implementation and associated regression tests alone are not separate docs or chore scope. Separate page-target fix #2972 and linked report are not duplicates. Expected: bug.
- **fresh-2972:** Fixes registry page targets and documentation examples, linked to defect #2934: bug and docs, without needs reproduction. Only CLI regression tests change under packages/cli; no public CLI implementation, dependency or feature change. Companion import fix #2971 has distinct scope. Expected: bug, docs.

### confirm

Fixture hash: `9e0bd243afcb54ae2be4efd7825aaaf549a88f3c840f8ec1f8c5d919b3f8106a`.

- **holdout-2915:** Maintainer explicitly retains local dependency-upgrade tracking despite upstream cause, so not duplicate or a new feature. Generic npm advice is not a demonstrated workaround. Human removals and later bot reapplications make bug/cli/dependency ownership intent versus classification uncertain, as is accepted reproduction after diagnosis; exclude these judgments rather than infer ground truth from model output. All other labels are definite negatives. Expected: none. Uncertain: bug, cli, dependencies, needs reproduction.
- **holdout-2905:** Fixes component alignment and links defect #2902: bug, not a duplicate of the report or documentation content. A maintainer requests a different fix location, but PR is closed without an explicit response; awaiting submitter is uncertain. No explicit author claim of upstream alignment. Expected: bug. Uncertain: awaiting submitter.
- **holdout-2908:** Maintainer explicitly accepts and merges the local Field.Title data-slot fix for #2635 despite upstream not fixing it. Bug; not a duplicate, docs, feature, or parity port. Linked defect removes reproduction need. Expected: bug.
- **holdout-2964:** Docs plus explicit upstream alignment, and new installed Drawer.Root/NestedRoot showSwipeHandle API and direction data attributes. Feature/docs/parity; porting and existing primitive reuse do not negate the new public API. No described runtime defect requiring reproduction. No dependency manifest changes. Expected: feature, docs, parity.

### sanity

Fixture hash: `d3169f5d8cba3cfa2237a6fb698d1342904c63018ddad74570e2a38b70513c61`.

- **sanity-900201:** Positive unclaimed wording correction Expected: docs, contributions welcome.
- **sanity-900202:** Exact wording correction already claimed in a linked implementation PR Expected: docs.
