<script lang="ts">
	import MinusIcon from "@tabler/icons-svelte/icons/minus";
	import PlusIcon from "@tabler/icons-svelte/icons/plus";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";

	import { Switch } from "$lib/registry/ui/switch/index.js";

	const accents = [
		{
			name: "Blue",
			value: "blue",
		},
		{
			name: "Amber",
			value: "amber",
		},
		{
			name: "Green",
			value: "green",
		},
		{
			name: "Rose",
			value: "rose",
		},
	];
</script>

<Field.Set>
	<Field.Group>
		<Field.Set>
			<Field.Legend>Compute Environment</Field.Legend>
			<Field.Description>Select the compute environment for your cluster.</Field.Description>
			<RadioGroup.Root value="kubernetes">
				<Field.Label for="kubernetes-r2h">
					<Field.Field orientation="horizontal">
						<Field.Content>
							<Field.Title>Kubernetes</Field.Title>
							<Field.Description>
								Run GPU workloads on a K8s configured cluster. This is the default.
							</Field.Description>
						</Field.Content>
						<RadioGroup.Item value="kubernetes" id="kubernetes-r2h" />
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
						<RadioGroup.Item value="vm" id="vm-z4k" />
					</Field.Field>
				</Field.Label>
			</RadioGroup.Root>
		</Field.Set>
		<Field.Separator />
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Title>Accent</Field.Title>
				<Field.Description>Select the accent color to use.</Field.Description>
			</Field.Content>
			<Field.Set aria-label="Accent">
				<RadioGroup.Root class="flex flex-wrap gap-2" value="blue">
					{#each accents as accent (accent.value)}
						<Label
							for={accent.value}
							data-theme={accent.value}
							class="flex size-6 items-center justify-center rounded-full data-[theme=amber]:bg-amber-600 data-[theme=blue]:bg-blue-700 data-[theme=green]:bg-green-600 data-[theme=rose]:bg-rose-600"
						>
							<RadioGroup.Item
								id={accent.value}
								value={accent.value}
								aria-label={accent.name}
								class="peer sr-only"
							/>
							<CheckIcon
								class="hidden size-4 stroke-white peer-data-[state=checked]:block"
							/>
						</Label>
					{/each}
				</RadioGroup.Root>
			</Field.Set>
		</Field.Field>
		<Field.Separator />
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="number-of-gpus-f6l">Number of GPUs</Field.Label>
				<Field.Description>You can add more later.</Field.Description>
			</Field.Content>
			<ButtonGroup.Root>
				<Input
					id="number-of-gpus-f6l"
					placeholder="8"
					size={3}
					class="h-8 !w-14 font-mono"
					maxlength={3}
				/>
				<Button variant="outline" size="icon-sm" type="button">
					<MinusIcon />
				</Button>
				<Button variant="outline" size="icon-sm" type="button">
					<PlusIcon />
				</Button>
			</ButtonGroup.Root>
		</Field.Field>
		<Field.Separator />
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="tinting">Wallpaper Tinting</Field.Label>
				<Field.Description>Allow the wallpaper to be tinted.</Field.Description>
			</Field.Content>
			<Switch id="tinting" checked />
		</Field.Field>
	</Field.Group>
</Field.Set>
