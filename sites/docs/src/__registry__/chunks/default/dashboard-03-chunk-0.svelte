<script lang="ts">
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import * as Select from "$lib/registry/default/ui/select/index.js";
</script>

<div
	class="relative hidden flex-col items-start gap-8 md:flex"
	data-x-chunk-name="dashboard-03-chunk-0"
	data-x-chunk-description="A settings form a configuring an AI model and messages."
>
	<form class="grid w-full items-start gap-6">
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
			<div class="grid gap-3">
				<Label for="model">Model</Label>
				<Select.Root type="single" items={models} bind:value={model}>
					<Select.Trigger
						id="model"
						class="items-start [&_[data-description]]:hidden"
					>
						{#if selectedModel}
							{@render ModelItemContent(selectedModel)}
						{:else}
							Select a model
						{/if}
					</Select.Trigger>
					<Select.Content>
						{#each models as model}
							<Select.Item value={model.value} label={model.label}>
								{@render ModelItemContent(model)}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="temperature">Temperature</Label>
				<Input id="temperature" type="number" placeholder="0.4" />
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="grid gap-3">
					<Label for="top-p">Top P</Label>
					<Input id="top-p" type="number" placeholder="0.7" />
				</div>
				<div class="grid gap-3">
					<Label for="top-k">Top K</Label>
					<Input id="top-k" type="number" placeholder="0.0" />
				</div>
			</div>
		</fieldset>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Messages </legend>
			<div class="grid gap-3">
				<Label for="role">Role</Label>
				<Select.Root type="single" bind:value={role}>
					<Select.Trigger class="capitalize">
						{role ?? "Select a role"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="system">System</Select.Item>
						<Select.Item value="user">User</Select.Item>
						<Select.Item value="assistant">Assistant</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="content">Content</Label>
				<Textarea
					id="content"
					placeholder="You are a..."
					class="min-h-[9.5rem]"
				/>
			</div>
		</fieldset>
	</form>
</div>
