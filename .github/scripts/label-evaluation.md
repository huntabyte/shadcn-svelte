# Marginal-cost label accuracy improvement

One batched request still evaluates all fourteen labels through the published, unchanged `@ieedan/label@0.0.1`. This iteration changes only repository policy. The request builder, evidence collector, model probabilities, thresholds, ownership safeguards and workflow are unchanged from `77b4e34`.

## Measured frontier

Three matched repeats on the same 48 development cases produce **144 item runs and 1,977 definite label decisions per candidate**. These include 38 real snapshots and ten synthetic controls. Thirteen uncertain references are excluded across repeats. The four PRs previously used for confirmation are now development data because this iteration tunes against their errors; they are not presented as an untouched holdout.

| Candidate                                    | Mean input tokens/item, all calls | False positives / misses | Errors | Wrong removals | On measured frontier |
| -------------------------------------------- | --------------------------------: | -----------------------: | -----: | -------------: | -------------------- |
| Previous draft (77b4e34)                     |                             6,261 |                   3 / 15 |     18 |              0 | yes                  |
| Maintenance and parity clarification         |                             6,292 |                   0 / 13 |     13 |              0 | yes                  |
| Selected: reproduction + scope clarification |                             6,377 |                    0 / 3 |      3 |              0 | yes                  |

![Measured cost and accuracy frontier](label-pareto.png)

The selected point reduces errors **18 → 3** for **1.85% more input tokens** (6,261 → 6,377), within the preselected +5% budget of 6,574 tokens/item. Exact fully determined sets improve **96/111 → 108/111**. Wrong additions fall **3 → 0**, missed additions **12 → 3**. Definite stale-label cleanup stays **63/72**; wrong removals and new false slop additions remain zero. Cleanup misses are reported separately from eligibility.

Each tested full point trades cost for accuracy; the selected point lies on this empirical frontier. It is not a globally optimal or repository-wide accuracy claim. The reproduction-only one-repeat pilot created a new workaround false positive, while the combined policy did not. Pilots are excluded from the three-repeat frontier.

## What changed

- Reproduction is a request for evidence, independent of whether a defect is maintainer-confirmed or accompanied by feature/docs work. Negative conditions refer to the same defect. Examples distinguish unopenable pasted code, mixed-scope PRs and broken website controls from demonstrations of the original problem.
- Chore applies to a separate portion of internal maintenance, including CI resource settings and workspace build scripts. It need not describe the entire PR. Tests or CI wiring only supporting a feature/fix still do not independently qualify.
- Parity requires alignment with tracked shadcn/ui behavior, including linked evidence. A primitive-library implementation comparison or removal of a workaround alone is insufficient.

No PR IDs, special-case predictions, threshold changes, extra inference requests, review gates or human label application are introduced. All configured kinds of action-owned labels can still be removed automatically on later commits. Human applications, other bots and incomplete ownership histories remain protected; this does not include the unmerged labeler package’s human-removal reapplication veto.

## Reserved confirmation

PRs **#2900 and #2906** were manually annotated and frozen before either candidate ran on them, then tested three times without subsequent tuning. Both versions score **75/81** definite judgments. One uncertain chore judgment on #2906 is excluded across three repeats. Both miss reproduction on #2900 and feature on #2906 in all three repeats, with no false additions or wrong removals. Tokens average **9,264 → 9,380** for these larger-context cases.

This is no gain and no regression on two reserved cases, not evidence that the development improvement generalizes broadly. Both versions select bug/feature on #2900 and bug/docs/parity on #2906, unlike their historical empty-label runs. #2906 also adds public portalProps, which the frozen reference counts as feature; #2900 supplies no runnable demonstration or linked same-repository defect issue.

Across all 50 cases combined, errors are **24 → 9 out of 2,058** definite decisions and input usage **6,381 → 6,497** tokens/item (+1.82%). That combined score mixes development and confirmation and should not replace their separate results.

## Remaining errors and cleanup misses

The sole development eligibility error is the missing duplicate label on #2969, repeated three times. Its entire patch repeats the earlier broader #2968, but the bounded production collector does not retrieve that relationship. It remains a known evidence gap rather than a corrected answer in the benchmark. No further changes were made after reserved confirmation.

| Case          | False positives | Missed eligible labels | Missed stale-label cleanup |
| ------------- | --------------- | ---------------------- | -------------------------- |
| public-2932   | —               | —                      | slop ×3                    |
| public-2917   | —               | —                      | duplicate ×3               |
| fresh-2969    | —               | duplicate ×3           | —                          |
| holdout-2905  | —               | —                      | duplicate ×3               |
| reserved-2900 | —               | needs reproduction ×3  | —                          |
| reserved-2906 | —               | feature ×3             | —                          |

## Ground truth and verification

The audited answer key from the previous iteration is unchanged for all 48 existing cases. That audit corrected six definite answers, resolved five uncertainties and identified six additional ambiguities. Its former 13/1,584 result becomes 21/1,572 when the same saved outputs are rescored; this was a reference correction, not a model improvement. Existing labels and bot assertions are not treated as truth. Subjective policy boundaries cannot honestly be certified as 100% accurate.

The [ground-truth ledger](label-ground-truth.csv) contains **700 label references across 50 cases**, their source URLs, rationales and immutable fixture hashes. Fourteen ambiguous references are explicitly excluded. All positive and negative decisions, probabilities and expected/actual additions/removals are retained in the **4,200-row [paired ledger](label-evaluation.csv)**. The first 672 reference rows match the prior published reference exactly. Evaluation uncertainty introduces no production review gate.

Usage is actual provider-reported input tokens summed across calls; every evaluation used one request and resolved to `jev-1.14.0`. The published CLI ran in dry-run mode against frozen GitHub responses, with all GitHub writes blocked. The API key remained in hidden input and process memory and was never saved in code or fixtures. All 50 final production requests reproduce the evaluated hashes.

The 24 local tests and repository lint pass. Timings include CLI startup and live inference under frozen GitHub inputs, with two case evaluations concurrent; they exclude live collection, installation and Actions queueing. No end-to-end latency improvement is claimed.

## Frozen reference rationale

### dev

Fixture hash: `c3105f1a79e5018bf6d49bfac0683da3f6c055b596c1186af5c9f5fa6dec3bcc`.

- **public-2930:** New MCP feature/public CLI, manifests and MCP README; older #2777 explicitly closed in favor of it, so not duplicate. AUDIT: The body explicitly compares its MCP tools with upstream and closes the MCP parity request #2333. Under the explicit alignment rule parity is positive; the old negative was inconsistent with policy. Expected: cli, dependencies, docs, feature, parity.
- **public-2958:** Homepage styling regression fix, distinct from earlier card addition, so bug/docs and not duplicate. AUDIT: Homepage style repair clearly establishes bug/docs, but the policy boundary between static style consistency and runtime reproduction is not precise enough to certify this negative. No original-defect demo is explicitly supplied. Expected: bug, docs. Uncertain: needs reproduction.
- **public-2800:** New upstream Typeset feature and documentation port; later requesting maintainer thanks accepts the review response. No runtime defect needing reproduction. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs, feature, parity.
- **public-2732:** New public Calendar range mode plus docs/examples and explicit upstream parity, linked to feature request #2735. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs, feature, parity.
- **public-2919:** New end-user agent workflow/skill with documentation and explicit upstream port; no runtime defect. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs, feature, parity.
- **public-2941:** Fixes Create undo, updates manifests/lockfile and internal dependency maintenance; no public CLI changes in the diff. AUDIT: The design-system provider and its state normalize visual radius/style controls on /create. This changes documentation-website presentation as well as fixing undo. Manifests/workspace build changes independently establish dependencies/chore. Expected: bug, chore, dependencies, docs.
- **public-2962:** Public CLI usage report; maintainer explains data-table intentionally is not installable, so no confirmed defect. Reporter explicitly denies AI description authorship. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: cli.
- **public-2953:** Maintainer confirms CLI failure, supplies/accepts a package-manager workaround, and implements fix. Reproduction acceptance without a hosted project is uncertain. No direct evidence an AI wrote the description. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, cli, has workaround. Uncertain: needs reproduction.
- **public-2932:** Public CLI defect confirmed through maintainer fix #2947, accessible reproduction project. AI-assisted investigation disclosure does not establish AI description authorship. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, cli.
- **public-2931:** Fixes documentation website heading-font inheritance with demonstrated preview reproduction; AI investigation disclosure is not description authorship. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, docs.
- **public-2939:** Unconfirmed defect plus explicit new Combobox request. Reporter says animation patch works. No openable project is supplied; maintainer reapplies needs reproduction. No duplicate relationship. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: feature, has workaround, needs reproduction.
- **public-2944:** Native select ref type defect confirmed through maintainer fix #2945, specific usable patch. Whether the step-only reproduction has been accepted is uncertain. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, has workaround. Uncertain: needs reproduction.
- **public-2928:** Adds a public component export, fulfilling #2927, not duplicating it. Implementation alone is not docs. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: feature.
- **public-2929:** Repairs existing InputOTP state styling and aligns with upstream attribute behavior, fixes #2924. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, parity.
- **public-2926:** Adds public AI elements primitives, docs/examples, dependency manifests and explicit upstream alignment; fixes #2925, not duplicate. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: dependencies, docs, feature, parity.
- **public-2947:** Public CLI bug fix, linked #2932. No package dependency or documentation content changes. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, cli.
- **public-2949:** New public CLI flags/noninteractive behavior, docs updates and actual dependency changes; prerequisite for MCP is not duplicate. AUDIT: Besides new flags, apply restores confirmation that -y was meant to skip: an existing runtime behavior fix. Feature and bug can coexist. No linked issue or demonstration of that defect is supplied; #2930 is a feature PR, not a defect reproduction. Expected: bug, cli, dependencies, docs, feature, needs reproduction.
- **public-2959:** New public preset support and documentation, explicitly upstream chart/preset parity. Review requests have later concrete resolution replies from the maintainer/author. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: cli, docs, feature, parity.
- **public-2771:** Adds upstream composition/API docs and corrects invalid examples. Static reference corrections alone do not require reproduction. AUDIT: Composition/API/reference updates plus a runnable progress-label accessibility correction establish docs/parity/bug. Static reference versus runtime reproduction boundary is ambiguous for that example; the old definite negative was too strong. Expected: bug, docs, parity. Uncertain: needs reproduction.
- **public-2914:** Adds upstream changelogs/demos; author clarified distinct scope and maintainer accepted. Existing component implementation does not duplicate changelogs. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs, parity.
- **public-2917:** Docs alias correction; already claimed by #2864. A request and its implementation are distinct, not duplicates. No maintainer-confirmed runtime defect. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs.
- **public-2761:** Fixes broken homepage rendering/layout and docs presentation, explicitly aligned upstream. Renaming CLI tab is not public CLI code. AUDIT: Homepage visibility/layout repairs establish bug/docs/parity. Whether this presentation-only change requires a runtime demonstration is an unresolved policy boundary; exclude rather than certify the old negative. Expected: bug, docs, parity. Uncertain: needs reproduction.
- **public-2736:** Internal deployment/release tooling and actual dependency upgrade; Changesets CLI is not the public shadcn-svelte CLI. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: chore, dependencies.
- **public-2950:** Documentation and real package dependency migration. Independent internal CI maintenance scope is uncertain; no public CLI package changes. AUDIT: Full immutable diff 6149e141...1adfa8b3, beyond the 3000-file REST ceiling, changes three public CLI implementation files and fixes generated TypeScript paths/duplicate extensions. CI adds a separate Node memory setting. Docs/dependencies remain positive. New capability versus compatibility repair, and runtime reproduction applicability, remain ambiguous. The earlier no-CLI reference was factually wrong. Expected: bug, chore, cli, dependencies, docs. Uncertain: feature, needs reproduction.
- **control-900101:** Targeted control: Dropdown hover report repeated AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: duplicate.
- **control-900102:** Targeted control: feat: add custom item rendering snippet AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: duplicate, feature.
- **control-900103:** Targeted control: feat: add a timezone mode AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: feature, slop.
- **control-900104:** Targeted control: feat: add timezone rendering prop AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: feature.
- **control-900105:** Targeted control: fix: restore spinner visibility AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, needs reproduction.
- **control-900106:** Targeted control: fix: restore spinner visibility AUDIT: The synthetic fixture supplies no changed files and does not say whether it changes installed component code or the website. The official demo establishes reproduction, but cannot establish a definite docs-negative. Exclude that ambiguous label; do not pretend the old reference was certain. Expected: bug. Uncertain: docs.
- **control-900107:** Targeted control: chore: maintain unit tests AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: awaiting submitter, chore.
- **control-900108:** Targeted control: chore: maintain unit tests AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: chore.

### latest

Fixture hash: `29a41a69e413971258d4daa728e4dddb2368a475c6d2b9b177e840c9eedfe5a0`.

- **fresh-2967:** Repairs existing Typeset website presentation and explicitly aligns toolbar/tooltips with shadcn: bug, docs and parity. Existing helper showOnDesktop is reused, not a new consumer API. Unlinked runtime UI fixes have no supplied accessible demonstration of the original defect: needs reproduction. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, docs, needs reproduction, parity.
- **fresh-2968:** Fixes documentation preview layout/images and dropdown runtime animations, explicitly restoring missing upstream images: bug, docs, parity and needs reproduction. No linked issue or original-defect reproduction is supplied. Broader preview fixes are distinct from the narrower animation-only PR, so this PR is not redundant. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, docs, needs reproduction, parity.
- **fresh-2969:** Restores existing preview-menu animations to match shadcn: bug, docs, parity and needs reproduction. No linked issue or accessible original-defect demonstration. Its complete patch also appears in the current head of #2968, but canonical ownership and when that overlap arose are unclear: duplicate is uncertain, not assumed false. AUDIT: The entire one-file patch is byte-identical to the same file patch in the earlier open #2968, created 35 minutes earlier. #2968 explicitly covers the same missing preview animations plus other changes. #2969 was closed unmerged; no requested replacement or distinct scope is evidenced. Expected: bug, docs, duplicate, needs reproduction, parity.
- **fresh-2970:** Repairs documentation heading scroll behavior and explicitly compares/alines with upstream shadcn: bug, docs and parity. Local fixed browser-fixture validation is not an accessible reproduction of the original defect; no linked issue, so needs reproduction. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, docs, needs reproduction, parity.
- **fresh-2971:** Fixes registry-template installation imports and links defect #2935: bug, without needs reproduction. CLI files contain regression tests only, not a change to the public CLI. Registry implementation and associated regression tests alone are not separate docs or chore scope. Separate page-target fix #2972 and linked report are not duplicates. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug.
- **fresh-2972:** Fixes registry page targets and documentation examples, linked to defect #2934: bug and docs, without needs reproduction. Only CLI regression tests change under packages/cli; no public CLI implementation, dependency or feature change. Companion import fix #2971 has distinct scope. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug, docs.

### confirm

Fixture hash: `23fef248344aba72eb8fc625384cd8d21aec474ff8e22e6952692fa499ee5711`.

- **holdout-2915:** Maintainer explicitly retains local dependency-upgrade tracking despite upstream cause, so not duplicate or a new feature. Generic npm advice is not a demonstrated workaround. Human removals and later bot reapplications make bug/cli/dependency ownership intent versus classification uncertain, as is accepted reproduction after diagnosis; exclude these judgments rather than infer ground truth from model output. All other labels are definite negatives. AUDIT: Maintainer validates the peer mismatch, explicitly retains local upgrade tracking and later identifies the fix. The report concerns the public CLI and the requested dependency upgrade. Historical human removals govern mutation ownership, not semantic eligibility. Reproduction acceptance remains ambiguous; keep it excluded. Expected: bug, cli, dependencies. Uncertain: needs reproduction.
- **holdout-2905:** Fixes component alignment and links defect #2902: bug, not a duplicate of the report or documentation content. A maintainer requests a different fix location, but PR is closed without an explicit response; awaiting submitter is uncertain. No explicit author claim of upstream alignment. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug. Uncertain: awaiting submitter.
- **holdout-2908:** Maintainer explicitly accepts and merges the local Field.Title data-slot fix for #2635 despite upstream not fixing it. Bug; not a duplicate, docs, feature, or parity port. Linked defect removes reproduction need. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: bug.
- **holdout-2964:** Docs plus explicit upstream alignment, and new installed Drawer.Root/NestedRoot showSwipeHandle API and direction data attributes. Feature/docs/parity; porting and existing primitive reuse do not negate the new public API. No described runtime defect requiring reproduction. No dependency manifest changes. AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs, feature, parity.

### sanity

Fixture hash: `f7e97b36832ef6a7bc7a6ee1d78915746860e16f1f49f851326d6f6ffd161416`.

- **sanity-900201:** Positive unclaimed wording correction AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: contributions welcome, docs.
- **sanity-900202:** Exact wording correction already claimed in a linked implementation PR AUDIT: Retained after body, human discussion/reviews, changed-file and policy review; bot assertions were not evidence. Expected: docs.

### fresh

Fixture hash: `37a55cb73b7bf3592edd126c7956f616f27b3b2b1df5884c1b3d6eb07665118f`.

- **new-2973:** The missing #blocks scroll target repairs an existing navigation defect; styling/category visibility and static navigation links are docs presentation, with explicit shadcn alignment. The fixed-branch prerender check is not a demonstration of the original defect. No installed component API, dependency, public CLI implementation or separate internal maintenance changes. Expected: bug, docs, parity, needs reproduction.
- **new-2965:** The complete one-file installed Tooltip implementation diff repairs arrow positioning. Only a screenshot is supplied, with no linked issue or runnable original-defect demo. Comparing Bits UI and Radix internals does not explicitly establish shadcn/ui parity under the policy; no documentation or public API is added. Expected: bug, needs reproduction.
- **new-2963:** The data-table documentation calls an undefined getPayments; adding the typed sample implementation fixes the runnable example and explicitly follows shadcn/ui docs. The linked issue comment establishes the reported defect. The closed-PR maintainer suggestion of a blank array is ambiguous as a still-outstanding request; exclude awaiting submitter. Expected: bug, docs, parity. Uncertain: awaiting submitter.
- **new-2940:** Only internal GitHub workflow dispatch/automation changes. No package manifest/lockfile or public CLI/component/docs changes. Whether enabling bot-triggered reproduction comments is a new internal capability or an existing runtime defect, and whether runtime reproduction policy applies to that automation, is ambiguous; exclude those two labels. Expected: chore. Uncertain: bug, needs reproduction.

### reserved

Fixture hash: `1da924e766be090d98f1933a1d8ff45a8f013839b4ab3212fbdf3f0be56e964f`.

- **reserved-2900:** The complete source diff hides duplicate accessible cell content and exposes a new bindable public inputRef. These independently establish a bug fix and public API feature. No linked same-repository defect issue or runnable original-defect demo is supplied; discussion only cross-references a foreign repository. Installed component implementation and regenerated registry data alone are not docs, CLI, dependencies, chore or explicit shadcn/ui parity. Expected: bug, feature, needs reproduction.
- **reserved-2906:** Fixes linked radius, block separator and submenu defects. The complete diff adds public portalProps to installed submenu components, updates documentation/skill content and aligns radius templates with upstream as established in linked #2901. Linked issues establish the defects, so reproduction is unnecessary. No public CLI implementation or package dependency changes occur. The independent label-policy edit is internal repository maintenance but falls at the edge of the configured chore category list; exclude that judgment rather than certify it. Expected: bug, feature, docs, parity. Uncertain: chore.
