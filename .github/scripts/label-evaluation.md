# Automatic labeler evaluation — November 7, 2026

Both sides execute npm-published `@ieedan/label@0.0.1` (tarball SHA1 `357568d4625a7f954eb2179620ee582a718d7f7a`). After uses a repository-side fetch adapter that expands the published CLI’s indirect label references into literal question policies, checks complete responses and caps inference requests at two. The installed package is unchanged; its outgoing questions are adapted. No unmerged labeler package is required.

One CLI invocation per item makes one batched request plus one similar-issues request: **two inference requests before and after**, confirmed for all 96 runs on each side. The earlier fourteen-request implementation was rejected and its scores are superseded. Extra context changes request size; equal request count does not prove equal billed cost. No pricing or dollar-cost estimate was measured.

All configured categories may be removed when complete timeline history shows the latest application was by `github-actions[bot]`. Human-applied labels, other bots’ labels and unknown ownership are preserved. The published CLI’s low-confidence removal buffer still applies. Duplicate and slop application remain fully automatic.

The reference was manually established from discussions, reviews and diffs before inference: 24 public snapshots plus eight synthetic controls, repeated three times, all fourteen labels scored. Eligibility/addition reference hash remains `316f5fe96d193785e0aac3f5d66a1f5d8f71cfdc38d4bca5b557cb30d66638db`. Removal expectations were expanded before this run by comparing the unchanged eligibility reference with current action-owned labels. The original baseline outputs are reused unchanged. This is a development regression set, not a fresh holdout or an event-time reconstruction. All runs use `--dry-run`; frozen GitHub GET responses and a fetch adapter reject GitHub writes. Credentials are passed only through hidden input and process environment.

| Public-case result            |  Before |   After |
| ----------------------------- | ------: | ------: |
| Correct eligibility decisions | 878/999 | 971/999 |
| Label precision               |   76.7% |   96.4% |
| Label recall                  |   48.6% |   88.0% |
| Exact determined label sets   |   10/63 |   38/63 |
| Wrong / missed additions      |  7 / 41 |  3 / 15 |
| Correct stale-label removals  |    0/60 |   49/60 |
| Wrong removals                |       0 |       0 |

The public denominator is 1,008 label decisions minus nine uncertain reference judgments = 999. Exact-set scoring excludes nine runs with uncertainty: 72 − 9 = 63. Negative decisions contribute to overall correctness, so precision, recall, exact sets and wrong removals are reported separately. Cleanup denominators now include all categories and therefore differ from the earlier three-category report.

Automation controls: eligibility 315/336 → 333/336; exact label sets 7/24 → 21/24. After has 3 false positives and 0 false negatives.

## Every remaining disagreement

Counts below are across three repeats against the unchanged reference. Two reference judgments remain debatable: partial upstream MCP alignment can support parity on #2930, and dependency housekeeping in #2941 can be treated as part of its bug fix instead of separate chore scope. They retain their original scoring.

| Case           | False eligibility positives | Missed eligible labels | Wrong removals | Missed removals          |
| -------------- | --------------------------- | ---------------------- | -------------- | ------------------------ |
| public-2930    | —                           | docs ×3                | —              | —                        |
| public-2941    | —                           | chore ×3               | —              | —                        |
| public-2962    | —                           | —                      | —              | slop ×3                  |
| public-2932    | —                           | bug ×3                 | —              | slop ×3                  |
| public-2931    | —                           | docs ×3                | —              | —                        |
| public-2944    | —                           | bug ×3                 | —              | contributions welcome ×2 |
| public-2926    | —                           | parity ×1              | —              | —                        |
| public-2949    | —                           | docs ×3                | —              | —                        |
| public-2959    | —                           | docs ×3                | —              | —                        |
| public-2917    | contributions welcome ×3    | —                      | —              | contributions welcome ×3 |
| public-2761    | feature ×3                  | —                      | —              | —                        |
| control-900106 | docs ×3                     | —                      | —              | —                        |

## Every configured label

Each cell is `expected; before positive repeats → after positive repeats` out of three. `1` means eligible, `0` ineligible and `?` uncertain. All 8,064 eligibility/addition/removal checks, including scores and individual verdicts, are retained in the local `every-label-decision-batched.csv`.

| Case                                                            | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| --------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2930](https://github.com/huntabyte/shadcn-svelte/pull/2930)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 0 | 0; 1 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2958](https://github.com/huntabyte/shadcn-svelte/pull/2958)   | 0; 0 → 0           | 1; 1 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2800](https://github.com/huntabyte/shadcn-svelte/pull/2800)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2732](https://github.com/huntabyte/shadcn-svelte/pull/2732)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2919](https://github.com/huntabyte/shadcn-svelte/pull/2919)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 2 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2941](https://github.com/huntabyte/shadcn-svelte/pull/2941)   | 0; 0 → 0           | 1; 3 → 3 | 1; 3 → 0 | 0; 3 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2962](https://github.com/huntabyte/shadcn-svelte/issues/2962) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2953](https://github.com/huntabyte/shadcn-svelte/issues/2953) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 0 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2932](https://github.com/huntabyte/shadcn-svelte/issues/2932) | 0; 0 → 0           | 1; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 3 → 0 | 0; 2 → 0 | 0; 0 → 0 |
| [#2931](https://github.com/huntabyte/shadcn-svelte/pull/2931)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2939](https://github.com/huntabyte/shadcn-svelte/issues/2939) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 1; 3 → 3       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2944](https://github.com/huntabyte/shadcn-svelte/issues/2944) | 0; 0 → 0           | 1; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 1 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2928](https://github.com/huntabyte/shadcn-svelte/pull/2928)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2929](https://github.com/huntabyte/shadcn-svelte/pull/2929)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2926](https://github.com/huntabyte/shadcn-svelte/pull/2926)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 2 | 0; 0 → 0 | 0; 0 → 0 |
| [#2947](https://github.com/huntabyte/shadcn-svelte/pull/2947)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2949](https://github.com/huntabyte/shadcn-svelte/pull/2949)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2959](https://github.com/huntabyte/shadcn-svelte/pull/2959)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2771](https://github.com/huntabyte/shadcn-svelte/pull/2771)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2914](https://github.com/huntabyte/shadcn-svelte/pull/2914)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2917](https://github.com/huntabyte/shadcn-svelte/issues/2917) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 3              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 1 → 0 | 0; 0 → 0 |
| [#2761](https://github.com/huntabyte/shadcn-svelte/pull/2761)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2736](https://github.com/huntabyte/shadcn-svelte/pull/2736)   | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2950](https://github.com/huntabyte/shadcn-svelte/pull/2950)   | 0; 0 → 0           | 0; 0 → 0 | ?; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900101                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 2 → 0 | 0; 0 → 0 |
| control-900102                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900103                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 1 → 0           | 0; 0 → 0 | 1; 0 → 3 | 0; 0 → 0 |
| control-900104                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900105                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900106                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900107                                                  | 1; 0 → 3           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900108                                                  | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |

## Reference reasoning

**public-2930:** New MCP feature/public CLI, manifests and MCP README; older #2777 explicitly closed in favor of it, so not duplicate. Expected: feature, cli, dependencies, docs.

**public-2958:** Homepage styling regression fix, distinct from earlier card addition, so bug/docs and not duplicate. Expected: bug, docs.

**public-2800:** New upstream Typeset feature and documentation port; later requesting maintainer thanks accepts the review response. No runtime defect needing reproduction. Expected: feature, docs, parity.

**public-2732:** New public Calendar range mode plus docs/examples and explicit upstream parity, linked to feature request #2735. Expected: feature, docs, parity.

**public-2919:** New end-user agent workflow/skill with documentation and explicit upstream port; no runtime defect. Expected: feature, docs, parity.

**public-2941:** Fixes Create undo, updates manifests/lockfile and internal dependency maintenance; no public CLI changes in the diff. Expected: bug, dependencies, chore.

**public-2962:** Public CLI usage report; maintainer explains data-table intentionally is not installable, so no confirmed defect. Reporter explicitly denies AI description authorship. Expected: cli.

**public-2953:** Maintainer confirms CLI failure, supplies/accepts a package-manager workaround, and implements fix. Reproduction acceptance without a hosted project is uncertain. No direct evidence an AI wrote the description. Expected: bug, cli, has workaround. Uncertain: needs reproduction.

**public-2932:** Public CLI defect confirmed through maintainer fix #2947, accessible reproduction project. AI-assisted investigation disclosure does not establish AI description authorship. Expected: bug, cli.

**public-2931:** Fixes documentation website heading-font inheritance with demonstrated preview reproduction; AI investigation disclosure is not description authorship. Expected: bug, docs.

**public-2939:** Unconfirmed defect plus explicit new Combobox request. Reporter says animation patch works. No openable project is supplied; maintainer reapplies needs reproduction. No duplicate relationship. Expected: feature, has workaround, needs reproduction.

**public-2944:** Native select ref type defect confirmed through maintainer fix #2945, specific usable patch. Whether the step-only reproduction has been accepted is uncertain. Expected: bug, has workaround. Uncertain: needs reproduction.

**public-2928:** Adds a public component export, fulfilling #2927, not duplicating it. Implementation alone is not docs. Expected: feature.

**public-2929:** Repairs existing InputOTP state styling and aligns with upstream attribute behavior, fixes #2924. Expected: bug, parity.

**public-2926:** Adds public AI elements primitives, docs/examples, dependency manifests and explicit upstream alignment; fixes #2925, not duplicate. Expected: feature, docs, dependencies, parity.

**public-2947:** Public CLI bug fix, linked #2932. No package dependency or documentation content changes. Expected: bug, cli.

**public-2949:** New public CLI flags/noninteractive behavior, docs updates and actual dependency changes; prerequisite for MCP is not duplicate. Expected: feature, cli, docs, dependencies.

**public-2959:** New public preset support and documentation, explicitly upstream chart/preset parity. Review requests have later concrete resolution replies from the maintainer/author. Expected: feature, cli, docs, parity.

**public-2771:** Adds upstream composition/API docs and corrects invalid examples. Static reference corrections alone do not require reproduction. Expected: bug, docs, parity.

**public-2914:** Adds upstream changelogs/demos; author clarified distinct scope and maintainer accepted. Existing component implementation does not duplicate changelogs. Expected: docs, parity.

**public-2917:** Docs alias correction; already claimed by #2864. A request and its implementation are distinct, not duplicates. No maintainer-confirmed runtime defect. Expected: docs.

**public-2761:** Fixes broken homepage rendering/layout and docs presentation, explicitly aligned upstream. Renaming CLI tab is not public CLI code. Expected: bug, docs, parity.

**public-2736:** Internal deployment/release tooling and actual dependency upgrade; Changesets CLI is not the public shadcn-svelte CLI. Expected: chore, dependencies.

**public-2950:** Documentation and real package dependency migration. Independent internal CI maintenance scope is uncertain; no public CLI package changes. Expected: docs, dependencies. Uncertain: chore.

**control-900101:** Targeted control: Dropdown hover report repeated Expected: duplicate.

**control-900102:** Targeted control: feat: add custom item rendering snippet Expected: feature, duplicate.

**control-900103:** Targeted control: feat: add a timezone mode Expected: feature, slop.

**control-900104:** Targeted control: feat: add timezone rendering prop Expected: feature.

**control-900105:** Targeted control: fix: restore spinner visibility Expected: bug, needs reproduction.

**control-900106:** Targeted control: fix: restore spinner visibility Expected: bug.

**control-900107:** Targeted control: chore: maintain unit tests Expected: chore, awaiting submitter.

**control-900108:** Targeted control: chore: maintain unit tests Expected: chore.
