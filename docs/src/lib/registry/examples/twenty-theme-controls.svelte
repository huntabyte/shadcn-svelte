<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import MagnifyingGlassIcon from "@lucide/svelte/icons/search";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const modes = [
		{ name: "Light", class: "light" },
		{ name: "Dark", class: "dark" },
	];
	const plans = [
		{ value: "starter", label: "Starter" },
		{ value: "business", label: "Business" },
	];
</script>

<div class="grid w-full gap-4 md:grid-cols-2">
	{#each modes as mode (mode.name)}
		<div
			data-controls-panel={mode.name}
			class="theme-twenty style-ledger {mode.class} flex flex-col gap-3 rounded-lg border bg-background p-4 text-foreground"
		>
			<p class="text-xs text-muted-foreground">32 px, 8 px radius</p>
			<div class="flex gap-2" data-row="input">
				<Input aria-label="Name" placeholder="Name" />
				<Button>Save</Button>
			</div>
			<div class="flex gap-2" data-row="input-group">
				<InputGroup.Root>
					<InputGroup.Input aria-label="Search" placeholder="Search" />
					<InputGroup.Addon><MagnifyingGlassIcon /></InputGroup.Addon>
				</InputGroup.Root>
				<Button variant="outline">Find</Button>
			</div>
			<div class="flex gap-2" data-row="select">
				<Select.Root type="single" items={plans} value="business">
					<Select.Trigger aria-label="Plan" class="w-full">
						<Select.Value placeholder="Plan" />
					</Select.Trigger>
					<Select.Content>
						{#each plans as plan (plan.value)}
							<Select.Item value={plan.value} label={plan.label}>{plan.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<Button variant="outline" size="icon" aria-label="Add"><PlusIcon /></Button>
			</div>
			<div class="flex gap-2" data-row="native-select">
				<NativeSelect.Root aria-label="Status">
					<NativeSelect.Option value="todo">Todo</NativeSelect.Option>
					<NativeSelect.Option value="done">Done</NativeSelect.Option>
				</NativeSelect.Root>
				<Button variant="secondary">Apply</Button>
			</div>
			<Textarea aria-label="Note" placeholder="Note" rows={2} />
			<p class="text-xs text-muted-foreground">Small, 24 px</p>
			<div class="flex flex-wrap items-center gap-2" data-row="small">
				<Select.Root type="single" items={plans} value="starter">
					<Select.Trigger aria-label="Plan, small" size="sm" class="min-w-0 flex-1 basis-40">
						<Select.Value placeholder="Plan" />
					</Select.Trigger>
					<Select.Content>
						{#each plans as plan (plan.value)}
							<Select.Item value={plan.value} label={plan.label}>{plan.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<NativeSelect.Root aria-label="Status, small" size="sm" class="w-28 shrink-0">
					<NativeSelect.Option value="todo">Todo</NativeSelect.Option>
					<NativeSelect.Option value="done">Done</NativeSelect.Option>
				</NativeSelect.Root>
				<Button size="sm">Save</Button>
				<Button size="icon-sm" variant="outline" aria-label="Add"><PlusIcon /></Button>
			</div>
		</div>
	{/each}
</div>
