import type { Registry } from "@/registry/schema";

const ui: Registry = [
	{
		name: "accordion",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/accordion/accordion-content.svelte",
			"ui/accordion/accordion-item.svelte",
			"ui/accordion/accordion-trigger.svelte",
			"ui/accordion/index.ts"
		]
	},
	{
		name: "alert",
		type: "components:ui",
		files: [
			"ui/alert/alert.svelte",
			"ui/alert/alert-description.svelte",
			"ui/alert/alert-title.svelte",
			"ui/alert/index.ts"
		]
	},
	{
		name: "alert-dialog",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		registryDependencies: ["button"],
		files: [
			"ui/alert-dialog/alert-dialog-action.svelte",
			"ui/alert-dialog/alert-dialog-cancel.svelte",
			"ui/alert-dialog/alert-dialog-content.svelte",
			"ui/alert-dialog/alert-dialog-description.svelte",
			"ui/alert-dialog/alert-dialog-footer.svelte",
			"ui/alert-dialog/alert-dialog-header.svelte",
			"ui/alert-dialog/alert-dialog-overlay.svelte",
			"ui/alert-dialog/alert-dialog-portal.svelte",
			"ui/alert-dialog/alert-dialog-title.svelte",
			"ui/alert-dialog/index.ts"
		]
	},
	{
		name: "aspect-ratio",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/aspect-ratio/aspect-ratio.svelte",
			"ui/aspect-ratio/index.ts"
		]
	},
	{
		name: "avatar",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/avatar/avatar.svelte",
			"ui/avatar/avatar-fallback.svelte",
			"ui/avatar/avatar-image.svelte",
			"ui/avatar/index.ts"
		]
	},
	{
		name: "badge",
		type: "components:ui",
		files: ["ui/badge/badge.svelte", "ui/badge/index.ts"]
	},
	{
		name: "button",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/button/button.svelte", "ui/button/index.ts"]
	},
	// {
	// 	name: "calendar",
	// 	type: "components:ui",
	// 	dependencies: ["react-day-picker", "date-fns"],
	// 	registryDependencies: ["button"],
	// 	files: ["ui/calendar.tsx"]
	// },
	{
		name: "card",
		type: "components:ui",
		files: [
			"ui/card/card.svelte",
			"ui/card/card-content.svelte",
			"ui/card/card-description.svelte",
			"ui/card/card-footer.svelte",
			"ui/card/card-header.svelte",
			"ui/card/card-title.svelte",
			"ui/card/index.ts"
		]
	},
	{
		name: "checkbox",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/checkbox/checkbox.svelte", "ui/checkbox/index.ts"]
	},
	{
		name: "collapsible",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/collapsible/collapsible-content.svelte",
			"ui/collapsible/index.ts"
		]
	},
	// {
	// 	name: "command",
	// 	type: "components:ui",
	// 	dependencies: ["cmdk"],
	// 	registryDependencies: ["dialog"],
	// 	files: ["ui/command.tsx"]
	// },
	{
		name: "context-menu",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/context-menu/context-menu-checkbox-item.svelte",
			"ui/context-menu/context-menu-content.svelte",
			"ui/context-menu/context-menu-item.svelte",
			"ui/context-menu/context-menu-label.svelte",
			"ui/context-menu/context-menu-radio-group.svelte",
			"ui/context-menu/context-menu-radio-item.svelte",
			"ui/context-menu/context-menu-separator.svelte",
			"ui/context-menu/context-menu-shortcut.svelte",
			"ui/context-menu/context-menu-sub-content.svelte",
			"ui/context-menu/context-menu-sub-trigger.svelte",
			"ui/context-menu/index.ts"
		]
	},
	{
		name: "dialog",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/dialog/dialog-content.svelte",
			"ui/dialog/dialog-description.svelte",
			"ui/dialog/dialog-footer.svelte",
			"ui/dialog/dialog-header.svelte",
			"ui/dialog/dialog-overlay.svelte",
			"ui/dialog/dialog-portal.svelte",
			"ui/dialog/dialog-title.svelte",
			"ui/dialog/index.ts"
		]
	},
	{
		name: "dropdown-menu",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/dropdown-menu/dropdown-menu-checkbox-item.svelte",
			"ui/dropdown-menu/dropdown-menu-content.svelte",
			"ui/dropdown-menu/dropdown-menu-item.svelte",
			"ui/dropdown-menu/dropdown-menu-label.svelte",
			"ui/dropdown-menu/dropdown-menu-radio-group.svelte",
			"ui/dropdown-menu/dropdown-menu-radio-item.svelte",
			"ui/dropdown-menu/dropdown-menu-separator.svelte",
			"ui/dropdown-menu/dropdown-menu-shortcut.svelte",
			"ui/dropdown-menu/dropdown-menu-sub-content.svelte",
			"ui/dropdown-menu/dropdown-menu-sub-trigger.svelte",
			"ui/dropdown-menu/index.ts"
		]
	},
	// {
	// 	name: "form",
	// 	type: "components:ui",
	// 	dependencies: [
	// 		"@huntabyte/primitives",
	// 		"@radix-ui/react-slot",
	// 		"@hookform/resolvers",
	// 		"zod",
	// 		"react-hook-form"
	// 	],
	// 	registryDependencies: ["button", "label"],
	// 	files: ["ui/form.tsx"]
	// },
	{
		name: "hover-card",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/hover-card/hover-card-content.svelte",
			"ui/hover-card/index.ts"
		]
	},
	{
		name: "input",
		type: "components:ui",
		files: ["ui/input/input.svelte", "ui/input/index.ts"]
	},
	{
		name: "label",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/label/label.svelte", "ui/label/index.ts"]
	},
	{
		name: "menubar",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/menubar/menubar.svelte",
			"ui/menubar/menubar-checkbox-item.svelte",
			"ui/menubar/menubar-content.svelte",
			"ui/menubar/menubar-item.svelte",
			"ui/menubar/menubar-label.svelte",
			"ui/menubar/menubar-radio-item.svelte",
			"ui/menubar/menubar-separator.svelte",
			"ui/menubar/menubar-shortcut.svelte",
			"ui/menubar/menubar-sub-content.svelte",
			"ui/menubar/menubar-sub-trigger.svelte",
			"ui/menubar/index.ts"
		]
	},
	// {
	// 	name: "navigation-menu",
	// 	type: "components:ui",
	// 	dependencies: ["@huntabyte/primitives"],
	// 	files: ["ui/navigation-menu.tsx"]
	// },
	{
		name: "popover",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/popover/popover-content.svelte", "ui/popover/index.ts"]
	},
	{
		name: "progress",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/progress/progress.svelte", "ui/progress/index.ts"]
	},
	{
		name: "radio-group",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/radio-group/radio-group.svelte",
			"ui/radio-group/radio-group-item.svelte",
			"ui/radio-group/index.ts"
		]
	},
	// {
	// 	name: "scroll-area",
	// 	type: "components:ui",
	// 	dependencies: ["@huntabyte/primitives"],
	// 	files: ["ui/scroll-area.tsx"]
	// },
	{
		name: "select",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/select/select.svelte",
			"ui/select/select-content.svelte",
			"ui/select/select-item.svelte",
			"ui/select/select-label.svelte",
			"ui/select/select-separator.svelte",
			"ui/select/select-trigger.svelte",
			"ui/select/index.ts"
		]
	},
	{
		name: "separator",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/separator/separator.svelte", "ui/separator/index.ts"]
	},
	{
		name: "sheet",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/sheet/sheet-content.svelte",
			"ui/sheet/sheet-description.svelte",
			"ui/sheet/sheet-footer.svelte",
			"ui/sheet/sheet-header.svelte",
			"ui/sheet/sheet-overlay.svelte",
			"ui/sheet/sheet-portal.svelte",
			"ui/sheet/sheet-title.svelte",
			"ui/sheet/index.ts"
		]
	},
	{
		name: "skeleton",
		type: "components:ui",
		files: ["ui/skeleton/skeleton.svelte", "ui/skeleton/index.ts"]
	},
	{
		name: "slider",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/slider/slider.svelte", "ui/slider/index.ts"]
	},
	{
		name: "switch",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/switch/switch.svelte", "ui/switch/index.ts"]
	},
	{
		name: "table",
		type: "components:ui",
		files: [
			"ui/table/table.svelte",
			"ui/table/table-body.svelte",
			"ui/table/table-caption.svelte",
			"ui/table/table-cell.svelte",
			"ui/table/table-footer.svelte",
			"ui/table/table-head.svelte",
			"ui/table/table-header.svelte",
			"ui/table/table-row.svelte",
			"ui/table/index.ts"
		]
	},
	{
		name: "tabs",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/tabs/tabs-content.svelte",
			"ui/tabs/tabs-list.svelte",
			"ui/tabs/tabs-trigger.svelte",
			"ui/tabs/index.ts"
		]
	},
	{
		name: "textarea",
		type: "components:ui",
		files: ["ui/textarea/textarea.svelte", "ui/textarea/index.ts"]
	},
	// {
	// 	name: "toast",
	// 	type: "components:ui",
	// 	dependencies: ["@radix-ui/react-toast"],
	// 	files: ["ui/toast.tsx", "ui/use-toast.ts", "ui/toaster.tsx"]
	// },
	{
		name: "toggle",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/toggle/toggle.svelte", "ui/toggle/index.ts"]
	},
	{
		name: "tooltip",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/tooltip/tooltip-content.svelte", "ui/tooltip/index.ts"]
	}
];

const example: Registry = [
	{
		name: "accordion-demo",
		type: "components:example",
		registryDependencies: ["accordion"],
		files: ["example/accordion-demo.svelte"]
	},
	{
		name: "alert-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-demo.svelte"]
	},
	{
		name: "alert-destructive",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert-destructive.svelte"]
	},
	{
		name: "alert-dialog-demo",
		type: "components:example",
		registryDependencies: ["alert-dialog", "button"],
		files: ["example/alert-dialog-demo.svelte"]
	},
	{
		name: "aspect-ratio-demo",
		type: "components:example",
		registryDependencies: ["aspect-ratio"],
		files: ["example/aspect-ratio-demo.svelte"]
	},
	{
		name: "avatar-demo",
		type: "components:example",
		registryDependencies: ["avatar"],
		files: ["example/avatar-demo.svelte"]
	},
	{
		name: "badge-demo",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge-demo.svelte"]
	},
	{
		name: "badge-destructive",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge-destructive.svelte"]
	},
	{
		name: "badge-outline",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge-outline.svelte"]
	},
	{
		name: "badge-secondary",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge-secondary.svelte"]
	},
	{
		name: "button-demo",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-demo.svelte"]
	},
	{
		name: "button-secondary",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-secondary.svelte"]
	},
	{
		name: "button-destructive",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-destructive.svelte"]
	},
	{
		name: "button-outline",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-outline.svelte"]
	},
	{
		name: "button-ghost",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-ghost.svelte"]
	},
	{
		name: "button-link",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-link.svelte"]
	},
	{
		name: "button-with-icon",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-with-icon.svelte"]
	},
	{
		name: "button-loading",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button-loading.svelte"]
	},
	// {
	// 	name: "button-icon",
	// 	type: "components:example",
	// 	registryDependencies: ["button"],
	// 	files: ["example/button-icon.tsx"]
	// },
	// {
	// 	name: "button-as-child",
	// 	type: "components:example",
	// 	registryDependencies: ["button"],
	// 	files: ["example/button-as-child.tsx"]
	// },
	// {
	// 	name: "calendar-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["calendar"],
	// 	files: ["example/calendar-demo.tsx"]
	// },
	// {
	// 	name: "calendar-form",
	// 	type: "components:example",
	// 	registryDependencies: ["calendar", "form", "popover"],
	// 	files: ["example/calendar-form.tsx"]
	// },
	{
		name: "card-demo",
		type: "components:example",
		registryDependencies: ["card", "button", "switch"],
		files: ["example/card-demo.svelte"]
	},
	{
		name: "card-with-form",
		type: "components:example",
		registryDependencies: ["button", "card", "input", "label", "select"],
		files: ["example/card-with-form.svelte"]
	},
	{
		name: "checkbox-demo",
		type: "components:example",
		registryDependencies: ["checkbox"],
		files: ["example/checkbox-demo.svelte"]
	},
	{
		name: "checkbox-disabled",
		type: "components:example",
		registryDependencies: ["checkbox"],
		files: ["example/checkbox-disabled.svelte"]
	},
	// {
	// 	name: "checkbox-form-multiple",
	// 	type: "components:example",
	// 	registryDependencies: ["checkbox", "form"],
	// 	files: ["example/CheckboxDemo.svelte"]
	// },
	// {
	// 	name: "checkbox-form-single",
	// 	type: "components:example",
	// 	registryDependencies: ["checkbox", "form"],
	// 	files: ["example/checkbox-form-single.tsx"]
	// },
	{
		name: "checkbox-with-text",
		type: "components:example",
		registryDependencies: ["checkbox"],
		files: ["example/checkbox-with-text.svelte"]
	},
	{
		name: "collapsible-demo",
		type: "components:example",
		registryDependencies: ["collapsible"],
		files: ["example/collapsible-demo.svelte"]
	},
	// {
	// 	name: "combobox-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["command"],
	// 	files: ["example/combobox-demo.tsx"]
	// },
	// {
	// 	name: "combobox-dropdown-menu",
	// 	type: "components:example",
	// 	registryDependencies: ["command", "dropdown-menu", "button"],
	// 	files: ["example/combobox-dropdown-menu.tsx"]
	// },
	// {
	// 	name: "combobox-form",
	// 	type: "components:example",
	// 	registryDependencies: ["command", "form"],
	// 	files: ["example/combobox-form.tsx"]
	// },
	// {
	// 	name: "combobox-popover",
	// 	type: "components:example",
	// 	registryDependencies: ["combobox", "popover"],
	// 	files: ["example/combobox-popover.tsx"]
	// },
	// {
	// 	name: "command-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["command"],
	// 	files: ["example/command-demo.tsx"]
	// },
	// {
	// 	name: "command-dialog",
	// 	type: "components:example",
	// 	registryDependencies: ["command", "dialog"],
	// 	files: ["example/command-dialog.tsx"]
	// },
	{
		name: "context-menu-demo",
		type: "components:example",
		registryDependencies: ["context-menu"],
		files: ["example/context-menu-demo.svelte"]
	},
	{
		name: "data-table-demo",
		type: "components:example",
		registryDependencies: ["data-table"],
		files: [
			"example/data-table-demo.svelte",
			"example/data-table/data-table-actions.svelte",
			"example/data-table/data-table-checkbox.svelte"
		]
	},
	// {
	// 	name: "date-picker-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["button", "calendar", "popover"],
	// 	files: ["example/date-picker-demo.tsx"],
	// 	dependencies: ["date-fns"]
	// },
	// {
	// 	name: "date-picker-form",
	// 	type: "components:example",
	// 	registryDependencies: ["button", "calendar", "form", "popover"],
	// 	files: ["example/date-picker-form.tsx"],
	// 	dependencies: ["date-fns"]
	// },
	// {
	// 	name: "date-picker-with-presets",
	// 	type: "components:example",
	// 	registryDependencies: ["button", "calendar", "popover", "select"],
	// 	files: ["example/date-picker-with-presets.tsx"],
	// 	dependencies: ["date-fns"]
	// },
	// {
	// 	name: "date-picker-with-range",
	// 	type: "components:example",
	// 	registryDependencies: ["button", "calendar", "popover"],
	// 	files: ["example/date-picker-with-range.tsx"],
	// 	dependencies: ["date-fns"]
	// },
	{
		name: "dialog-demo",
		type: "components:example",
		registryDependencies: ["dialog"],
		files: ["example/dialog-demo.svelte"]
	},
	{
		name: "dropdown-menu-demo",
		type: "components:example",
		registryDependencies: ["dropdown-menu"],
		files: ["example/dropdown-menu-demo.svelte"]
	},
	// {
	// 	name: "dropdown-menu-checkboxes",
	// 	type: "components:example",
	// 	registryDependencies: ["dropdown-menu", "checkbox"],
	// 	files: ["example/dropdown-menu-checkboxes.tsx"]
	// },
	// {
	// 	name: "dropdown-menu-radio-group",
	// 	type: "components:example",
	// 	registryDependencies: ["dropdown-menu", "radio-group"],
	// 	files: ["example/dropdown-menu-radio-group.tsx"]
	// },
	{
		name: "hover-card-demo",
		type: "components:example",
		registryDependencies: ["hover-card"],
		files: ["example/hover-card-demo.svelte"]
	},
	{
		name: "input-demo",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input-demo.svelte"]
	},
	{
		name: "input-disabled",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input-disabled.svelte"]
	},
	{
		name: "input-file",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input-file.svelte"]
	},
	// {
	// 	name: "input-form",
	// 	type: "components:example",
	// 	registryDependencies: ["input", "button", "form"],
	// 	files: ["example/input-form.tsx"]
	// },
	{
		name: "input-with-button",
		type: "components:example",
		registryDependencies: ["input", "button"],
		files: ["example/input-with-button.svelte"]
	},
	{
		name: "input-with-label",
		type: "components:example",
		registryDependencies: ["input", "button", "label"],
		files: ["example/input-with-label.svelte"]
	},
	{
		name: "input-with-text",
		type: "components:example",
		registryDependencies: ["input", "button", "label"],
		files: ["example/input-with-text.svelte"]
	},
	{
		name: "label-demo",
		type: "components:example",
		registryDependencies: ["label"],
		files: ["example/label-demo.svelte"]
	},
	{
		name: "menubar-demo",
		type: "components:example",
		registryDependencies: ["menubar"],
		files: ["example/menubar-demo.svelte"]
	},
	// {
	// 	name: "navigation-menu-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["navigation-menu"],
	// 	files: ["example/navigation-menu-demo.tsx"]
	// },
	{
		name: "popover-demo",
		type: "components:example",
		registryDependencies: ["popover"],
		files: ["example/popover-demo.svelte"]
	},
	{
		name: "progress-demo",
		type: "components:example",
		registryDependencies: ["progress"],
		files: ["example/progress-demo.svelte"]
	},
	{
		name: "radio-group-demo",
		type: "components:example",
		registryDependencies: ["radio-group"],
		files: ["example/radio-group-demo.svelte"]
	},
	// {
	// 	name: "radio-group-form",
	// 	type: "components:example",
	// 	registryDependencies: ["radio-group", "form"],
	// 	files: ["example/radio-group-form.tsx"]
	// },
	// {
	// 	name: "scroll-area-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["scroll-area"],
	// 	files: ["example/scroll-area-demo.tsx"]
	// },
	{
		name: "select-demo",
		type: "components:example",
		registryDependencies: ["select"],
		files: ["example/select-demo.svelte"]
	},
	// {
	// 	name: "select-form",
	// 	type: "components:example",
	// 	registryDependencies: ["select"],
	// 	files: ["example/select-form.tsx"]
	// },
	{
		name: "separator-demo",
		type: "components:example",
		registryDependencies: ["separator"],
		files: ["example/separator-demo.svelte"]
	},
	{
		name: "sheet-demo",
		type: "components:example",
		registryDependencies: ["sheet"],
		files: ["example/sheet-demo.svelte"]
	},
	{
		name: "sheet-side",
		type: "components:example",
		registryDependencies: ["sheet"],
		files: ["example/sheet-side.svelte"]
	},
	{
		name: "skeleton-demo",
		type: "components:example",
		registryDependencies: ["skeleton"],
		files: ["example/skeleton-demo.svelte"]
	},
	{
		name: "slider-demo",
		type: "components:example",
		registryDependencies: ["slider"],
		files: ["example/slider-demo.svelte"]
	},
	{
		name: "switch-demo",
		type: "components:example",
		registryDependencies: ["switch"],
		files: ["example/switch-demo.svelte"]
	},
	// {
	// 	name: "switch-form",
	// 	type: "components:example",
	// 	registryDependencies: ["switch", "form"],
	// 	files: ["example/switch-form.tsx"]
	// },
	{
		name: "table-demo",
		type: "components:example",
		registryDependencies: ["table"],
		files: ["example/table-demo.svelte"]
	},
	{
		name: "tabs-demo",
		type: "components:example",
		registryDependencies: ["tabs"],
		files: ["example/tabs-demo.svelte"]
	},
	{
		name: "textarea-demo",
		type: "components:example",
		registryDependencies: ["textarea"],
		files: ["example/textarea-demo.svelte"]
	},
	{
		name: "textarea-disabled",
		type: "components:example",
		registryDependencies: ["textarea"],
		files: ["example/textarea-disabled.svelte"]
	},
	// {
	// 	name: "textarea-form",
	// 	type: "components:example",
	// 	registryDependencies: ["textarea", "form"],
	// 	files: ["example/textarea-form.tsx"]
	// },
	{
		name: "textarea-with-button",
		type: "components:example",
		registryDependencies: ["textarea", "button"],
		files: ["example/textarea-with-button.svelte"]
	},
	{
		name: "textarea-with-label",
		type: "components:example",
		registryDependencies: ["textarea", "label"],
		files: ["example/textarea-with-label.svelte"]
	},
	{
		name: "textarea-with-text",
		type: "components:example",
		registryDependencies: ["textarea", "label"],
		files: ["example/textarea-with-text.svelte"]
	},
	// {
	// 	name: "toast-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["toast"],
	// 	files: ["example/toast-demo.tsx"]
	// },
	// {
	// 	name: "toast-destructive",
	// 	type: "components:example",
	// 	registryDependencies: ["toast"],
	// 	files: ["example/toast-destructive.tsx"]
	// },
	// {
	// 	name: "toast-simple",
	// 	type: "components:example",
	// 	registryDependencies: ["toast"],
	// 	files: ["example/toast-simple.tsx"]
	// },
	// {
	// 	name: "toast-with-action",
	// 	type: "components:example",
	// 	registryDependencies: ["toast"],
	// 	files: ["example/toast-with-action.tsx"]
	// },
	// {
	// 	name: "toast-with-title",
	// 	type: "components:example",
	// 	registryDependencies: ["toast"],
	// 	files: ["example/toast-with-title.tsx"]
	// },
	{
		name: "toggle-demo",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-demo.svelte"]
	},
	{
		name: "toggle-disabled",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-disabled.svelte"]
	},
	{
		name: "toggle-lg",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-lg.svelte"]
	},
	{
		name: "toggle-outline",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-outline.svelte"]
	},
	{
		name: "toggle-sm",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-sm.svelte"]
	},
	{
		name: "toggle-with-text",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle-with-text.svelte"]
	},
	{
		name: "tooltip-demo",
		type: "components:example",
		registryDependencies: ["tooltip"],
		files: ["example/tooltip-demo.svelte"]
	},
	{
		name: "typography-blockquote",
		type: "components:example",
		files: ["example/typography-blockquote.svelte"]
	},
	{
		name: "typography-demo",
		type: "components:example",
		files: ["example/typography-demo.svelte"]
	},
	{
		name: "typography-h1",
		type: "components:example",
		files: ["example/typography-h1.svelte"]
	},
	{
		name: "typography-h2",
		type: "components:example",
		files: ["example/typography-h2.svelte"]
	},
	{
		name: "typography-h3",
		type: "components:example",
		files: ["example/typography-h3.svelte"]
	},
	{
		name: "typography-h4",
		type: "components:example",
		files: ["example/typography-h4.svelte"]
	},
	{
		name: "typography-inline-code",
		type: "components:example",
		files: ["example/typography-inline-code.svelte"]
	},
	{
		name: "typography-large",
		type: "components:example",
		files: ["example/typography-large.svelte"]
	},
	{
		name: "typography-lead",
		type: "components:example",
		files: ["example/typography-lead.svelte"]
	},
	{
		name: "typography-list",
		type: "components:example",
		files: ["example/typography-list.svelte"]
	},
	{
		name: "typography-muted",
		type: "components:example",
		files: ["example/typography-muted.svelte"]
	},
	{
		name: "typography-p",
		type: "components:example",
		files: ["example/typography-p.svelte"]
	},
	{
		name: "typography-small",
		type: "components:example",
		files: ["example/typography-small.svelte"]
	},
	{
		name: "typography-table",
		type: "components:example",
		files: ["example/typography-table.svelte"]
	}
	// {
	// 	name: "mode-toggle",
	// 	type: "components:example",
	// 	files: ["example/mode-toggle.tsx"]
	// }
];

export const registry: Registry = [...ui, ...example];
