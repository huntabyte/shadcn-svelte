# Automatic labeler evaluation — November 7, 2026

Both sides use the exact npm-published `@ieedan/label@0.0.1`, checksum `357568d4625a7f954eb2179620ee582a718d7f7a`. No unmerged core code is used. Before runs the deployed repository policy/workflow behavior; after adds bounded GitHub context, literal per-label policy prompts, automatic per-label CLI passes and scoped bot-owned cleanup. Every invocation uses `--dry-run`, and a fetch adapter rejects GitHub writes. TypeSafe inference is live; the key is supplied via hidden input and process environment only.

Twenty-four public issue/PR snapshots from the retrospective plus eight synthetic automation controls, repeated three times. All fourteen configured labels are scored for eligibility and addition. Primary expectations were frozen before the first inference; their hash remains `316f5fe96d193785e0aac3f5d66a1f5d8f71cfdc38d4bca5b557cb30d66638db`. Cleanup expectations for the newly added removal capability were separately frozen before testing cleanup. No initial expectation was changed to fit outputs. Current snapshots, including closed items, are regression fixtures; this is not an event-time reconstruction, fresh holdout or repository-wide accuracy estimate.

Earlier development iterations are retained locally. The final collector and policies were compared against the evaluated context and per-pass configs. All 1,344 final-pass provider responses pass the completeness guard without changes, and all 192 CLI result logs match the scored removal behavior.

## Public cases

| Metric                            |         Before |           After |
| --------------------------------- | -------------: | --------------: |
| Correct eligibility decisions     |        878/999 |         983/999 |
| Eligibility precision             | 89/116 (76.7%) | 174/181 (96.1%) |
| Eligibility recall                | 89/183 (48.6%) | 174/183 (95.1%) |
| Exact fully determined label sets |          10/63 |           47/63 |
| Correct addition decisions        |        951/999 |         991/999 |
| Wrong additions                   |              7 |               4 |
| Missed additions                  |             41 |               4 |
| Correct stale-label removals      |           0/27 |           21/27 |
| Wrong removals                    |              0 |               0 |

There are 1,008 public eligibility decisions per version; nine uncertain eligibility judgments are excluded from the 999 denominator. The same nine potential additions are uncertain. Nine runs containing an uncertain label are excluded from exact-set scoring (72 total public runs, 63 fully determined). Do not interpret the many negative decisions as complete-item accuracy. Precision/recall and exact sets show the remaining gaps.

Both new false duplicate labels (#2930 and #2958) are automatically removed in all repeats; the legacy duplicate on #2917 is removed too. Four stale reproduction labels are removed. The two bot-applied slop labels on #2932 and #2962 remain in all repeats because the conservative removal buffer is stricter at the 0.9 application threshold. They are missed cleanups, not tasks routed to a human. The existing human-applied reproduction label on #2939 is preserved.

## Automation controls

Eligibility is 315/336 → 330/336. Every intended positive is recognized after the changes (36/36 positive label decisions). Automatic duplicate controls pass 6/6, explicit AI-description authorship passes 3/3, and the unlinked bug-fix PR needing reproduction passes 3/3. The code-assistance-only negative, empty changes-requested review, and later approval controls also match their target labels in all repeats.

Six false positives remain: the component-only bug-fix control that links an official demo gets docs and parity in all three repeats. This is not a claim that all control labels pass. No review queue, suggestion-only duplicate/slop setting or manual approval gate is introduced.

## Remaining reference disagreements

Against the frozen reference, final public eligibility has seven false positives and nine false negatives. These include parity on #2930, contributions welcome on #2917, an intermittent dependencies label on #2761, and misses for chore on #2941, docs on #2931/#2959, and bug on #2932.

Two original annotations are reasonably debatable after source review: #2930’s partial upstream MCP alignment can support parity, and #2941’s dependency housekeeping can be viewed as part of its bug fix rather than independent chore scope. The table retains the original frozen judgments; these were not relabeled after seeing model outputs. The ledger records reference disagreements rather than claiming infallible ground truth.

## Operational checks and tradeoffs

- Sixteen local tests cover relationship/state context, bounded files/comments/patches, pending reviews, foreign-repository links, rate-limit retry, permission failures, automatic application, bot-only cleanup ownership, shell-safe arguments, bounded concurrency, temp cleanup and complete model responses, including the published CLI’s missing-answer removal regression.
- Repository lint passes. The workflow installs the exact CLI and YAML parser from an npm lockfile; no unmerged labeler PR is required.
- There are fourteen model requests per item instead of two. Bot comments are filtered and commit synchronization gets an explicit trigger, but no net cost saving is claimed.
- Only current GitHub Actions-applied duplicate/slop/reproduction labels can be removed. Other labels, human-applied labels and incomplete ownership histories are preserved. Concurrent label changes are not atomic.
- The response guard rejects missing/invalid probabilities before the published CLI can turn them into negative defaults. Failed context fetches stop the job before inference.

## Every configured label

Each cell is `expected; before positive repeats → after positive repeats` (out of three). `1` means eligible, `0` means ineligible, `?` means uncertain. Additions and removals, each repeat’s score and verdict, and all 8,064 before/after label/action checks are retained in the local evaluation artifacts.

| Case                                                            | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| --------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2930](https://github.com/huntabyte/shadcn-svelte/pull/2930)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 3 | 0; 1 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2958](https://github.com/huntabyte/shadcn-svelte/pull/2958)   | 0; 0 → 0           | 1; 1 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2800](https://github.com/huntabyte/shadcn-svelte/pull/2800)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2732](https://github.com/huntabyte/shadcn-svelte/pull/2732)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2919](https://github.com/huntabyte/shadcn-svelte/pull/2919)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 2 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2941](https://github.com/huntabyte/shadcn-svelte/pull/2941)   | 0; 0 → 0           | 1; 3 → 3 | 1; 3 → 0 | 0; 3 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2962](https://github.com/huntabyte/shadcn-svelte/issues/2962) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2953](https://github.com/huntabyte/shadcn-svelte/issues/2953) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 0 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2932](https://github.com/huntabyte/shadcn-svelte/issues/2932) | 0; 0 → 0           | 1; 0 → 2 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 3 → 0 | 0; 2 → 0 | 0; 0 → 0 |
| [#2931](https://github.com/huntabyte/shadcn-svelte/pull/2931)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2939](https://github.com/huntabyte/shadcn-svelte/issues/2939) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 1; 3 → 3       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2944](https://github.com/huntabyte/shadcn-svelte/issues/2944) | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 1 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2928](https://github.com/huntabyte/shadcn-svelte/pull/2928)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2929](https://github.com/huntabyte/shadcn-svelte/pull/2929)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2926](https://github.com/huntabyte/shadcn-svelte/pull/2926)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2947](https://github.com/huntabyte/shadcn-svelte/pull/2947)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2949](https://github.com/huntabyte/shadcn-svelte/pull/2949)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2959](https://github.com/huntabyte/shadcn-svelte/pull/2959)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 1 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2771](https://github.com/huntabyte/shadcn-svelte/pull/2771)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2914](https://github.com/huntabyte/shadcn-svelte/pull/2914)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2917](https://github.com/huntabyte/shadcn-svelte/issues/2917) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 3              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 1 → 0 | 0; 0 → 0 |
| [#2761](https://github.com/huntabyte/shadcn-svelte/pull/2761)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 1     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2736](https://github.com/huntabyte/shadcn-svelte/pull/2736)   | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2950](https://github.com/huntabyte/shadcn-svelte/pull/2950)   | 0; 0 → 0           | 0; 0 → 0 | ?; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900101                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 2 → 0 | 0; 0 → 0 |
| control-900102                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900103                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 1 → 0           | 0; 0 → 0 | 1; 0 → 3 | 0; 0 → 0 |
| control-900104                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900105                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900106                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| control-900107                                                  | 1; 0 → 3           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900108                                                  | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
