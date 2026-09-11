# @shadcn-svelte/parity

Internal CLI and library that checks the Tailwind class strings in our registry against upstream [shadcn/ui](https://github.com/shadcn-ui/ui).

> **Keep this file current.** Any change to a command, flag, pair kind, allowlist, skip list, ignore-comment syntax, upstream source, cache behaviour, or library export must be reflected here in the same change. `test/readme.test.ts` fails when a command, flag, docs script, or export is missing from this README.

## Running it

From the repo root, through the `docs` package scripts:

```sh
pnpm -F docs parity                    # base comparison, all items
pnpm -F docs parity base empty         # base comparison, one item
pnpm -F docs parity-check              # base comparison, exit 1 on diffs (CI)
pnpm -F docs parity:variants           # generated registries, all styles
pnpm -F docs parity-check:variants     # generated registries, exit 1 on diffs
pnpm -F docs parity:fix empty          # patch base source for one item
```

Or directly, which is handy for `--help`:

```sh
node packages/parity/src/index.ts --help
node packages/parity/src/index.ts variants mira/empty --verbose
```

## Commands

### `parity base [item]` (default)

Compares our UI source in `docs/src/lib/registry/ui/**` against upstream's radix base components in `apps/v4/registry/bases/radix/ui/*.tsx`. Both sides are read before style injection, so `cn-*` tokens are compared literally.

`item` limits the run to one registry item, for example `parity base command`.

### `parity variants [item]`

Compares the generated registries in `docs/static/registry/styles/<style>/*.json` against the published upstream registries at `https://ui.shadcn.com/r/styles/radix-<style>/`. Here `cn-*` tokens have been inlined on both sides, so this also checks that our style CSS and injection match upstream's output.

`item` accepts `name` or `style/name`. `parity variants mira/empty` checks a single variant. The `-s, --style <style>` option restricts the run to one style; it cannot be use in conjunction with a `style/` prefix on `item` naming a different style.

### `parity fix <item> [--dry-run]`

Runs the base comparison for one item and rewrites the differing quoted class strings in our source so they match upstream. It only edits existing quoted strings. It cannot add props, elements, or files, and it never removes `cn-*` or framework tokens.

Pass `--dry-run` to print the patches without writing.

After a real run, rebuild the registry with `pnpm -F docs build:registry` so the JSON matches the source.

## Shared options

Every command accepts these:

| Option                            | Effect                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `-c, --check`                     | Exit with status 1 when any `diff` pairs remain.                                      |
| `--verbose`                       | Also print `equivalent`, `ignored`, `allowlist`, and `framework` pairs.               |
| `--ignored`                       | Print `ignored` pairs with their comment, reason, and class diff.                     |
| `--include-skipped`               | Include the structural ports listed below.                                            |
| `--docs <path>`                   | Path to the docs app. Defaults to `../../docs` relative to this package.              |
| `--refresh`                       | Ignore cached upstream files and fetch them again.                                    |
| `--no-exclude-runtime-equivalent` | Report Bits-vs-Radix runtime-equivalent tokens as diffs instead of folding them away. |
| `-v, --version`                   | Print the package version.                                                            |

## How a comparison works

1. Every double-quoted string in a file is tested with a heuristic that decides whether it looks like a class list. Comments are skipped. Adjacent strings that are only separated by a `parity-ignore` comment and whitespace or commas are merged into one class string.
2. Each class string is run through `tailwind-merge`, tokenised, and sorted into a key.
3. Our class strings are paired with upstream's: exact key matches first, then runtime-equivalent keys, then the best Jaccard similarity of at least 0.45, with a fallback that compares token tails for strings that share distinctive utilities.
4. Each pair is classified, and the per-item and overall parity percentage is `(pairs - diff pairs) / pairs`.

Only files that have an upstream counterpart are compared. A file counts when its name matches the item, or when its PascalCase name matches a component exported by the upstream file, allowing for `Pane` ↔ `Panel` and `GroupHeading` ↔ `Label` aliases.

### Pair kinds

| Kind         | Meaning                                                                                                                                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `exact`      | Same tokens.                                                                                                                                                                                                                                                                            |
| `order`      | Same tokens in a different order.                                                                                                                                                                                                                                                       |
| `equivalent` | Differs only by tokens that are runtime-equivalent between Bits UI and Radix, such as `data-[state=open]` vs `data-open`, physical vs logical sides (`pl-2` vs `ps-2`), or `aria-[orientation=…]` vs `data-horizontal`. Hidden unless `--verbose` or `--no-exclude-runtime-equivalent`. |
| `ignored`    | Covered by a `parity-ignore`, `parity-ignore-file`, or `parity-ignore-upstream` comment. Never counts as a diff.                                                                                                                                                                        |
| `allowlist`  | Differs only by tokens we intentionally keep: `cn-menu-target`, `cn-menu-translucent`, `cn-logical-sides`, `cn-rtl-flip`, `cn-font-heading`, and any `cn-*-logical`.                                                                                                                    |
| `framework`  | Differs only by tokens tied to the underlying library, matched on `radix`, `bits-`, `--bits-`, `--radix-`, `data-bits-`, `data-radix-`, or `--transform-origin`.                                                                                                                        |
| `diff`       | A real difference. Only this kind fails `--check`.                                                                                                                                                                                                                                      |

Unpaired strings are reported as `only-ours` or `only-upstream` and classified the same way.

### Skipped structural ports

`calendar`, `range-calendar`, and `chart` diverge too much from their Radix originals for a class-string comparison to be meaningful. They are skipped unless you pass `--include-skipped` or name one of them as `item`.

## Ignore comments

Where parity is impossible or not yet reached, add a comment in the source. Every form takes a required reason.

```svelte
<!-- parity-ignore: Bits GroupHeading; cmdk heading styles live on cn-command-group -->
```

```ts
"size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50",
// parity-ignore: keep rtl utilities until the CLI rewrites them
"rtl:rotate-180",
```

```svelte
<!-- parity-ignore-upstream: data-[align-trigger=true]:animate-none | Radix marks its item-aligned mode with data-align-trigger; Bits only positions the content as a popper -->
```

- `parity-ignore: <reason>` applies to the next class string that follows the comment. A trailing comment therefore covers the string on the following line, not the one before it.
- `parity-ignore-file: <reason>` applies to every class string in the file.
- `parity-ignore-upstream: <tokens> | <reason>` covers upstream tokens our port deliberately does not carry. The other two forms hang off a class string of ours, so they cannot reach an upstream token that has no counterpart here: an upstream-only class string, or a token upstream keeps inside a string we otherwise match. List the upstream tokens before the `|` and the reason after it. The declaration applies to the whole item, not only the file it sits in, and it silences just the tokens it names; anything else in the same pair is classified as usual.
- `//`, `/* */`, and `<!-- -->` comments are all recognised.
- All three forms are stripped from the published registry JSON by `injectStyleClasses`, whether they occupy a whole line or trail code on the same line. Other comments are left alone.
- Use `--ignored` to list what is being ignored and why.

## Upstream sources and caching

| Command       | Upstream source                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `base`, `fix` | `apps/v4/registry/bases/radix/ui/<item>.tsx` from the `main` branch on raw.githubusercontent.com. |
| `variants`    | `https://ui.shadcn.com/r/styles/radix-<style>/<item>.json`, the deployed registry.                |

For `base` and `fix`, a local checkout of shadcn/ui is used instead of the network when either `SHADCN_UI=/path/to/ui` is set or a sibling `shadcn-ui` directory exists next to this repository.

Fetched files are cached under `shadcn-svelte-upstream-registry` in the system temp directory. A cached file is reused for one hour, after which it is fetched again. `--refresh` bypasses the cache for that run.

The style CSS under `docs/src/lib/registry/styles/` is pulled verbatim from upstream `main` with `pnpm pull:styles` and is excluded from the formatter on purpose. The order of each `@apply` list is semantic: `tailwind-merge` resolves conflicts by position. Sorting those lists changes what our registry renders and shows up here as `variants` diffs that do not exist in the base check. If the deployed registry lags `main`, `variants` can also report short-lived diffs that clear when upstream deploys.

## Library exports

The docs app imports this package as a library as well:

| Export                                       | Contents                                                                                                                                                                                                       |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@shadcn-svelte/parity`                      | `runParity` and the comparison helpers from `src/compare.ts`.                                                                                                                                                  |
| `@shadcn-svelte/parity/parity-ignore`        | `parseParityIgnore`, `parseParityIgnoreUpstream`, `findCommentRanges`, `stripParityIgnoreComments`.                                                                                                            |
| `@shadcn-svelte/parity/inject-style-classes` | `parseStyleCss`, `injectStyleClasses`, `toTailwindArbitraryCalc`. Used by `docs/scripts/build-registry.ts` to generate the style registries and by `docs/src/lib/registry/registry-utils.ts` in the docs site. |

`parseStyleCss` is the single implementation of the style-map parser for the docs. The published CLI keeps its own postcss-based copy in `packages/cli/src/utils/registry/index.ts` so that it does not depend on this private package. Keep the two in sync.

## CI

- `.github/workflows/parity-check.yml` runs `parity-check` as a blocking job and `parity-check:variants` as a non-blocking job, for the skew reason above.
- `.github/workflows/ci.yml` runs this package's test suite.

## Development

```sh
pnpm -F @shadcn-svelte/parity test    # vitest
pnpm -F @shadcn-svelte/parity check   # tsc --noEmit
```
