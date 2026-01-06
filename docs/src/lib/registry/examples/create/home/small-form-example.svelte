<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { tick } from "svelte";
	import { cn } from "$lib/utils.js";
	import { setMode } from "mode-watcher";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	const roleItems = [
		{ label: "Developer", value: "developer" },
		{ label: "Designer", value: "designer" },
		{ label: "Manager", value: "manager" },
		{ label: "Other", value: "other" },
	];

	let notifications = $state({
		email: true,
		sms: false,
		push: true,
	});
	let theme = $state("light");
	let frameworkOpen = $state(false);
	let frameworkValue = $state("");
	let role = $state<string | undefined>(undefined);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedFramework = $derived(
		frameworks.find((f) => f.toLowerCase() === frameworkValue) || ""
	);

	function closeAndFocusTrigger() {
		frameworkOpen = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	const roleLabel = $derived(
		roleItems.find((item) => item.value === role)?.label ?? "Select role"
	);
</script>

<Example title="Form">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>User Information</Card.Title>
			<Card.Description>Please fill in your details below</Card.Description>
			<Card.Action>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button variant="ghost" size="icon" {...props}>
								<IconPlaceholder
									lucide="MoreVerticalIcon"
									tabler="IconDotsVertical"
									hugeicons="MoreVerticalCircle01Icon"
									phosphor="DotsThreeVerticalIcon"
								/>
								<span class="sr-only">More options</span>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						align="end"
						class="style-maia:w-56 style-mira:w-48 style-nova:w-48 style-vega:w-56 style-lyra:w-48"
					>
						<DropdownMenu.Group>
							<DropdownMenu.Label>File</DropdownMenu.Label>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="FileIcon"
									tabler="IconFile"
									hugeicons="FileIcon"
									phosphor="FileIcon"
								/>
								New File
								<DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="FolderIcon"
									tabler="IconFolder"
									hugeicons="FolderIcon"
									phosphor="FolderIcon"
								/>
								New Folder
								<DropdownMenu.Shortcut>⇧⌘N</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<IconPlaceholder
										lucide="FolderOpenIcon"
										tabler="IconFolderOpen"
										hugeicons="FolderOpenIcon"
										phosphor="FolderOpenIcon"
									/>
									Open Recent
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent>
										<DropdownMenu.Group>
											<DropdownMenu.Label>Recent Projects</DropdownMenu.Label>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="FileCodeIcon"
													tabler="IconFileCode"
													hugeicons="CodeIcon"
													phosphor="CodeIcon"
												/>
												Project Alpha
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="FileCodeIcon"
													tabler="IconFileCode"
													hugeicons="CodeIcon"
													phosphor="CodeIcon"
												/>
												Project Beta
											</DropdownMenu.Item>
											<DropdownMenu.Sub>
												<DropdownMenu.SubTrigger>
													<IconPlaceholder
														lucide="MoreHorizontalIcon"
														tabler="IconDots"
														hugeicons="MoreHorizontalCircle01Icon"
														phosphor="DotsThreeOutlineIcon"
													/>
													More Projects
												</DropdownMenu.SubTrigger>
												<DropdownMenu.Portal>
													<DropdownMenu.SubContent>
														<DropdownMenu.Item>
															<IconPlaceholder
																lucide="FileCodeIcon"
																tabler="IconFileCode"
																hugeicons="CodeIcon"
																phosphor="CodeIcon"
															/>
															Project Gamma
														</DropdownMenu.Item>
														<DropdownMenu.Item>
															<IconPlaceholder
																lucide="FileCodeIcon"
																tabler="IconFileCode"
																hugeicons="CodeIcon"
																phosphor="CodeIcon"
															/>
															Project Delta
														</DropdownMenu.Item>
													</DropdownMenu.SubContent>
												</DropdownMenu.Portal>
											</DropdownMenu.Sub>
										</DropdownMenu.Group>
										<DropdownMenu.Separator />
										<DropdownMenu.Group>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="FolderSearchIcon"
													tabler="IconFolderSearch"
													hugeicons="SearchIcon"
													phosphor="MagnifyingGlassIcon"
												/>
												Browse...
											</DropdownMenu.Item>
										</DropdownMenu.Group>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="SaveIcon"
									tabler="IconDeviceFloppy"
									hugeicons="FloppyDiskIcon"
									phosphor="FloppyDiskIcon"
								/>
								Save
								<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="DownloadIcon"
									tabler="IconDownload"
									hugeicons="DownloadIcon"
									phosphor="DownloadIcon"
								/>
								Export
								<DropdownMenu.Shortcut>⇧⌘E</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Label>View</DropdownMenu.Label>
							<DropdownMenu.CheckboxItem
								checked={notifications.email}
								onCheckedChange={(checked) => {
									notifications = { ...notifications, email: checked === true };
								}}
							>
								<IconPlaceholder
									lucide="EyeIcon"
									tabler="IconEye"
									hugeicons="EyeIcon"
									phosphor="EyeIcon"
								/>
								Show Sidebar
							</DropdownMenu.CheckboxItem>
							<DropdownMenu.CheckboxItem
								checked={notifications.sms}
								onCheckedChange={(checked) => {
									notifications = { ...notifications, sms: checked === true };
								}}
							>
								<IconPlaceholder
									lucide="LayoutIcon"
									tabler="IconLayout"
									hugeicons="LayoutIcon"
									phosphor="LayoutIcon"
								/>
								Show Status Bar
							</DropdownMenu.CheckboxItem>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<IconPlaceholder
										lucide="PaletteIcon"
										tabler="IconPalette"
										hugeicons="PaintBoardIcon"
										phosphor="PaletteIcon"
									/>
									Theme
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent>
										<DropdownMenu.Group>
											<DropdownMenu.Label>Appearance</DropdownMenu.Label>
											<DropdownMenu.RadioGroup
												value={theme}
												onValueChange={(value) => {
													setMode(value as "light" | "dark" | "system");
												}}
											>
												<DropdownMenu.RadioItem value="light">
													<IconPlaceholder
														lucide="SunIcon"
														tabler="IconSun"
														hugeicons="SunIcon"
														phosphor="SunIcon"
													/>
													Light
												</DropdownMenu.RadioItem>
												<DropdownMenu.RadioItem value="dark">
													<IconPlaceholder
														lucide="MoonIcon"
														tabler="IconMoon"
														hugeicons="MoonIcon"
														phosphor="MoonIcon"
													/>
													Dark
												</DropdownMenu.RadioItem>
												<DropdownMenu.RadioItem value="system">
													<IconPlaceholder
														lucide="MonitorIcon"
														tabler="IconDeviceDesktop"
														hugeicons="ComputerIcon"
														phosphor="MonitorIcon"
													/>
													System
												</DropdownMenu.RadioItem>
											</DropdownMenu.RadioGroup>
										</DropdownMenu.Group>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="HelpCircleIcon"
									tabler="IconHelpCircle"
									hugeicons="HelpCircleIcon"
									phosphor="QuestionIcon"
								/>
								Help & Support
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="FileTextIcon"
									tabler="IconFileText"
									hugeicons="File01Icon"
									phosphor="FileTextIcon"
								/>
								Documentation
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item variant="destructive">
								<IconPlaceholder
									lucide="LogOutIcon"
									tabler="IconLogout"
									hugeicons="LogoutIcon"
									phosphor="SignOutIcon"
								/>
								Sign Out
								<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<form>
				<Field.Group>
					<div class="grid grid-cols-2 gap-4">
						<Field.Field>
							<Field.Label for="small-form-name">Name</Field.Label>
							<Input id="small-form-name" placeholder="Enter your name" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="small-form-role">Role</Field.Label>
							<Select.Root type="single" bind:value={role}>
								<Select.Trigger id="small-form-role">
									{roleLabel}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each roleItems as item (item.value)}
											<Select.Item value={item.value}
												>{item.label}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</Field.Field>
					</div>
					<Field.Field>
						<Field.Label for="small-form-framework">Framework</Field.Label>
						<Popover.Root bind:open={frameworkOpen}>
							<Popover.Trigger
								bind:ref={triggerRef}
								role="combobox"
								class={cn(
									buttonVariants({ variant: "outline" }),
									"w-full justify-between",
									!frameworkValue && "text-muted-foreground"
								)}
							>
								{selectedFramework || "Select a framework"}
								<IconPlaceholder
									lucide="ChevronDownIcon"
									tabler="IconSelector"
									hugeicons="UnfoldMoreIcon"
									phosphor="CaretDownIcon"
								/>
							</Popover.Trigger>
							<Popover.Content class="w-(--bits-popover-anchor-width) p-0">
								<Command.Root>
									<Command.Input autofocus placeholder="Search framework..." />
									<Command.Empty>No frameworks found.</Command.Empty>
									<Command.List>
										<Command.Group>
											{#each frameworks as framework (framework)}
												<Command.Item
													value={framework}
													data-checked={frameworkValue ===
														framework.toLowerCase()}
													onSelect={() => {
														frameworkValue = framework.toLowerCase();
														closeAndFocusTrigger();
													}}
												>
													{framework}
												</Command.Item>
											{/each}
										</Command.Group>
									</Command.List>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label for="small-form-comments">Comments</Field.Label>
						<Textarea
							id="small-form-comments"
							placeholder="Add any additional comments"
						/>
					</Field.Field>
					<Field.Field orientation="horizontal">
						<Button type="submit">Submit</Button>
						<Button variant="outline" type="button">Cancel</Button>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
</Example>
