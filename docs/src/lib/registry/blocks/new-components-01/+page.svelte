<script lang="ts">
	import AppearanceSettings from "./components/appearance-settings.svelte";
	import ButtonGroupDemo from "./components/button-group-demo.svelte";
	import ButtonGroupInputGroup from "./components/button-group-input-group.svelte";
	import ButtonGroupNested from "./components/button-group-nested.svelte";
	import ButtonGroupPopover from "./components/button-group-popover.svelte";
	import EmptyAvatarGroup from "./components/empty-avatar-group.svelte";
	import FieldDemo from "./components/field-demo.svelte";
	import FieldSlider from "./components/field-slider.svelte";
	import InputGroupButtonExample from "./components/input-group-button.svelte";
	import InputGroupDemo from "./components/input-group-demo.svelte";
	import ItemDemo from "./components/item-demo.svelte";
	import NotionPromptForm from "./components/notion-prompt-form.svelte";
	import SpinnerBadge from "./components/spinner-badge.svelte";
	import SpinnerEmpty from "./components/spinner-empty.svelte";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
	<div class="flex flex-col justify-center">
		<div
			class="theme-container mx-auto grid max-w-[2200px] gap-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-3 xl:grid-cols-4"
		>
			<div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
				<FieldDemo />
			</div>
			<div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
				<div class="*:[div]:border">
					<EmptyAvatarGroup />
				</div>
				<ButtonGroupInputGroup />
				<FieldSlider />
				<InputGroupDemo />
			</div>
			<div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
				<ItemDemo />
				<Field.Separator>Appearance Settings</Field.Separator>
				<AppearanceSettings />
			</div>
			<div
				class="order-first flex flex-col gap-6 min-[1400px]:order-last *:[div]:w-full *:[div]:max-w-full"
			>
				<div class="flex gap-2">
					<SpinnerBadge />
				</div>
				<InputGroupButtonExample />
				<NotionPromptForm />
				<ButtonGroupDemo />
				<div class="flex gap-6">
					<Field.Label for="checkbox-demo">
						<Field.Field orientation="horizontal">
							<Checkbox id="checkbox-demo" checked />
							<Field.Label for="checkbox-demo" class="line-clamp-1">
								I agree to the terms and conditions
							</Field.Label>
						</Field.Field>
					</Field.Label>
				</div>
				<div class="flex gap-4">
					<ButtonGroupNested />
					<ButtonGroupPopover />
				</div>
				<div class="*:[div]:border">
					<SpinnerEmpty />
				</div>
			</div>
		</div>
	</div>
</Tooltip.Provider>
