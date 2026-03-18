<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let gpuCount = $state(8);
	let value = $state([200, 800]);

	function handleGpuAdjustment(adjustment: number) {
		gpuCount = Math.max(1, Math.min(99, gpuCount + adjustment));
	}

	function handleGpuInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseInt(target.value, 10);
		if (!isNaN(val) && val >= 1 && val <= 99) {
			gpuCount = val;
		}
	}
</script>

<Example title="Fields">
	<Field.Set class="w-full max-w-md">
		<Field.Group>
			<Field.Set>
				<Field.Legend>Compute Environment</Field.Legend>
				<Field.Description
					>Select the compute environment for your cluster.</Field.Description
				>
				<RadioGroup.Root value="kubernetes">
					<Field.Label for="kubernetes-r2h">
						<Field.Field orientation="horizontal">
							<Field.Content>
								<Field.Title>Kubernetes</Field.Title>
								<Field.Description>
									Run GPU workloads on a K8s configured cluster. This is the
									default.
								</Field.Description>
							</Field.Content>
							<RadioGroup.Item
								value="kubernetes"
								id="kubernetes-r2h"
								aria-label="Kubernetes"
							/>
						</Field.Field>
					</Field.Label>
					<Field.Label for="vm-z4k">
						<Field.Field orientation="horizontal">
							<Field.Content>
								<Field.Title>Virtual Machine</Field.Title>
								<Field.Description>
									Access a VM configured cluster to run workloads. (Coming soon)
								</Field.Description>
							</Field.Content>
							<RadioGroup.Item value="vm" id="vm-z4k" aria-label="Virtual Machine" />
						</Field.Field>
					</Field.Label>
				</RadioGroup.Root>
			</Field.Set>
			<Field.Separator />
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Label for="number-of-gpus-f6l">Number of GPUs</Field.Label>
					<Field.Description>You can add more later.</Field.Description>
				</Field.Content>
				<ButtonGroup.Root>
					<Input
						id="number-of-gpus-f6l"
						value={gpuCount}
						oninput={handleGpuInputChange}
						size={3}
						maxlength={3}
					/>
					<Button
						variant="outline"
						size="icon"
						type="button"
						aria-label="Decrement"
						onclick={() => handleGpuAdjustment(-1)}
						disabled={gpuCount <= 1}
					>
						<IconPlaceholder
							lucide="MinusIcon"
							tabler="IconMinus"
							hugeicons="MinusSignIcon"
							phosphor="MinusIcon"
							remixicon="RiSubtractLine"
						/>
					</Button>
					<Button
						variant="outline"
						size="icon"
						type="button"
						aria-label="Increment"
						onclick={() => handleGpuAdjustment(1)}
						disabled={gpuCount >= 99}
					>
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="PlusSignIcon"
							phosphor="PlusIcon"
							remixicon="RiAddLine"
						/>
					</Button>
				</ButtonGroup.Root>
			</Field.Field>
			<Field.Separator />
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Label for="tinting">Wallpaper Tinting</Field.Label>
					<Field.Description>Allow the wallpaper to be tinted.</Field.Description>
				</Field.Content>
				<Switch id="tinting" checked={true} />
			</Field.Field>
			<Field.Separator />
			<Field.Label for="checkbox-demo">
				<Field.Field orientation="horizontal">
					<Checkbox id="checkbox-demo" checked={true} />
					<Field.Label for="checkbox-demo" class="line-clamp-1">
						I agree to the terms and conditions
					</Field.Label>
				</Field.Field>
			</Field.Label>
			<Field.Field>
				<Field.Title>Price Range</Field.Title>
				<Field.Description>
					Set your budget range ($
					<span class="font-medium tabular-nums">{value[0]}</span> -
					<span class="font-medium tabular-nums">{value[1]}</span>).
				</Field.Description>
				<Slider
					type="multiple"
					bind:value
					max={1000}
					min={0}
					step={10}
					class="mt-2 w-full"
					aria-label="Price Range"
				/>
			</Field.Field>
			<Field.Field orientation="horizontal">
				<Button type="submit">Submit</Button>
				<Button variant="outline" type="button">Cancel</Button>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</Example>
