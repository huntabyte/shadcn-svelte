<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let brightness = $state(75);
	let temperature = $state([0.3, 0.7]);
	let priceRange = $state([25, 75]);
	let colorBalance = $state([10, 20, 70]);
</script>

<Example title="Slider Fields">
	<Field.Group>
		<Field.Field>
			<Field.Label for="slider-volume">Volume</Field.Label>
			<Slider type="single" id="slider-volume" value={50} max={100} step={1} />
		</Field.Field>
		<Field.Field>
			<Field.Label for="slider-brightness">Screen Brightness</Field.Label>
			<Slider
				type="single"
				id="slider-brightness"
				bind:value={brightness}
				max={100}
				step={5}
			/>
			<Field.Description>Current brightness: {brightness}%</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="slider-quality">Video Quality</Field.Label>
			<Field.Description>Higher quality uses more bandwidth.</Field.Description>
			<Slider type="single" id="slider-quality" value={720} max={1080} min={360} step={360} />
		</Field.Field>
		<Field.Field>
			<Field.Label for="slider-temperature">Temperature Range</Field.Label>
			<Slider
				type="multiple"
				id="slider-temperature"
				bind:value={temperature}
				min={0}
				max={1}
				step={0.1}
			/>
			<Field.Description>
				Range: {temperature[0].toFixed(1)} - {temperature[1].toFixed(1)}
			</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="slider-price-range">Price Range</Field.Label>
			<Slider
				type="multiple"
				id="slider-price-range"
				bind:value={priceRange}
				max={100}
				step={5}
			/>
			<Field.Description>${priceRange[0]} - ${priceRange[1]}</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="slider-color-balance">Color Balance</Field.Label>
			<Slider
				type="multiple"
				id="slider-color-balance"
				bind:value={colorBalance}
				max={100}
				step={10}
			/>
			<Field.Description>
				Red: {colorBalance[0]}%, Green: {colorBalance[1]}%, Blue: {colorBalance[2]}%
			</Field.Description>
		</Field.Field>
		<Field.Field data-invalid>
			<Field.Label for="slider-invalid">Invalid Slider</Field.Label>
			<Slider type="single" id="slider-invalid" value={40} max={100} aria-invalid />
			<Field.Description>This slider has validation errors.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled>
			<Field.Label for="slider-disabled-field">Disabled Slider</Field.Label>
			<Slider type="single" id="slider-disabled-field" value={50} max={100} disabled />
			<Field.Description>This slider is currently disabled.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
