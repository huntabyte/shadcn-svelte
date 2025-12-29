<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	let mode = $state("auto");
	let model = $state("gpt-5.1");
</script>

<Example title="Model Selector">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}>
			ChatGPT 5.1
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				class="text-muted-foreground size-4"
			/>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-60" align="start">
			<DropdownMenu.Group>
				<DropdownMenu.Label class="text-muted-foreground text-xs font-normal">
					GPT-5.1
				</DropdownMenu.Label>
				<DropdownMenu.RadioGroup bind:value={mode}>
					<DropdownMenu.RadioItem value="auto">
						<Item.Root size="xs" class="p-0">
							<Item.Content>
								<Item.Title>Auto</Item.Title>
								<Item.Description class="text-xs">
									Decides how long to think
								</Item.Description>
							</Item.Content>
						</Item.Root>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="instant">
						<Item.Root size="xs" class="p-0">
							<Item.Content>
								<Item.Title>Instant</Item.Title>
								<Item.Description class="text-xs">
									Answers right away
								</Item.Description>
							</Item.Content>
						</Item.Root>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="thinking">
						<Item.Root size="xs" class="p-0">
							<Item.Content>
								<Item.Title>Thinking</Item.Title>
								<Item.Description class="text-xs">
									Thinks longer for better answers
								</Item.Description>
							</Item.Content>
						</Item.Root>
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<span class="font-medium">Legacy models</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.Portal>
					<DropdownMenu.SubContent>
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup bind:value={model}>
								<DropdownMenu.RadioItem value="gpt-4">GPT-4</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="gpt-4-turbo"
									>GPT-4 Turbo</DropdownMenu.RadioItem
								>
								<DropdownMenu.RadioItem value="gpt-3.5"
									>GPT-3.5</DropdownMenu.RadioItem
								>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.SubContent>
				</DropdownMenu.Portal>
			</DropdownMenu.Sub>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
