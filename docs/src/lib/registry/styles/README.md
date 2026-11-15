# Styles

From https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/styles

We should be using the exact same styles as the original to make it easier to keep everything in sync. DO NOT EDIT THESE FILES. PRs editing these files should reference a PR to shadcn/ui.

These files are excluded from the formatter. The order of each `@apply` list is semantic because `tailwind-merge` resolves conflicting utilities by position, so reordering them changes what the generated registry renders compared to upstream.

To pull the latest styles from the upstream repository, run `pnpm pull:styles`.
