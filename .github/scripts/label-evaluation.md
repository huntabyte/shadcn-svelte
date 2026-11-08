# Labeler cost–accuracy frontier — November 7, 2026

The selected request strategy puts each configured positive/negative rule directly into typed criteria, shares item/evidence once, and asks all fourteen questions together. Duplicate relationships are supplied by the bounded GitHub collector instead of a second broad similar-item inference pass. Known bot boilerplate is filtered. CLI test-only changes are excluded from the cli label, and broken interactive website behavior is explicitly covered by reproduction rules. No PR IDs, repository-specific exceptions or new label thresholds are hard-coded into the generic request planner.

The workflow still uses npm-published `@ieedan/label@0.0.1`, with its installed CLI unchanged and no unmerged labeler package. The repository fetch adapter changes outgoing questions. Returned probabilities and configured thresholds are preserved. Every configured label remains automatic; all categories may be removed when complete history shows this action last applied them. Human applications, other bots and incomplete ownership are protected.

## Empirical frontier

![Measured cost–accuracy frontier](label-pareto.png)

Paired comparison on 38 development cases (24 original public snapshots, eight synthetic controls and the latest six PRs), repeated three times. This is 114 item runs per strategy, with the same frozen evidence/reference within each cohort. There are 1,596 eligibility decisions minus twelve uncertain decisions = **1,584 scored**. The latest six PRs were used to clarify generic rules, so they are not a holdout.

| Strategy                                     | Mean input tokens/item | Wrong / missed labels | Wrong removals | False slop additions | Median / p95 CLI ms | On cost/error frontier |
| -------------------------------------------- | ---------------------: | --------------------: | -------------: | -------------------: | ------------------: | ---------------------- |
| Previous draft (39a56cb)                     |                 14,136 |               13 / 39 |              1 |                    2 |         572.5 / 680 | no                     |
| Direct criteria, two requests                |                  9,215 |               18 / 12 |              3 |                    0 |         557.5 / 705 | no                     |
| Parallel evidence scopes, four requests      |                 10,189 |               18 / 12 |              3 |                    0 |           440 / 536 | no                     |
| Lean unified batch                           |                  6,022 |                17 / 9 |              3 |                    0 |           418 / 515 | yes                    |
| Selected unified batch + rule clarifications |                  6,154 |                11 / 8 |              0 |                    0 |           422 / 550 | yes                    |

The selected point uses **56.5% fewer input tokens**, reduces eligibility mistakes **52 → 19**, and reduces median labeling-step time **572.5 → 422 ms** (26.3%). Exact fully determined sets improve **61/102 → 83/102**. Wrong additions fall 10 → 8, missed additions 26 → 3, and intended stale-label removals improve 48/60 → 54/60.

The cheaper lean batch remains non-dominated on cost versus eligibility errors alone: 6,022 tokens and 26 errors, versus 6,154 tokens and 19 errors for the selected point. It has three wrong removals on the latest PRs, whereas the selected point has none. The selected version is the safer measured tradeoff, not a claim of a globally optimal architecture. Public-only false positives increase in one cohort; details below prevent aggregate improvements from hiding that tradeoff.

The four-request and fourteen-request candidates execute independent groups concurrently, bounded at four. All expected answers are validated and in-flight work drains before any combined decision is returned; a failed group stops queued work and cannot return partial decisions. The chosen strategy needs only one request for the single-item workflow. GitHub item/history, search/files/reviews and related-item reads are also parallelised, capped at four active requests. Their output was verified byte-identical for all 42 source cases.

Latency is wall-clock time for the actual published CLI under frozen GitHub inputs, with two item evaluations running concurrently across cases. It includes Node startup and live TypeSafe requests, but excludes real GitHub network reads, dependency installation, Actions queueing and downstream dispatch jobs. It is **not** a full Actions end-to-end speedup claim. New GitHub read concurrency is covered by a bounded-overlap/deterministic-output test; no live end-to-end collection speedup was measured.

An initial 16-case, one-repeat pilot also tested fourteen focused parallel requests with reduced context. They averaged 33,088 input tokens/item with four eligibility errors, versus 5,459 tokens and three errors for the unified batch. The focused strategy was not advanced because it showed no quality gain in that pilot. Pilot points are excluded from the full 38-case frontier.

## Confirmation and per-cohort results

The first cohort is a development regression set. The latest six PRs are also development data after the CLI-test and reproduction clarifications. Four other real cases (#2915, #2905, #2908, #2964) were selected and manually annotated before any inference, then used for diagnostic confirmation without tuning to their outputs. They were targeted for duplicate-label and port/API boundaries, not randomly sampled, and are not a repository-wide accuracy estimate. Existing labels were never treated as ground truth.

| Cohort                             | Before eligibility | Selected eligibility | Before FP / FN | Selected FP / FN | Before wrong removals | Selected wrong removals | Tokens/item before → selected |
| ---------------------------------- | -----------------: | -------------------: | -------------: | ---------------: | --------------------: | ----------------------: | ----------------------------: |
| Regression: 24 public + 8 controls |          1303/1335 |            1316/1335 |        11 / 21 |           11 / 8 |                     0 |                       0 |                14,400 → 6,365 |
| Latest six PRs                     |            229/249 |              249/249 |         2 / 18 |            0 / 0 |                     1 |                       0 |                12,731 → 5,026 |
| Four new real diagnostic cases     |            150/153 |              153/153 |          3 / 0 |            0 / 0 |                     0 |                       0 |                15,924 → 7,018 |

The original public cases score 971/999 → 982/999, with false positives **7 → 9**, misses **21 → 8**, precision **95.9% → 95.1%** and recall **88.5% → 95.6%**. Wrong public additions increase **4 → 6** while misses fall **14 → 3**. This is not an improvement in every individual error metric. Synthetic controls score 332/336 → 334/336. Positive duplicate controls pass 6/6, explicit AI-description authorship 3/3 and unlinked bug-fix reproduction 3/3. New false slop additions fall 2 → 0 across the paired development cohorts.

Latest PRs #2967–#2972 score **249/249 definite eligibility decisions**, with no wrong additions or removals. One ambiguous duplicate judgment on #2969 is excluded across three repeats. The two CLI registry-template PRs change tests, not CLI implementation; the four unlinked interactive website fixes qualify for reproduction under the clarified policy. These six PRs were used during this iteration and must not be described as untouched validation.

The four new diagnostic cases score **150/153 → 153/153** definite eligibility decisions. Fifteen uncertain eligibility judgments are excluded from 168 possible decisions. Ambiguities include the intent of human removals versus semantic criteria on closed dependency tracker #2915, accepted reproduction, and whether a closed PR still awaits a review response. Addition/removal denominators differ because existing labels and ownership matter. Only two cases have fully determined label sets; both are correct in all three repeats (6/6). Positive duplicate coverage remains synthetic: the examined real duplicate-labelled cases were judged non-duplicates after source review.

Across the new diagnostics, 12/15 definite stale-label targets are removed by both versions, with no wrong removals. This does not establish universal duplicate recall, robustness to arbitrary prompt injection, or a complete solution to human-removal reapplication. No labels were changed on GitHub during evaluation.

## Remaining selected-version errors

Counts are across three repeats against unchanged frozen references. These are reference disagreements, not infallible ground truth. The original parity annotation for #2930 remains debatable; it is retained unchanged.

| Case           | False positive labels    | Missed eligible labels | Missed stale-label removals |
| -------------- | ------------------------ | ---------------------- | --------------------------- |
| public-2930    | parity ×3                | —                      | —                           |
| public-2932    | —                        | —                      | slop ×3                     |
| public-2931    | —                        | docs ×3                | —                           |
| public-2939    | —                        | needs reproduction ×3  | —                           |
| public-2928    | —                        | feature ×2             | —                           |
| public-2949    | bug ×3                   | —                      | —                           |
| public-2917    | contributions welcome ×3 | —                      | contributions welcome ×3    |
| control-900106 | docs ×2                  | —                      | —                           |
| holdout-2905   | —                        | —                      | duplicate ×3                |

## Cost and reproducibility

Token counts are the sum of actual provider-reported `usage.input_tokens`, not character estimates or call-count multipliers. All recorded calls resolved to `jev-1.14.0`. Applying [TypeSafe’s published input price](https://docs.typesafe.ai/models), $0.042 per million tokens, the matched development comparison implies approximately **$0.59 → $0.26 per 1,000 item runs** for model input. Account-specific terms and Actions costs are excluded. [API usage definition](https://docs.typesafe.ai/api/system-one).

On the original 32-case regression set, the selected strategy uses 6,365 input tokens/item, about 31% below the previously measured deployed workflow’s 9,270. The archived original fourteen-call commit used 46,076 tokens/item on the same six latest PR snapshots, versus 5,026 for the selected strategy; that comparison is illustrative and is not mixed into the 38-case frontier. Filtering bot-triggered runs may reduce lifecycle cost, but no net lifecycle saving is inferred from these per-run measurements.

The exact installed CLI is unchanged. The primary and diagnostic reference files are hash-checked before inference; annotations were not revised to fit outputs. The [per-decision CSV](label-evaluation.csv) contains all 3,528 before/after label rows, including probabilities and expected/actual eligibility, addition and removal decisions. Unknown expected judgments are blank; the full local research ledger also includes rejected candidates. The final production adapter was replayed against all 42 cases and generated exactly the same request hashes as the live evaluated candidate. All provider answers were complete and valid. All GitHub writes were blocked; the supplied API key was held only in hidden input and process environments.

## Every configured label

Each cell is `expected; previous-draft positives → selected positives` out of three repeats. `1` is eligible, `0` ineligible and `?` uncertain. These tables include negative decisions; precision, recall, errors and exact sets are reported separately to avoid inflating conclusions with easy negatives.

### Regression: 24 public + 8 controls

Reference hash: `316f5fe96d193785e0aac3f5d66a1f5d8f71cfdc38d4bca5b557cb30d66638db`.

| Case                                                            | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| --------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2930](https://github.com/huntabyte/shadcn-svelte/pull/2930)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 3 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2958](https://github.com/huntabyte/shadcn-svelte/pull/2958)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2800](https://github.com/huntabyte/shadcn-svelte/pull/2800)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2732](https://github.com/huntabyte/shadcn-svelte/pull/2732)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2919](https://github.com/huntabyte/shadcn-svelte/pull/2919)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2941](https://github.com/huntabyte/shadcn-svelte/pull/2941)   | 0; 0 → 0           | 1; 3 → 3 | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2962](https://github.com/huntabyte/shadcn-svelte/issues/2962) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2953](https://github.com/huntabyte/shadcn-svelte/issues/2953) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 3 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2932](https://github.com/huntabyte/shadcn-svelte/issues/2932) | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2931](https://github.com/huntabyte/shadcn-svelte/pull/2931)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2939](https://github.com/huntabyte/shadcn-svelte/issues/2939) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 3 → 3 | 1; 3 → 3       | 1; 3 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2944](https://github.com/huntabyte/shadcn-svelte/issues/2944) | 0; 0 → 0           | 1; 1 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 3 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2928](https://github.com/huntabyte/shadcn-svelte/pull/2928)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 3 → 1 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2929](https://github.com/huntabyte/shadcn-svelte/pull/2929)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2926](https://github.com/huntabyte/shadcn-svelte/pull/2926)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 1; 3 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 2 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2947](https://github.com/huntabyte/shadcn-svelte/pull/2947)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 1 → 0 | 0; 0 → 0 |
| [#2949](https://github.com/huntabyte/shadcn-svelte/pull/2949)   | 0; 0 → 0           | 0; 0 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 3 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2959](https://github.com/huntabyte/shadcn-svelte/pull/2959)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2771](https://github.com/huntabyte/shadcn-svelte/pull/2771)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2914](https://github.com/huntabyte/shadcn-svelte/pull/2914)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2917](https://github.com/huntabyte/shadcn-svelte/issues/2917) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 3              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2761](https://github.com/huntabyte/shadcn-svelte/pull/2761)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 3 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2736](https://github.com/huntabyte/shadcn-svelte/pull/2736)   | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2950](https://github.com/huntabyte/shadcn-svelte/pull/2950)   | 0; 0 → 0           | 0; 0 → 0 | ?; 0 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900101                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900102                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900103                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 |
| control-900104                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 1 → 0 | 0; 0 → 0 |
| control-900105                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 3 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900106                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 3 → 2 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900107                                                  | 1; 3 → 3           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900108                                                  | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |

### Latest six PRs

Reference hash: `cc04179708db0fbfc9bf5e0f11d8bd8b42c8e50db2a040a7d19585003d4ca355`.

| Case                                                          | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| ------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2967](https://github.com/huntabyte/shadcn-svelte/pull/2967) | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2968](https://github.com/huntabyte/shadcn-svelte/pull/2968) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2969](https://github.com/huntabyte/shadcn-svelte/pull/2969) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | ?; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2970](https://github.com/huntabyte/shadcn-svelte/pull/2970) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2971](https://github.com/huntabyte/shadcn-svelte/pull/2971) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2972](https://github.com/huntabyte/shadcn-svelte/pull/2972) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 2 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |

### Four new real diagnostic cases

Reference hash: `9e0bd243afcb54ae2be4efd7825aaaf549a88f3c840f8ec1f8c5d919b3f8106a`.

| Case                                                            | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| --------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2915](https://github.com/huntabyte/shadcn-svelte/issues/2915) | 0; 0 → 0           | ?; 3 → 3 | 0; 0 → 0 | ?; 3 → 3 | 0; 0 → 0              | ?; 0 → 1     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2905](https://github.com/huntabyte/shadcn-svelte/pull/2905)   | ?; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 3 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2908](https://github.com/huntabyte/shadcn-svelte/pull/2908)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2964](https://github.com/huntabyte/shadcn-svelte/pull/2964)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 3 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 |

## Diagnostic reference reasoning

**#2915:** Maintainer explicitly retains local dependency-upgrade tracking despite upstream cause, so not duplicate or a new feature. Generic npm advice is not a demonstrated workaround. Human removals and later bot reapplications make bug/cli/dependency ownership intent versus classification uncertain, as is accepted reproduction after diagnosis; exclude these judgments rather than infer ground truth from model output. All other labels are definite negatives. Expected: none among definite judgments. Uncertain: bug, cli, dependencies, needs reproduction.

**#2905:** Fixes component alignment and links defect #2902: bug, not a duplicate of the report or documentation content. A maintainer requests a different fix location, but PR is closed without an explicit response; awaiting submitter is uncertain. No explicit author claim of upstream alignment. Expected: bug. Uncertain: awaiting submitter.

**#2908:** Maintainer explicitly accepts and merges the local Field.Title data-slot fix for #2635 despite upstream not fixing it. Bug; not a duplicate, docs, feature, or parity port. Linked defect removes reproduction need. Expected: bug.

**#2964:** Docs plus explicit upstream alignment, and new installed Drawer.Root/NestedRoot showSwipeHandle API and direction data attributes. Feature/docs/parity; porting and existing primitive reuse do not negate the new public API. No described runtime defect requiring reproduction. No dependency manifest changes. Expected: feature, docs, parity.
