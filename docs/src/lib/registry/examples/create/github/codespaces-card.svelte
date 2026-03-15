<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let isCreatingCodespace = $state(false);
</script>

<Example title="Codespaces" class="min-h-[550px] lg:p-12">
	<Card.Root class="mx-auto w-full max-w-sm" size="sm">
		<Card.Content>
			<Tabs.Root value="codespaces">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="codespaces">Codespaces</Tabs.Trigger>
					<Tabs.Trigger value="local">Local</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="codespaces">
					<Item.Root size="sm" class="px-1 pt-2">
						<Item.Content>
							<Item.Title>Codespaces</Item.Title>
							<Item.Description>Your workspaces in the cloud</Item.Description>
						</Item.Content>
						<Item.Actions>
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button variant="ghost" size="icon-sm" {...props}>
											<IconPlaceholder
												lucide="PlusIcon"
												tabler="IconPlus"
												hugeicons="PlusSignIcon"
												phosphor="PlusIcon"
												remixicon="RiAddLine"
											/>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="bottom">
									Create a codespace on main
								</Tooltip.Content>
							</Tooltip.Root>
							<DropdownMenu.Root>
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props })}
											<DropdownMenu.Trigger {...props}>
												{#snippet child({ props: triggerProps })}
													<Button
														variant="ghost"
														size="icon-sm"
														{...triggerProps}
													>
														<IconPlaceholder
															lucide="MoreHorizontalIcon"
															tabler="IconDots"
															hugeicons="MoreHorizontalCircle01Icon"
															phosphor="DotsThreeOutlineIcon"
															remixicon="RiMoreLine"
														/>
													</Button>
												{/snippet}
											</DropdownMenu.Trigger>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Content side="bottom">
										Codespace repository configuration
									</Tooltip.Content>
								</Tooltip.Root>
								<DropdownMenu.Content align="end" class="w-56">
									<DropdownMenu.Group>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="PlusIcon"
												tabler="IconPlus"
												hugeicons="PlusSignIcon"
												phosphor="PlusIcon"
												remixicon="RiAddLine"
											/>
											New with options...
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="ContainerIcon"
												tabler="IconBox"
												hugeicons="CubeIcon"
												phosphor="CubeIcon"
												remixicon="RiBox1Line"
											/>
											Configure dev container
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="ZapIcon"
												tabler="IconBolt"
												hugeicons="ZapIcon"
												phosphor="LightningIcon"
												remixicon="RiFlashlightLine"
											/>
											Set up prebuilds
										</DropdownMenu.Item>
									</DropdownMenu.Group>
									<DropdownMenu.Separator />
									<DropdownMenu.Group>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="ServerIcon"
												tabler="IconServer"
												hugeicons="ServerStackIcon"
												phosphor="HardDrivesIcon"
												remixicon="RiServerLine"
											/>
											Manage codespaces
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="ShareIcon"
												tabler="IconShare2"
												hugeicons="Share03Icon"
												phosphor="ShareIcon"
												remixicon="RiShareLine"
											/>
											Share deep link
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<IconPlaceholder
												lucide="InfoIcon"
												tabler="IconInfoCircle"
												hugeicons="AlertCircleIcon"
												phosphor="InfoIcon"
												remixicon="RiInformationLine"
											/>
											What are codespaces?
										</DropdownMenu.Item>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Item.Actions>
					</Item.Root>
					<Separator class="-mx-2 my-2 w-auto!" />
					<Empty.Root class="p-4">
						<Empty.Header>
							<Empty.Media variant="icon">
								<IconPlaceholder
									lucide="ServerIcon"
									tabler="IconServer"
									hugeicons="ServerStackIcon"
									phosphor="HardDrivesIcon"
									remixicon="RiServerLine"
								/>
							</Empty.Media>
							<Empty.Title>No codespaces</Empty.Title>
							<Empty.Description>
								You don&apos;t have any codespaces with this repository checked out
							</Empty.Description>
						</Empty.Header>
						<Empty.Content>
							<Button
								size="sm"
								onclick={() => {
									isCreatingCodespace = true;
									setTimeout(() => {
										isCreatingCodespace = false;
									}, 2000);
								}}
								disabled={isCreatingCodespace}
							>
								{#if isCreatingCodespace}
									<Spinner data-icon="inline-start" />
								{/if}
								Create Codespace
							</Button>
							<a
								href="#learn-more"
								class="text-muted-foreground text-xs underline underline-offset-4"
							>
								Learn more about codespaces
							</a>
						</Empty.Content>
					</Empty.Root>
					<Separator class="-mx-2 my-2 w-auto!" />
					<div class="text-muted-foreground p-1.5 text-xs">
						Codespace usage for this repository is paid for by
						<span class="font-medium">shadcn</span>.
					</div>
				</Tabs.Content>
				<Tabs.Content value="local">
					<Item.Root size="sm" class="hidden p-0">
						<Item.Content>
							<Item.Title class="gap-2">
								<IconPlaceholder
									lucide="TerminalIcon"
									tabler="IconTerminal"
									hugeicons="ComputerTerminal01Icon"
									phosphor="TerminalIcon"
									remixicon="RiTerminalBoxLine"
									class="size-4"
								/>
								Clone
							</Item.Title>
						</Item.Content>
						<Item.Actions>
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button variant="ghost" size="icon" {...props}>
											<IconPlaceholder
												lucide="InfoIcon"
												tabler="IconInfoCircle"
												hugeicons="AlertCircleIcon"
												phosphor="InfoIcon"
												remixicon="RiInformationLine"
											/>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="left">
									Which remote URL should I use?
								</Tooltip.Content>
							</Tooltip.Root>
						</Item.Actions>
					</Item.Root>
					<Tabs.Root value="https">
						<Tabs.List
							variant="line"
							class="w-full justify-start border-b *:[button]:flex-0"
						>
							<Tabs.Trigger value="https">HTTPS</Tabs.Trigger>
							<Tabs.Trigger value="ssh">SSH</Tabs.Trigger>
							<Tabs.Trigger value="cli">GitHub CLI</Tabs.Trigger>
						</Tabs.List>
						<div class="bg-muted/30 rounded-md border p-2">
							<Tabs.Content value="https">
								<Field.Field class="gap-2">
									<Field.Label for="https-url" class="sr-only">
										HTTPS URL
									</Field.Label>
									<InputGroup.Root>
										<InputGroup.Addon align="inline-end">
											<InputGroup.Button variant="ghost" size="icon-xs">
												<IconPlaceholder
													lucide="CopyIcon"
													tabler="IconCopy"
													hugeicons="Copy01Icon"
													phosphor="CopyIcon"
													remixicon="RiFileCopyLine"
												/>
											</InputGroup.Button>
										</InputGroup.Addon>
										<InputGroup.Input
											id="https-url"
											value="https://github.com/shadcn-ui/ui.git"
											readonly
										/>
									</InputGroup.Root>
									<Field.Description>Clone using the web URL.</Field.Description>
								</Field.Field>
							</Tabs.Content>
							<Tabs.Content value="ssh">
								<Field.Field class="gap-2">
									<Field.Label for="ssh-url" class="sr-only">SSH URL</Field.Label>
									<InputGroup.Root>
										<InputGroup.Addon align="inline-end">
											<InputGroup.Button variant="ghost" size="icon-xs">
												<IconPlaceholder
													lucide="CopyIcon"
													tabler="IconCopy"
													hugeicons="Copy01Icon"
													phosphor="CopyIcon"
													remixicon="RiFileCopyLine"
												/>
											</InputGroup.Button>
										</InputGroup.Addon>
										<InputGroup.Input
											id="ssh-url"
											value="git@github.com:shadcn-ui/ui.git"
											readonly
										/>
									</InputGroup.Root>
									<Field.Description>
										Use a password-protected SSH key.
									</Field.Description>
								</Field.Field>
							</Tabs.Content>
							<Tabs.Content value="cli">
								<Field.Field class="gap-2">
									<Field.Label for="cli-command" class="sr-only">
										CLI Command
									</Field.Label>
									<InputGroup.Root>
										<InputGroup.Addon align="inline-end">
											<InputGroup.Button variant="ghost" size="icon-xs">
												<IconPlaceholder
													lucide="CopyIcon"
													tabler="IconCopy"
													hugeicons="Copy01Icon"
													phosphor="CopyIcon"
													remixicon="RiFileCopyLine"
												/>
											</InputGroup.Button>
										</InputGroup.Addon>
										<InputGroup.Input
											id="cli-command"
											value="gh repo clone shadcn-ui/ui"
											readonly
										/>
									</InputGroup.Root>
									<Field.Description>
										Work fast with our official CLI.
										<a href="#learn-more">Learn more</a>
									</Field.Description>
								</Field.Field>
							</Tabs.Content>
						</div>
					</Tabs.Root>
					<Separator class="-mx-2 my-2 w-auto!" />
					<div class="flex flex-col">
						<Button variant="ghost" size="sm" class="justify-start gap-1.5">
							<IconPlaceholder
								lucide="MonitorIcon"
								tabler="IconDeviceDesktop"
								hugeicons="ComputerIcon"
								phosphor="MonitorIcon"
								remixicon="RiComputerLine"
								data-icon="inline-start"
							/>
							Open with GitHub Desktop
						</Button>
						<Button variant="ghost" size="sm" class="justify-start gap-1.5">
							<IconPlaceholder
								lucide="DownloadIcon"
								tabler="IconDownload"
								hugeicons="DownloadIcon"
								phosphor="DownloadIcon"
								remixicon="RiDownloadLine"
								data-icon="inline-start"
							/>
							Download ZIP
						</Button>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</Example>
