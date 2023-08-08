import type { Registry } from "@/registry/schema";

const ui: Registry = [
	{
		name: "accordion",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/accordion/Accordion.svelte",
			"ui/accordion/AccordionContent.svelte",
			"ui/accordion/AccordionItem.svelte",
			"ui/accordion/AccordionTrigger.svelte",
			"ui/accordion/index.ts"
		]
	},
	{
		name: "alert",
		type: "components:ui",
		files: [
			"ui/alert/Alert.svelte",
			"ui/alert/AlertDescription.svelte",
			"ui/alert/AlertTitle.svelte",
			"ui/alert/index.ts"
		]
	},
	{
		name: "alert-dialog",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		registryDependencies: ["button"],
		files: [
			"ui/alert-dialog/AlertDialogAction.svelte",
			"ui/alert-dialog/AlertDialogCancel.svelte",
			"ui/alert-dialog/AlertDialogContent.svelte",
			"ui/alert-dialog/AlertDialogDescription.svelte",
			"ui/alert-dialog/AlertDialogFooter.svelte",
			"ui/alert-dialog/AlertDialogHeader.svelte",
			"ui/alert-dialog/AlertDialogOverlay.svelte",
			"ui/alert-dialog/AlertDialogPortal.svelte",
			"ui/alert-dialog/AlertDialogTitle.svelte",
			"ui/alert-dialog/index.ts"
		]
	},
	{
		name: "aspect-ratio",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/aspect-ratio/AspectRatio.svelte",
			"ui/aspect-ratio/index.ts"
		]
	},
	{
		name: "avatar",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/avatar/Avatar.svelte",
			"ui/avatar/AvatarFallback.svelte",
			"ui/avatar/AvatarImage.svelte",
			"ui/avatar/index.ts"
		]
	},
	{
		name: "badge",
		type: "components:ui",
		files: ["ui/badge/Badge.svelte", "ui/badge/index.ts"]
	},
	{
		name: "button",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/button/Button.svelte", "ui/button/index.ts"]
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
			"ui/card/Card.svelte",
			"ui/card/CardContent.svelte",
			"ui/card/CardDescription.svelte",
			"ui/card/CardFooter.svelte",
			"ui/card/CardHeader.svelte",
			"ui/card/CardTitle.svelte",
			"ui/card/index.ts"
		]
	},
	{
		name: "checkbox",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/checkbox/Checkbox.svelte", "ui/checkbox/index.ts"]
	},
	{
		name: "collapsible",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/collapsible/CollapsibleContent.svelte",
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
			"ui/context-menu/ContextMenuCheckboxItem.svelte",
			"ui/context-menu/ContextMenuContent.svelte",
			"ui/context-menu/ContextMenuItem.svelte",
			"ui/context-menu/ContextMenuLabel.svelte",
			"ui/context-menu/ContextMenuRadioGroup.svelte",
			"ui/context-menu/ContextMenuRadioItem.svelte",
			"ui/context-menu/ContextMenuSeparator.svelte",
			"ui/context-menu/ContextMenuShortcut.svelte",
			"ui/context-menu/ContextMenuSubContent.svelte",
			"ui/context-menu/ContextMenuSubTrigger.svelte",
			"ui/context-menu/index.ts"
		]
	},
	{
		name: "dialog",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/dialog/DialogContent.svelte",
			"ui/dialog/DialogDescription.svelte",
			"ui/dialog/DialogFooter.svelte",
			"ui/dialog/DialogHeader.svelte",
			"ui/dialog/DialogOverlay.svelte",
			"ui/dialog/DialogPortal.svelte",
			"ui/dialog/DialogTitle.svelte",
			"ui/dialog/index.ts"
		]
	},
	{
		name: "dropdown-menu",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/dropdown-menu/DropdownMenuCheckboxItem.svelte",
			"ui/dropdown-menu/DropdownMenuContent.svelte",
			"ui/dropdown-menu/DropdownMenuItem.svelte",
			"ui/dropdown-menu/DropdownMenuLabel.svelte",
			"ui/dropdown-menu/DropdownMenuRadioGroup.svelte",
			"ui/dropdown-menu/DropdownMenuRadioItem.svelte",
			"ui/dropdown-menu/DropdownMenuSeparator.svelte",
			"ui/dropdown-menu/DropdownMenuShortcut.svelte",
			"ui/dropdown-menu/DropdownMenuSubContent.svelte",
			"ui/dropdown-menu/DropdownMenuSubTrigger.svelte",
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
			"ui/hover-card/HoverCardContent.svelte",
			"ui/hover-card/index.ts"
		]
	},
	{
		name: "input",
		type: "components:ui",
		files: ["ui/input/Input.svelte", "ui/input/index.ts"]
	},
	{
		name: "label",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/label/Label.svelte", "ui/label/index.ts"]
	},
	{
		name: "menubar",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/menubar/Menubar.svelte",
			"ui/menubar/MenubarCheckboxItem.svelte",
			"ui/menubar/MenubarContent.svelte",
			"ui/menubar/MenubarItem.svelte",
			"ui/menubar/MenubarLabel.svelte",
			"ui/menubar/MenubarRadioItem.svelte",
			"ui/menubar/MenubarSeparator.svelte",
			"ui/menubar/MenubarShortcut.svelte",
			"ui/menubar/MenubarSubContent.svelte",
			"ui/menubar/MenubarSubTrigger.svelte",
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
		files: ["ui/popover/PopoverContent.svelte", "ui/popover/index.ts"]
	},
	{
		name: "progress",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/progress/Progress.svelte", "ui/progress/index.ts"]
	},
	{
		name: "radio-group",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/radio-group/RadioGroup.svelte",
			"ui/radio-group/RadioGroupItem.svelte",
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
			"ui/select/Select.svelte",
			"ui/select/SelectContent.svelte",
			"ui/select/SelectGroup.svelte",
			"ui/select/SelectInput.svelte",
			"ui/select/SelectItem.svelte",
			"ui/select/SelectLabel.svelte",
			"ui/select/SelectSeparator.svelte",
			"ui/select/SelectTrigger.svelte",
			"ui/select/SelectValue.svelte",
			"ui/select/index.ts"
		]
	},
	{
		name: "separator",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/separator/Separator.svelte", "ui/separator/index.ts"]
	},
	{
		name: "sheet",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/sheet/SheetContent.svelte",
			"ui/sheet/SheetDescription.svelte",
			"ui/sheet/SheetFooter.svelte",
			"ui/sheet/SheetHeader.svelte",
			"ui/sheet/SheetOverlay.svelte",
			"ui/sheet/SheetPortal.svelte",
			"ui/sheet/SheetTitle.svelte",
			"ui/sheet/index.ts"
		]
	},
	{
		name: "skeleton",
		type: "components:ui",
		files: ["ui/skeleton/Skeleton.svelte", "ui/skeleton/index.ts"]
	},
	{
		name: "slider",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/slider/Slider.svelte", "ui/slider/index.ts"]
	},
	{
		name: "switch",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/switch/Switch.svelte", "ui/switch/index.ts"]
	},
	{
		name: "table",
		type: "components:ui",
		files: [
			"ui/table/Table.svelte",
			"ui/table/TableBody.svelte",
			"ui/table/TableCaption.svelte",
			"ui/table/TableCell.svelte",
			"ui/table/TableFooter.svelte",
			"ui/table/TableHead.svelte",
			"ui/table/TableHeader.svelte",
			"ui/table/TableRow.svelte",
			"ui/table/index.ts"
		]
	},
	{
		name: "tabs",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: [
			"ui/tabs/TabsContent.svelte",
			"ui/tabs/TabsList.svelte",
			"ui/tabs/TabsTrigger.svelte",
			"ui/tabs/index.ts"
		]
	},
	{
		name: "textarea",
		type: "components:ui",
		files: ["ui/textarea/Textarea.svelte", "ui/textarea/index.ts"]
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
		files: ["ui/toggle/Toggle.svelte", "ui/toggle/index.ts"]
	},
	{
		name: "tooltip",
		type: "components:ui",
		dependencies: ["@huntabyte/primitives"],
		files: ["ui/tooltip/TooltipContent.svelte", "ui/tooltip/index.ts"]
	}
];

const example: Registry = [
	{
		name: "accordion-demo",
		type: "components:example",
		registryDependencies: ["accordion"],
		files: ["example/accordion/AccordionDemo.svelte"]
	},
	{
		name: "alert-demo",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert/AlertDemo.svelte"]
	},
	{
		name: "alert-destructive",
		type: "components:example",
		registryDependencies: ["alert"],
		files: ["example/alert/AlertDemoDestructive.svelte"]
	},
	{
		name: "alert-dialog-demo",
		type: "components:example",
		registryDependencies: ["alert-dialog", "button"],
		files: ["example/alert-dialog/AlertDialogDemo.svelte"]
	},
	{
		name: "aspect-ratio-demo",
		type: "components:example",
		registryDependencies: ["aspect-ratio"],
		files: ["example/aspect-ratio/AspectRatioDemo.svelte"]
	},
	{
		name: "avatar-demo",
		type: "components:example",
		registryDependencies: ["avatar"],
		files: ["example/avatar/AvatarDemo.svelte"]
	},
	{
		name: "badge-demo",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge/BadgeDemo.svelte"]
	},
	{
		name: "badge-destructive",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge/BadgeDemoDestructive.svelte"]
	},
	{
		name: "badge-outline",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge/BadgeDemoOutline.svelte"]
	},
	{
		name: "badge-secondary",
		type: "components:example",
		registryDependencies: ["badge"],
		files: ["example/badge/BadgeDemoSecondary.svelte"]
	},
	{
		name: "button-demo",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemo.svelte"]
	},
	{
		name: "button-secondary",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoSecondary.svelte"]
	},
	{
		name: "button-destructive",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoDestructive.svelte"]
	},
	{
		name: "button-outline",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoOutline.svelte"]
	},
	{
		name: "button-ghost",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoGhost.svelte"]
	},
	{
		name: "button-link",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoLink.svelte"]
	},
	{
		name: "button-with-icon",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoIcon.svelte"]
	},
	{
		name: "button-loading",
		type: "components:example",
		registryDependencies: ["button"],
		files: ["example/button/ButtonDemoLoading.svelte"]
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
		files: ["example/card/CardDemo.svelte"]
	},
	{
		name: "card-with-form",
		type: "components:example",
		registryDependencies: ["button", "card", "input", "label", "select"],
		files: ["example/card/CardDemoForm.svelte"]
	},
	{
		name: "checkbox-demo",
		type: "components:example",
		registryDependencies: ["checkbox"],
		files: ["example/checkbox/CheckboxDemo.svelte"]
	},
	{
		name: "checkbox-disabled",
		type: "components:example",
		registryDependencies: ["checkbox"],
		files: ["example/checkbox/CheckboxDemoDisabled.svelte"]
	},
	// {
	// 	name: "checkbox-form-multiple",
	// 	type: "components:example",
	// 	registryDependencies: ["checkbox", "form"],
	// 	files: ["example/checkbox/CheckboxDemo.svelte"]
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
		files: ["example/checkbox/CheckboxDemoText.svelte"]
	},
	{
		name: "collapsible-demo",
		type: "components:example",
		registryDependencies: ["collapsible"],
		files: ["example/collapsible/CollapsibleDemo.svelte"]
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
		files: ["example/context-menu/ContextMenuDemo.svelte"]
	},
	// {
	// 	name: "data-table-demo",
	// 	type: "components:example",
	// 	registryDependencies: ["data-table"],
	// 	files: ["example/data-table-demo.tsx"]
	// },
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
		files: ["example/dialog/DialogDemo.svelte"]
	},
	{
		name: "dropdown-menu-demo",
		type: "components:example",
		registryDependencies: ["dropdown-menu"],
		files: ["example/dropdown-menu/DropdownMenuDemo.svelte"]
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
		files: ["example/hover-card/HoverCardDemo.svelte"]
	},
	{
		name: "input-demo",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input/InputDemo.svelte"]
	},
	{
		name: "input-disabled",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input/InputDisabled.svelte"]
	},
	{
		name: "input-file",
		type: "components:example",
		registryDependencies: ["input"],
		files: ["example/input/InputDemoFile.svelte"]
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
		files: ["example/input/InputDemoButton.svelte"]
	},
	{
		name: "input-with-label",
		type: "components:example",
		registryDependencies: ["input", "button", "label"],
		files: ["example/input/InputDemoLabel.svelte"]
	},
	{
		name: "input-with-text",
		type: "components:example",
		registryDependencies: ["input", "button", "label"],
		files: ["example/input/InputDemoText.svelte"]
	},
	{
		name: "label-demo",
		type: "components:example",
		registryDependencies: ["label"],
		files: ["example/label/LabelDemo.svelte"]
	},
	{
		name: "menubar-demo",
		type: "components:example",
		registryDependencies: ["menubar"],
		files: ["example/menubar/MenubarDemo.svelte"]
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
		files: ["example/popover/PopoverDemo.svelte"]
	},
	{
		name: "progress-demo",
		type: "components:example",
		registryDependencies: ["progress"],
		files: ["example/progress/ProgressDemo.svelte"]
	},
	{
		name: "radio-group-demo",
		type: "components:example",
		registryDependencies: ["radio-group"],
		files: ["example/radio-group/RadioGroupDemo.svelte"]
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
		files: ["example/select/SelectDemo.svelte"]
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
		files: ["example/separator/SeparatorDemo.svelte"]
	},
	{
		name: "sheet-demo",
		type: "components:example",
		registryDependencies: ["sheet"],
		files: ["example/sheet/SheetDemo.svelte"]
	},
	{
		name: "sheet-side",
		type: "components:example",
		registryDependencies: ["sheet"],
		files: ["example/sheet/SheetSideDemo.svelte"]
	},
	{
		name: "skeleton-demo",
		type: "components:example",
		registryDependencies: ["skeleton"],
		files: ["example/skeleton/SkeletonDemo.svelte"]
	},
	{
		name: "slider-demo",
		type: "components:example",
		registryDependencies: ["slider"],
		files: ["example/slider/SliderDemo.svelte"]
	},
	{
		name: "switch-demo",
		type: "components:example",
		registryDependencies: ["switch"],
		files: ["example/switch/SwitchDemo.svelte"]
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
		files: ["example/table/TableDemo.svelte"]
	},
	{
		name: "tabs-demo",
		type: "components:example",
		registryDependencies: ["tabs"],
		files: ["example/tabs/TabsDemo.svelte"]
	},
	{
		name: "textarea-demo",
		type: "components:example",
		registryDependencies: ["textarea"],
		files: ["example/textarea/TextareaDemo.svelte"]
	},
	{
		name: "textarea-disabled",
		type: "components:example",
		registryDependencies: ["textarea"],
		files: ["example/textarea/TextareaDemoDisabled.svelte"]
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
		files: ["example/textarea/TextareaDemoButton.svelte"]
	},
	{
		name: "textarea-with-label",
		type: "components:example",
		registryDependencies: ["textarea", "label"],
		files: ["example/textarea/TextareaDemoLabel.svelte"]
	},
	{
		name: "textarea-with-text",
		type: "components:example",
		registryDependencies: ["textarea", "label"],
		files: ["example/textarea/TextareaDemoText.svelte"]
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
		files: ["example/toggle/ToggleDemo.svelte"]
	},
	{
		name: "toggle-disabled",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle/ToggleDemoDisabled.svelte"]
	},
	{
		name: "toggle-lg",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle/ToggleDemoLg.svelte"]
	},
	{
		name: "toggle-outline",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle/ToggleDemoOutline.svelte"]
	},
	{
		name: "toggle-sm",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle/ToggleDemoSm.svelte"]
	},
	{
		name: "toggle-with-text",
		type: "components:example",
		registryDependencies: ["toggle"],
		files: ["example/toggle/ToggleDemoText.svelte"]
	},
	{
		name: "tooltip-demo",
		type: "components:example",
		registryDependencies: ["tooltip"],
		files: ["example/tooltip/TooltipDemo.svelte"]
	},
	{
		name: "typography-blockquote",
		type: "components:example",
		files: ["example/typography/BlockquoteDemo.svelte"]
	},
	{
		name: "typography-demo",
		type: "components:example",
		files: ["example/typography/TypographyDemo.svelte"]
	},
	{
		name: "typography-h1",
		type: "components:example",
		files: ["example/typography/H1Demo.svelte"]
	},
	{
		name: "typography-h2",
		type: "components:example",
		files: ["example/typography/H2Demo.svelte"]
	},
	{
		name: "typography-h3",
		type: "components:example",
		files: ["example/typography/H3Demo.svelte"]
	},
	{
		name: "typography-h4",
		type: "components:example",
		files: ["example/typography/H4Demo.svelte"]
	},
	{
		name: "typography-inline-code",
		type: "components:example",
		files: ["example/typography/InlineCodeDemo.svelte"]
	},
	{
		name: "typography-large",
		type: "components:example",
		files: ["example/typography/LargeDemo.svelte"]
	},
	{
		name: "typography-lead",
		type: "components:example",
		files: ["example/typography/LeadDemo.svelte"]
	},
	{
		name: "typography-list",
		type: "components:example",
		files: ["example/typography/ListDemo.svelte"]
	},
	{
		name: "typography-muted",
		type: "components:example",
		files: ["example/typography/MutedDemo.svelte"]
	},
	{
		name: "typography-p",
		type: "components:example",
		files: ["example/typography/PDemo.svelte"]
	},
	{
		name: "typography-small",
		type: "components:example",
		files: ["example/typography/SmallDemo.svelte"]
	},
	{
		name: "typography-table",
		type: "components:example",
		files: ["example/typography/TableDemo.svelte"]
	}
	// {
	// 	name: "mode-toggle",
	// 	type: "components:example",
	// 	files: ["example/mode-toggle.tsx"]
	// }
];

export const registry: Registry = [...ui, ...example];
