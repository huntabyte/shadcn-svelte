<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let dictateEnabled = $state(false);
</script>

<Example title="Prompt Form">
	<Field.Field>
		<Field.Label for="prompt" class="sr-only">Prompt</Field.Label>
		<InputGroup.Root>
			<InputGroup.Textarea id="prompt" placeholder="Ask anything" />
			<InputGroup.Addon align="block-end">
				<Tooltip.Root>
					<DropdownMenu.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<DropdownMenu.Trigger>
									{#snippet child({ props: triggerProps })}
										<InputGroup.Button
											variant="ghost"
											size="icon-sm"
											onclick={() => (dictateEnabled = !dictateEnabled)}
											class="rounded-4xl"
											{...props}
											{...triggerProps}
										>
											<IconPlaceholder
												lucide="PlusIcon"
												tabler="IconPlus"
												hugeicons="PlusSignIcon"
												phosphor="PlusIcon"
											/>
										</InputGroup.Button>
									{/snippet}
								</DropdownMenu.Trigger>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							Add files and more <Kbd.Root>/</Kbd.Root>
						</Tooltip.Content>
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="PaperclipIcon"
										tabler="IconPaperclip"
										hugeicons="AttachmentIcon"
										phosphor="PaperclipIcon"
									/>
									Add photos & files
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="SparklesIcon"
										tabler="IconSparkles"
										hugeicons="SparklesIcon"
										phosphor="SparkleIcon"
									/>
									Deep research
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="ShoppingBagIcon"
										tabler="IconShoppingBag"
										hugeicons="ShoppingBag01Icon"
										phosphor="BagIcon"
									/>
									Shopping research
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="WandIcon"
										tabler="IconWand"
										hugeicons="MagicWand05Icon"
										phosphor="MagicWandIcon"
									/>
									Create image
								</DropdownMenu.Item>
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props })}
											<DropdownMenu.Item {...props}>
												<IconPlaceholder
													lucide="MousePointerIcon"
													tabler="IconPointer"
													hugeicons="Cursor01Icon"
													phosphor="HandPointingIcon"
												/>
												Agent mode
											</DropdownMenu.Item>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Content side="right">
										<div class="font-medium">35 left</div>
										<div class="text-primary-foreground/80 text-xs">
											More available for purchase
										</div>
									</Tooltip.Content>
								</Tooltip.Root>
							</DropdownMenu.Group>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<IconPlaceholder
										lucide="MoreHorizontalIcon"
										tabler="IconDots"
										hugeicons="MoreHorizontalCircle01Icon"
										phosphor="DotsThreeOutlineIcon"
									/>
									More
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent>
										<DropdownMenu.Group>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="ShareIcon"
													tabler="IconShare"
													hugeicons="Share03Icon"
													phosphor="ShareIcon"
												/>
												Add sources
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="BookOpenIcon"
													tabler="IconBook"
													hugeicons="BookIcon"
													phosphor="BookOpenIcon"
												/>
												Study and learn
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="GlobeIcon"
													tabler="IconWorld"
													hugeicons="GlobalIcon"
													phosphor="GlobeIcon"
												/>
												Web search
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="PenToolIcon"
													tabler="IconPencil"
													hugeicons="PenIcon"
													phosphor="PencilIcon"
												/>
												Canvas
											</DropdownMenu.Item>
										</DropdownMenu.Group>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button
								variant="ghost"
								size="icon-sm"
								onclick={() => (dictateEnabled = !dictateEnabled)}
								class="ml-auto rounded-4xl"
								{...props}
							>
								<IconPlaceholder
									lucide="AudioLinesIcon"
									tabler="IconMicrophone"
									hugeicons="AudioWave01Icon"
									phosphor="MicrophoneIcon"
								/>
							</InputGroup.Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Dictate</Tooltip.Content>
				</Tooltip.Root>
				<InputGroup.Button size="icon-sm" variant="default" class="rounded-4xl">
					<IconPlaceholder
						lucide="ArrowUpIcon"
						tabler="IconArrowUp"
						hugeicons="ArrowUp02Icon"
						phosphor="ArrowUpIcon"
					/>
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</Field.Field>
</Example>
