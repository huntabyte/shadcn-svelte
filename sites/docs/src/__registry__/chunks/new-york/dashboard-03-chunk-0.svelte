<script lang="ts">
	import Rabbit from "lucide-svelte/icons/rabbit";
	import Bird from "lucide-svelte/icons/bird";
	import Turtle from "lucide-svelte/icons/turtle";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
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
				<Select.Root>
					<Select.Trigger
						id="model"
						class="items-start [&_[data-description]]:hidden"
					>
						<Select.Value placeholder="Select a model" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="genesis" label="Neural Genesis">
							<div class="text-muted-foreground flex items-start gap-3">
								<Rabbit class="size-5" />
								<div class="grid gap-0.5">
									<p>
										Neural
										<span class="text-foreground font-medium"> Genesis </span>
									</p>
									<p class="text-xs" data-description>
										Our fastest model for general use cases.
									</p>
								</div>
							</div>
						</Select.Item>
						<Select.Item value="explorer" label="Neural Explorer">
							<div class="text-muted-foreground flex items-start gap-3">
								<Bird class="size-5" />
								<div class="grid gap-0.5">
									<p>
										Neural
										<span class="text-foreground font-medium"> Explorer </span>
									</p>
									<p class="text-xs" data-description>
										Performance and speed for efficiency.
									</p>
								</div>
							</div>
						</Select.Item>
						<Select.Item value="quantum">
							<div class="text-muted-foreground flex items-start gap-3">
								<Turtle class="size-5" />
								<div class="grid gap-0.5">
									<p>
										Neural
										<span class="text-foreground font-medium"> Quantum </span>
									</p>
									<p class="text-xs" data-description>
										The most powerful model for complex computations.
									</p>
								</div>
							</div>
						</Select.Item>
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
				<Select.Root selected={{ value: "system", label: "System" }}>
					<Select.Trigger>
						<Select.Value placeholder="Select a role" />
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
