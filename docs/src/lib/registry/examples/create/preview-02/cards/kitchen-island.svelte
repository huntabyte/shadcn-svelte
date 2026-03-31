<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	type ScenePreset = {
		brightness: number[];
		colorTemp: number[];
		volume: number[];
		fade: number[];
	};
	const SCENES: Record<string, ScenePreset> = {
		cooking: { brightness: [90], colorTemp: [70], volume: [30], fade: [0] },
		dining: { brightness: [50], colorTemp: [40], volume: [20], fade: [60] },
		nightlight: { brightness: [15], colorTemp: [20], volume: [0], fade: [80] },
		focus: { brightness: [100], colorTemp: [85], volume: [0], fade: [0] },
	};

	let enabled = $state(true);
	let scene = $state("cooking");
	let brightness = $state([90]);
	let colorTemp = $state([70]);
	let volume = $state([30]);
	let fade = $state([0]);

	function onSceneChange(value: string) {
		const preset = SCENES[value];
		if (!preset) return;
		brightness = [...preset.brightness];
		colorTemp = [...preset.colorTemp];
		volume = [...preset.volume];
		fade = [...preset.fade];
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Kitchen Island</Card.Title>
		<Card.Description>Hue Color Ambient</Card.Description>
		<Card.Action>
			<Switch bind:checked={enabled} />
		</Card.Action>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<span class="sr-only">Scenes</span>
			<ToggleGroup.Root
				type="single"
				bind:value={scene}
				onValueChange={onSceneChange}
				variant="outline"
				spacing={1}
				class="flex-wrap"
			>
				<ToggleGroup.Item value="cooking" disabled={!enabled}>Cooking</ToggleGroup.Item>
				<ToggleGroup.Item value="dining" disabled={!enabled}>Dining</ToggleGroup.Item>
				<ToggleGroup.Item value="nightlight" disabled={!enabled}
					>Nightlight</ToggleGroup.Item
				>
				<ToggleGroup.Item value="focus" disabled={!enabled}>Focus</ToggleGroup.Item>
			</ToggleGroup.Root>
		</div>
		<Item.Group>
			<Item.Root size="sm" variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="SunIcon"
						tabler="IconSun"
						hugeicons="Sun03Icon"
						phosphor="SunIcon"
						remixicon="RiSunLine"
					/>
				</Item.Media>
				<Item.Content class="flex-row items-center gap-3">
					<Item.Title class="shrink-0">Brightness</Item.Title>
				</Item.Content>
				<Item.Actions class="flex-1">
					<Slider
						type="multiple"
						bind:value={brightness}
						max={100}
						disabled={!enabled}
						class="w-full"
					/>
				</Item.Actions>
			</Item.Root>
			<Item.Root size="sm" variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="ThermometerIcon"
						tabler="IconThermometer"
						hugeicons="ThermometerWarmIcon"
						phosphor="ThermometerIcon"
						remixicon="RiThermometerLine"
					/>
				</Item.Media>
				<Item.Content class="flex-row items-center gap-3">
					<Item.Title class="shrink-0">Color Temp</Item.Title>
				</Item.Content>
				<Item.Actions class="flex-1">
					<Slider type="multiple" bind:value={colorTemp} max={100} disabled={!enabled} />
				</Item.Actions>
			</Item.Root>
			<Item.Root size="sm" variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="Volume2Icon"
						tabler="IconVolume"
						hugeicons="VolumeHighIcon"
						phosphor="SpeakerHighIcon"
						remixicon="RiVolumeUpLine"
					/>
				</Item.Media>
				<Item.Content class="flex-row items-center gap-3">
					<Item.Title class="shrink-0">Volume</Item.Title>
				</Item.Content>
				<Item.Actions class="flex-1">
					<Slider type="multiple" bind:value={volume} max={100} disabled={!enabled} />
				</Item.Actions>
			</Item.Root>
			<Item.Root size="sm" variant="outline">
				<Item.Media variant="icon">
					<IconPlaceholder
						lucide="TimerIcon"
						tabler="IconClock"
						hugeicons="Clock03Icon"
						phosphor="TimerIcon"
						remixicon="RiTimerLine"
					/>
				</Item.Media>
				<Item.Content class="flex-row items-center gap-3">
					<Item.Title class="shrink-0">Fade</Item.Title>
				</Item.Content>
				<Item.Actions class="flex-1">
					<Slider type="multiple" bind:value={fade} max={100} disabled={!enabled} />
				</Item.Actions>
			</Item.Root>
		</Item.Group>
	</Card.Content>
</Card.Root>
