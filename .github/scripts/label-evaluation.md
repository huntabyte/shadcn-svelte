# Label accuracy and input-token cost — November 7, 2026

Both versions execute npm-published `@ieedan/label@0.0.1` (tarball SHA1 `357568d4625a7f954eb2179620ee582a718d7f7a`). The draft adapts outgoing questions to include literal label policies; the installed package is unchanged and no unmerged core package is imported. All reported calls resolved to `jev-1.14.0`. All runs are dry runs; a frozen GitHub adapter rejects writes. Credentials are supplied through hidden input and process environment only.

## Cost is total input tokens, not call count

Costs below sum actual `usage.input_tokens` returned by TypeSafe across every request. They are not estimated from characters or call counts. Each strategy uses the same 24 public regression snapshots plus eight controls, repeated three times (96 item runs). The draft retains its current request strategy: cheaper candidates introduced false description-authorship labels or wrong removals. The intermediate experiments are not shipped; all evaluated candidates are listed below.

| Strategy                                   | Input tokens total | Mean per item | Public FP / FN | Wrong removals | Control FP / FN |
| ------------------------------------------ | -----------------: | ------------: | -------------: | -------------: | --------------: |
| Deployed workflow                          |            889,935 |         9,270 |        27 / 93 |              0 |          1 / 18 |
| Current draft (retained)                   |          1,382,373 |        14,400 |         7 / 19 |              0 |           4 / 0 |
| Compact evidence and deduplicated policies |            968,145 |        10,085 |         9 / 17 |              2 |          10 / 1 |
| Compact evidence, retained root guidance   |            984,465 |        10,255 |         12 / 9 |              3 |          12 / 0 |
| Remove duplicate policies and bot comments |          1,044,171 |        10,877 |         8 / 23 |              0 |           3 / 0 |
| Remove duplicate policies only             |          1,139,301 |        11,868 |         9 / 17 |              0 |           3 / 0 |
| Retain label summaries                     |          1,204,485 |        12,547 |        10 / 22 |              0 |           4 / 0 |
| Remove bot comments only                   |          1,287,243 |        13,409 |         6 / 22 |              2 |           4 / 0 |
| Shorter repeated question instructions     |          1,305,189 |        13,596 |          9 / 6 |              0 |           3 / 0 |
| Short instructions, full authorship rubric |          1,310,565 |        13,652 |          9 / 6 |              0 |           5 / 0 |
| Fourteen focused, reduced-context requests |          3,508,503 |        36,547 |         9 / 13 |              0 |          11 / 0 |

The retained draft uses **55.3% more input tokens per item than deployed** on this regression set. It is not cost-neutral. Focused calls average 36,547 tokens, about 2.54× the retained draft, despite filtering context by label. A call-count cap is no longer used as the cost objective; SDK retries remain available. The workflow logs provider-reported per-request and cumulative input tokens. Missing usage is marked unavailable, never counted as zero.

At [TypeSafe’s published input price](https://docs.typesafe.ai/models) of $0.042 per million tokens, the measured means imply approximately **$0.39 deployed, $0.60 draft, or $1.53 focused per 1,000 item runs**. These are model-input list-price estimates, excluding GitHub Actions costs and any account-specific terms. [The API defines input_tokens as billable input usage](https://docs.typesafe.ai/api/system-one). Bot-comment event filtering can reduce repeat runs, but no net lifecycle saving is asserted from these per-run tests.

## Regression accuracy

| Result                        | Deployed |   Draft |
| ----------------------------- | -------: | ------: |
| Correct eligibility decisions |  879/999 | 973/999 |
| Label precision               |    76.9% |   95.9% |
| Label recall                  |    49.2% |   89.6% |
| Exact determined label sets   |    10/63 |   39/63 |
| Wrong / missed additions      |   7 / 41 |  4 / 14 |
| Correct stale-label removals  |     0/60 |   49/60 |
| Wrong removals                |        0 |       0 |

The primary manual reference was frozen before earlier development inference and is unchanged. It covers discussions, reviews and diffs for all fourteen configured labels. There are 1,008 public eligibility judgments minus nine uncertain judgments = 999 scored. Exact-set scoring excludes nine uncertain runs: 72 − 9 = 63. All-category removal expectations were frozen before removal evaluation. This is a development regression set, not a fresh holdout or historical event-time replay. These are new measured-usage reruns; small differences from earlier reports reflect model variability, not revised reference labels.

Automation controls score 317/336 → 332/336. The draft has 4 false positives and 0 false negatives. No review queue, disabled duplicate/slop application or human approval gate is introduced.

Every configured category can be removed when complete timeline history shows this action last applied it. Human applications, other bots and incomplete ownership are preserved. Both false duplicates (#2930/#2958) are removed in all repeats. The conservative published removal buffer leaves eleven stale-label instances, including both stale slop labels. History is a snapshot; writes are not atomic.

Two original reference annotations remain debatable: partial upstream MCP alignment on #2930 could support parity, and dependency housekeeping on #2941 could be treated as part of its bug fix rather than separate chore scope. Original expectations and scoring are retained.

## Fresh PRs opened November 7 in America/Chicago

Six PRs (#2967–#2972) were collected after the draft was built, including four created after UTC midnight. PR #2966 is excluded because it is this labeler change. All fourteen label expectations were manually established from current bodies, discussions, reviews and full patches before any inference on these fixtures. Their freeze hash is `a26a1e442116d9452b455c92a9db86740b23d771fd28f45c8de0f069e1913025`. No policy was tuned to their results. Three repeats compare deployed with the retained draft; candidate experiments on this set are not used for the headline result. Current snapshots are frozen and are not exact replays of the original workflow event.

| PR                                                            | Snapshot labels               | Expected eligible labels                                    | Draft selected labels (three repeats) |
| ------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------- | ------------------------------------- |
| [#2967](https://github.com/huntabyte/shadcn-svelte/pull/2967) | bug, docs, needs reproduction | bug, docs, parity, needs reproduction                       | bug, docs, parity ×3                  |
| [#2968](https://github.com/huntabyte/shadcn-svelte/pull/2968) | bug, docs                     | bug, docs, parity, needs reproduction                       | bug, docs ×3                          |
| [#2969](https://github.com/huntabyte/shadcn-svelte/pull/2969) | bug, docs                     | bug, docs, parity, needs reproduction (duplicate uncertain) | bug, docs, parity ×3                  |
| [#2970](https://github.com/huntabyte/shadcn-svelte/pull/2970) | bug, docs                     | bug, docs, parity, needs reproduction                       | bug, docs, parity ×3                  |
| [#2971](https://github.com/huntabyte/shadcn-svelte/pull/2971) | bug                           | bug                                                         | bug ×3                                |
| [#2972](https://github.com/huntabyte/shadcn-svelte/pull/2972) | bug, docs                     | bug, docs                                                   | bug, docs ×3                          |

| Result                        |          Deployed |             Draft |
| ----------------------------- | ----------------: | ----------------: |
| Correct eligibility decisions |           228/249 |           234/249 |
| Label precision               |            100.0% |            100.0% |
| Label recall                  |             63.2% |             73.7% |
| Exact determined label sets   |              6/15 |              6/15 |
| Wrong / missed additions      |            0 / 21 |            0 / 12 |
| Correct stale-label removals  | 0 (none expected) | 0 (none expected) |
| Wrong removals                |                 0 |                 0 |

The fresh denominator is 252 eligibility decisions minus three uncertain duplicate judgments on #2969 = 249. Its animation patch also appears in current #2968, but intended canonical ownership is unclear. Exact-set scoring excludes its three repeats, leaving 15. No inferred current PR scope was substituted for the frozen snapshot.

Four unlinked runtime UI fixes have no supplied accessible demonstration of the original defect, so the manual reference includes needs reproduction. A fixed branch’s deployment or locally validated fixture is not evidence reproducing the original defect. The model misses these eligibility decisions; the existing label on #2967 is preserved by the low-confidence removal buffer. The two registry fixes link their defect reports and do not need reproduction. CLI regression tests alone do not change the public CLI; #2971 is bug only and #2972 is bug/docs. No PRs show direct AI-description evidence or outstanding human maintainer requests.

Fresh-run input totals are 155,100 deployed versus 216,546 draft, or 8,617 versus 12,030 per item (**39.6% more**). The three parity gains on #2967/#2969/#2970 improve the selected-label score; parity on #2968 and the four reproduction labels remain misses. There are no wrong additions or removals on this fresh set.

## Every remaining draft disagreement

| Set / case     | False positives          | Missed eligible labels           | Wrong removals | Missed removals          |
| -------------- | ------------------------ | -------------------------------- | -------------- | ------------------------ |
| public-2930    | —                        | docs ×3                          | —              | —                        |
| public-2941    | —                        | chore ×3                         | —              | —                        |
| public-2962    | —                        | —                                | —              | slop ×3                  |
| public-2932    | —                        | bug ×3                           | —              | slop ×3                  |
| public-2931    | —                        | docs ×3                          | —              | —                        |
| public-2944    | —                        | bug ×2                           | —              | contributions welcome ×2 |
| public-2947    | slop ×1                  | —                                | —              | —                        |
| public-2949    | —                        | docs ×3                          | —              | —                        |
| public-2959    | —                        | docs ×2                          | —              | —                        |
| public-2917    | contributions welcome ×3 | —                                | —              | contributions welcome ×3 |
| public-2761    | feature ×3               | —                                | —              | —                        |
| control-900104 | slop ×1                  | —                                | —              | —                        |
| control-900106 | docs ×3                  | —                                | —              | —                        |
| fresh-2967     | —                        | needs reproduction ×3            | —              | —                        |
| fresh-2968     | —                        | needs reproduction ×3, parity ×3 | —              | —                        |
| fresh-2969     | —                        | needs reproduction ×3            | —              | —                        |
| fresh-2970     | —                        | needs reproduction ×3            | —              | —                        |

## Every configured label

Each cell is `expected; deployed positives → draft positives` out of three. `1` is eligible, `0` ineligible and `?` uncertain. All 8,064 regression and 1,512 fresh eligibility/addition/removal checks, probabilities and verdicts are retained in the local `final-every-label-decision.csv` files.

| Case                                                            | awaiting submitter | bug      | chore    | cli      | contributions welcome | dependencies | docs     | duplicate | feature  | has workaround | needs reproduction | parity   | slop     | triage   |
| --------------------------------------------------------------- | ------------------ | -------- | -------- | -------- | --------------------- | ------------ | -------- | --------- | -------- | -------------- | ------------------ | -------- | -------- | -------- |
| [#2930](https://github.com/huntabyte/shadcn-svelte/pull/2930)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 0 | 0; 2 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2958](https://github.com/huntabyte/shadcn-svelte/pull/2958)   | 0; 0 → 0           | 1; 1 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2800](https://github.com/huntabyte/shadcn-svelte/pull/2800)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2732](https://github.com/huntabyte/shadcn-svelte/pull/2732)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2919](https://github.com/huntabyte/shadcn-svelte/pull/2919)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2941](https://github.com/huntabyte/shadcn-svelte/pull/2941)   | 0; 0 → 0           | 1; 3 → 3 | 1; 3 → 0 | 0; 3 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2962](https://github.com/huntabyte/shadcn-svelte/issues/2962) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2953](https://github.com/huntabyte/shadcn-svelte/issues/2953) | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 1 → 0 | 1; 0 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2932](https://github.com/huntabyte/shadcn-svelte/issues/2932) | 0; 0 → 0           | 1; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 3 → 0 | 0; 3 → 0 | 0; 0 → 0 |
| [#2931](https://github.com/huntabyte/shadcn-svelte/pull/2931)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2939](https://github.com/huntabyte/shadcn-svelte/issues/2939) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 1; 3 → 3       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2944](https://github.com/huntabyte/shadcn-svelte/issues/2944) | 0; 0 → 0           | 1; 0 → 1 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 1; 2 → 3       | ?; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2928](https://github.com/huntabyte/shadcn-svelte/pull/2928)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2929](https://github.com/huntabyte/shadcn-svelte/pull/2929)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2926](https://github.com/huntabyte/shadcn-svelte/pull/2926)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 3 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2947](https://github.com/huntabyte/shadcn-svelte/pull/2947)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 1 | 0; 0 → 0 |
| [#2949](https://github.com/huntabyte/shadcn-svelte/pull/2949)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 1; 0 → 3     | 1; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2959](https://github.com/huntabyte/shadcn-svelte/pull/2959)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0              | 0; 0 → 0     | 1; 0 → 1 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2771](https://github.com/huntabyte/shadcn-svelte/pull/2771)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2914](https://github.com/huntabyte/shadcn-svelte/pull/2914)   | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2917](https://github.com/huntabyte/shadcn-svelte/issues/2917) | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 3 → 3              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2761](https://github.com/huntabyte/shadcn-svelte/pull/2761)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 3 | 0; 0 → 0       | 0; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2736](https://github.com/huntabyte/shadcn-svelte/pull/2736)   | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2950](https://github.com/huntabyte/shadcn-svelte/pull/2950)   | 0; 0 → 0           | 0; 0 → 0 | ?; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 1; 3 → 3     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900101                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 1 → 0 | 0; 0 → 0 |
| control-900102                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 1; 3 → 3  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900103                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 1; 0 → 3 | 0; 0 → 0 |
| control-900104                                                  | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 1; 0 → 3 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 1 | 0; 0 → 0 |
| control-900105                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 3           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900106                                                  | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900107                                                  | 1; 0 → 3           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| control-900108                                                  | 0; 0 → 0           | 0; 0 → 0 | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2967](https://github.com/huntabyte/shadcn-svelte/pull/2967)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 3 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2968](https://github.com/huntabyte/shadcn-svelte/pull/2968)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 0           | 1; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2969](https://github.com/huntabyte/shadcn-svelte/pull/2969)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | ?; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2970](https://github.com/huntabyte/shadcn-svelte/pull/2970)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 1; 0 → 0           | 1; 0 → 3 | 0; 0 → 0 | 0; 0 → 0 |
| [#2971](https://github.com/huntabyte/shadcn-svelte/pull/2971)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 0; 0 → 0 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |
| [#2972](https://github.com/huntabyte/shadcn-svelte/pull/2972)   | 0; 0 → 0           | 1; 3 → 3 | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0              | 0; 0 → 0     | 1; 3 → 3 | 0; 0 → 0  | 0; 0 → 0 | 0; 0 → 0       | 0; 0 → 0           | 0; 0 → 0 | 0; 0 → 0 | 0; 0 → 0 |

## Fresh reference reasoning and snapshots

**#2967**, head `926d37027806828b671a1ae51f3832a4322ae583`: Repairs existing Typeset website presentation and explicitly aligns toolbar/tooltips with shadcn: bug, docs and parity. Existing helper showOnDesktop is reused, not a new consumer API. Unlinked runtime UI fixes have no supplied accessible demonstration of the original defect: needs reproduction.

**#2968**, head `e83917f6a680eff8c071868bda8f1679cef56e7e`: Fixes documentation preview layout/images and dropdown runtime animations, explicitly restoring missing upstream images: bug, docs, parity and needs reproduction. No linked issue or original-defect reproduction is supplied. Broader preview fixes are distinct from the narrower animation-only PR, so this PR is not redundant.

**#2969**, head `5c880ad797bb100bf6fb077d2e49f38b6ca1b90e`: Restores existing preview-menu animations to match shadcn: bug, docs, parity and needs reproduction. No linked issue or accessible original-defect demonstration. Its complete patch also appears in the current head of #2968, but canonical ownership and when that overlap arose are unclear: duplicate is uncertain, not assumed false.

**#2970**, head `7a351621c4c67154799757609fc6ab3f3d54e8a6`: Repairs documentation heading scroll behavior and explicitly compares/alines with upstream shadcn: bug, docs and parity. Local fixed browser-fixture validation is not an accessible reproduction of the original defect; no linked issue, so needs reproduction.

**#2971**, head `ab547fa76673e2ff8ffc34c473f6fbbb4f502c0a`: Fixes registry-template installation imports and links defect #2935: bug, without needs reproduction. CLI files contain regression tests only, not a change to the public CLI. Registry implementation and associated regression tests alone are not separate docs or chore scope. Separate page-target fix #2972 and linked report are not duplicates.

**#2972**, head `2e8bab27fc1bc51dfd09b86610fe341815645cac`: Fixes registry page targets and documentation examples, linked to defect #2934: bug and docs, without needs reproduction. Only CLI regression tests change under packages/cli; no public CLI implementation, dependency or feature change. Companion import fix #2971 has distinct scope.
