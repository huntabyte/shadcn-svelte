## Prompt

Please refer to [shadcn/ui repo](https://github.com/shadcn-ui/ui) and the [shadcn/ui website](https://ui.shadcn.com/) to complete the items I explicitly assign you. This project, shadcn-svelte, is a Svelte port of the shadcn/ui component library, so content and design should closely follow the original library, tailwind classes should be identical except where language differences require. Refer to the [react-to-svelte skill](https://raw.githubusercontent.com/Tsurgcom/react-to-svelte/refs/heads/master/SKILL.md) for functional differences between the two lanuages. If you encounter any issues or have questions about specific tasks, please don't hesitate to ask for clarification or assistance.

1. Stylistic differences - `svelte-orange` is used as an accent color in some places instead of blue (for the website only!).
2. Functional differences:
  - Svelte's reactivity and component structure may require different approaches to state management and component composition compared to React. Refer to the react-to-svelte skill for guidance on these differences.
  - instead of both Radix UI and Base UI primitives, we are using one - the [bits-ui library](https://bits-ui.com/docs/introduction). Use the Radix UI primitives as a reference for functionality and accessibility, but implement using bits-ui components and utilities. Refer to the bits-ui documentation for guidance on how to use their components and utilities effectively.

## Updates remaining

*note: `?` indicates that feature may have already been implemented but I am not sure, so check first.*

- [ ] Combobox component - new, completely replaces old implementation using popover + command
- [ ] Select component - item-aligned default, popper option
- [ ] fix docs sidebar - top missing opaque div?
- [ ] Changelog "More Updates" section - dont change content, just make it so everything except latest is shown as a separate <a> element that links to the full changelog page
- [ ] ? Checkbox `aria-invalid` and `data-invalid`
- [ ] fix max size of component previews so that they don't overflow, compare preview of `Aspect Ratio` component on both sites to verify (check original shadcn/ui repo!!)
- [ ] Move API reference from top badge to separate section at bottom of each .md file, remove API reference, Docs, Component Source badge from `slug...` rendering
- [ ] RTL support
- [ ] direction component
- [ ] Step components in Manual install tab
- [ ] evaluate difficulty of moving RangeCalendar into mode of Calendar component, leave a todo note (dont change!)
- [ ] revise pm command logic
