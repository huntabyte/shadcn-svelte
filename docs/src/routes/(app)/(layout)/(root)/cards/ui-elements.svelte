<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger,
	} from "$lib/registry/ui/alert-dialog/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Card, CardContent } from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from "$lib/registry/ui/dropdown-menu/index.js";
	import { Field, FieldGroup } from "$lib/registry/ui/field/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupInput,
		InputGroupText,
	} from "$lib/registry/ui/input-group/index.js";
	import { RadioGroup, RadioGroupItem } from "$lib/registry/ui/radio-group/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Card class="w-full">
	<CardContent class="flex flex-col gap-6">
		<div class="flex gap-2">
			<Button>
				Button
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight02Icon"
					phosphor="ArrowRightIcon"
					remixicon="RiArrowRightLine"
					data-icon="inline-end"
				/>
			</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
		</div>
		<FieldGroup>
			<Field>
				<InputGroup>
					<InputGroupInput placeholder="Name"></InputGroupInput>
					<InputGroupAddon align="inline-end">
						<InputGroupText>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="Search01Icon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
							/>
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</Field>
			<Field class="flex-1">
				<Textarea placeholder="Message" class="resize-none"></Textarea>
			</Field>
		</FieldGroup>
		<div class="flex items-center gap-2">
			<div class="flex gap-2">
				<Badge>Badge</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline" class="4xl:flex hidden">Outline</Badge>
			</div>
			<RadioGroup
				value="apple"
				class="ml-auto flex w-fit gap-3"
				aria-label="Fruit preference"
			>
				<RadioGroupItem value="apple" aria-label="Apple"></RadioGroupItem>
				<RadioGroupItem value="banana" aria-label="Banana"></RadioGroupItem>
			</RadioGroup>
			<div class="flex gap-3">
				<Checkbox checked aria-label="Enable email alerts"></Checkbox>
				<Checkbox class="4xl:flex hidden" aria-label="Enable push alerts"></Checkbox>
			</div>
			<Switch
				checked
				class="4xl:hidden data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/90 data-[state=checked]:border-primary [&_[data-slot=switch-thumb]]:bg-background dark:[&_[data-slot=switch-thumb][data-state=checked]]:bg-primary-foreground dark:[&_[data-slot=switch-thumb][data-state=unchecked]]:bg-foreground flex data-[state=unchecked]:border-transparent [&_[data-slot=switch-thumb][data-state=checked]]:translate-x-[calc(100%-4px)] [&_[data-slot=switch-thumb][data-state=unchecked]]:translate-x-0"
				aria-label="Enable compact notifications"
			></Switch>
		</div>
		<div class="flex items-center gap-4">
			<AlertDialog>
				<AlertDialogTrigger class={buttonVariants({ variant: "outline" })}>
					<span class="style-sera:md:hidden hidden md:flex"> Alert Dialog </span>
					<span class="style-sera:md:flex flex md:hidden">Dialog</span>
				</AlertDialogTrigger>
				<AlertDialogContent size="sm" portalProps={{ disabled: true }}>
					<AlertDialogHeader>
						<AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you want to allow the USB accessory to connect to this device and
							your data?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
						<AlertDialogAction>Allow</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<ButtonGroup class="ml-auto">
				<Button variant="outline">
					<span class="style-sera:hidden">Button Group</span>
					<span class="style-sera:block hidden">Group</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger
						class={buttonVariants({ variant: "outline", size: "icon" })}
						aria-label="Open quick actions"
					>
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUp01Icon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						side="top"
						class="w-40"
						portalProps={{ disabled: true }}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
							<DropdownMenuItem>Mute Conversation</DropdownMenuItem>
							<DropdownMenuItem>Mark as Read</DropdownMenuItem>
							<DropdownMenuItem>Block User</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator></DropdownMenuSeparator>
						<DropdownMenuGroup>
							<DropdownMenuItem variant="destructive">
								Delete Conversation
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</ButtonGroup>
			<Switch
				checked
				class="4xl:flex data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/90 data-[state=checked]:border-primary [&_[data-slot=switch-thumb]]:bg-background dark:[&_[data-slot=switch-thumb][data-state=checked]]:bg-primary-foreground dark:[&_[data-slot=switch-thumb][data-state=unchecked]]:bg-foreground hidden data-[state=unchecked]:border-transparent [&_[data-slot=switch-thumb][data-state=checked]]:translate-x-[calc(100%-4px)] [&_[data-slot=switch-thumb][data-state=unchecked]]:translate-x-0"
				aria-label="Enable advanced setting"
			></Switch>
		</div>
	</CardContent>
</Card>
