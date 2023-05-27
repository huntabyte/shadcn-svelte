export const components = [
	{
		component: "accordion",
		name: "Accordion",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/accordion/Accordion.svelte",
			"src/lib/components/ui/accordion/AccordionContent.svelte",
			"src/lib/components/ui/accordion/AccordionItem.svelte",
			"src/lib/components/ui/accordion/AccordionTrigger.svelte",
			"src/lib/components/ui/accordion/index.ts"
		]
	},
	{
		component: "alert",
		name: "Alert",
		files: [
			"src/lib/components/ui/alert/Alert.svelte",
			"src/lib/components/ui/alert/AlertDescription.svelte",
			"src/lib/components/ui/alert/AlertTitle.svelte",
			"src/lib/components/ui/alert/index.ts"
		]
	},
	{
		component: "alert-dialog",
		name: "Alert Dialog",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/alert-dialog/AlertDialogAction.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogCancel.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogContent.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogDescription.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogFooter.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogHeader.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogOverlay.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogPortal.svelte",
			"src/lib/components/ui/alert-dialog/AlertDialogTitle.svelte",
			"src/lib/components/ui/alert-dialog/index.ts"
		]
	},
	{
		component: "aspect-ratio",
		name: "Aspect Ratio",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/aspect-ratio/AspectRatio.svelte",
			"src/lib/components/ui/aspect-ratio/index.ts"
		]
	},
	{
		component: "avatar",
		name: "Avatar",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/avatar/Avatar.svelte",
			"src/lib/components/ui/avatar/AvatarFallback.svelte",
			"src/lib/components/ui/avatar/AvatarImage.svelte",
			"src/lib/components/ui/avatar/index.ts"
		]
	},
	{
		component: "badge",
		name: "Badge",
		files: [
			"src/lib/components/ui/badge/Badge.svelte",
			"src/lib/components/ui/badge/index.ts"
		]
	},
	{
		component: "button",
		name: "Button",
		files: [
			"src/lib/components/ui/button/Button.svelte",
			"src/lib/components/ui/button/index.ts"
		]
	},
	{
		component: "card",
		name: "Card",
		files: [
			"src/lib/components/ui/card/Card.svelte",
			"src/lib/components/ui/card/CardContent.svelte",
			"src/lib/components/ui/card/CardDescription.svelte",
			"src/lib/components/ui/card/CardFooter.svelte",
			"src/lib/components/ui/card/CardHeader.svelte",
			"src/lib/components/ui/card/CardTitle.svelte",
			"src/lib/components/ui/card/index.ts"
		]
	},
	//   {
	//     component: "calendar",
	//     name: "Calendar",
	//     dependencies: ["react-day-picker", "date-fns"],
	//     files: ["components/ui/calendar.tsx"]
	//   },
	{
		component: "checkbox",
		name: "Checkbox",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/checkbox/Checkbox.svelte",
			"src/lib/components/ui/checkbox/index.ts"
		]
	},
	{
		component: "collapsible",
		name: "Collapsible",
		dependencies: ["radix-svelte"],
		files: ["src/lib/components/ui/collapsible/index.ts"]
	},
	//   {
	//     component: "command",
	//     name: "Command",
	//     dependencies: ["cmdk"],
	//     files: ["components/ui/command.tsx"]
	//   },
	//   {
	//     component: "context-menu",
	//     name: "Context Menu",
	//     dependencies: ["@radix-ui/react-context-menu"],
	//     files: ["components/ui/context-menu.tsx"]
	//   },
	{
		component: "dialog",
		name: "Dialog",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/dialog/DialogContent.svelte",
			"src/lib/components/ui/dialog/DialogDescription.svelte",
			"src/lib/components/ui/dialog/DialogFooter.svelte",
			"src/lib/components/ui/dialog/DialogHeader.svelte",
			"src/lib/components/ui/dialog/DialogOverlay.svelte",
			"src/lib/components/ui/dialog/DialogPortal.svelte",
			"src/lib/components/ui/dialog/DialogTitle.svelte",
			"src/lib/components/ui/dialog/index.ts"
		]
	},
	//   {
	//     component: "dropdown-menu",
	//     name: "Dropdown Menu",
	//     dependencies: ["@radix-ui/react-dropdown-menu"],
	//     files: ["components/ui/dropdown-menu.tsx"]
	//   },
	{
		component: "hover-card",
		name: "Hover Card",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/hover-card/HoverCardContent.svelte",
			"src/lib/components/ui/hover-card/index.ts"
		]
	},
	{
		component: "input",
		name: "Input",
		files: [
			"src/lib/components/ui/input/Input.svelte",
			"src/lib/components/ui/input/index.ts"
		]
	},
	{
		component: "label",
		name: "Label",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/label/Label.svelte",
			"src/lib/components/ui/label/index.ts"
		]
	},
	//   {
	//     component: "menubar",
	//     name: "Menubar",
	//     dependencies: ["@radix-ui/react-menubar"],
	//     files: ["components/ui/menubar.tsx"]
	//   },
	//   {
	//     component: "navigation-menu",
	//     name: "Navigation Menu",
	//     dependencies: ["@radix-ui/react-navigation-menu"],
	//     files: ["components/ui/navigation-menu.tsx"]
	//   },
	//   {
	//     component: "popover",
	//     name: "Popover",
	//     dependencies: ["@radix-ui/react-popover"],
	//     files: ["components/ui/popover.tsx"]
	//   },
	{
		component: "progress",
		name: "Progress",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/progress/Progress.svelte",
			"src/lib/components/ui/progress/index.ts"
		]
	},
	{
		component: "radio-group",
		name: "Radio Group",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/radio-group/RadioGroup.svelte",
			"src/lib/components/ui/radio-group/RadioGroupItem.svelte",
			"src/lib/components/ui/radio-group/index.ts"
		]
	},
	//   {
	//     component: "scroll-area",
	//     name: "Scroll-area",
	//     dependencies: ["@radix-ui/react-scroll-area"],
	//     files: ["components/ui/scroll-area.tsx"]
	//   },
	//   {
	//     component: "select",
	//     name: "Select",
	//     dependencies: ["@radix-ui/react-select"],
	//     files: ["components/ui/select.tsx"]
	//   },
	{
		component: "separator",
		name: "Separator",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/separator/Separator.svelte",
			"src/lib/components/ui/separator/index.ts"
		]
	},
	{
		component: "sheet",
		name: "Sheet",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/sheet/SheetContent.svelte",
			"src/lib/components/ui/sheet/SheetDescription.svelte",
			"src/lib/components/ui/sheet/SheetFooter.svelte",
			"src/lib/components/ui/sheet/SheetHeader.svelte",
			"src/lib/components/ui/sheet/SheetOverlay.svelte",
			"src/lib/components/ui/sheet/SheetPortal.svelte",
			"src/lib/components/ui/sheet/SheetTitle.svelte",
			"src/lib/components/ui/sheet/index.ts"
		]
	},
	{
		component: "skeleton",
		name: "Skeleton",
		files: [
			"src/lib/components/ui/skeleton/Skeleton.svelte",
			"src/lib/components/ui/skeleton/index.ts"
		]
	},
	{
		component: "slider",
		name: "Slider",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/slider/Slider.svelte",
			"src/lib/components/ui/slider/index.ts"
		]
	},
	{
		component: "switch",
		name: "Switch",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/switch/Switch.svelte",
			"src/lib/components/ui/switch/index.ts"
		]
	},
	{
		component: "table",
		name: "Table",
		files: [
			"src/lib/components/ui/table/Table.svelte",
			"src/lib/components/ui/table/TableBody.svelte",
			"src/lib/components/ui/table/TableCaption.svelte",
			"src/lib/components/ui/table/TableCell.svelte",
			"src/lib/components/ui/table/TableFooter.svelte",
			"src/lib/components/ui/table/TableHead.svelte",
			"src/lib/components/ui/table/TableHeader.svelte",
			"src/lib/components/ui/table/TableRow.svelte",
			"src/lib/components/ui/table/index.ts"
		]
	},
	{
		component: "tabs",
		name: "Tabs",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/tabs/TabsContent.svelte",
			"src/lib/components/ui/tabs/TabsList.svelte",
			"src/lib/components/ui/tabs/TabsTrigger.svelte",
			"src/lib/components/ui/tabs/index.ts"
		]
	},
	{
		component: "textarea",
		name: "Textarea",
		files: [
			"src/lib/components/ui/textarea/Textarea.svelte",
			"src/lib/components/ui/textarea/index.ts"
		]
	},
	//   {
	//     component: "toast",
	//     name: "Toast",
	//     dependencies: ["@radix-ui/react-toast"],
	//     files: ["components/ui/toast.tsx", "components/ui/use-toast.ts"]
	//   },
	{
		component: "toggle",
		name: "Toggle",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/toggle/Toggle.svelte",
			"src/lib/components/ui/toggle/index.ts"
		]
	},
	{
		component: "tooltip",
		name: "Tooltip",
		dependencies: ["radix-svelte"],
		files: [
			"src/lib/components/ui/tooltip/TooltipContent.svelte",
			"src/lib/components/ui/tooltip/index.ts"
		]
	}
];
