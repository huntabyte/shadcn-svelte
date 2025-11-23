<script lang="ts">
	import {
		FieldSliderDemo,
		ButtonGroupInputGroupDemo,
		SpinnerBadgeDemo,
		InputGroupDemo,
		EmptyAvatarGroupDemo,
		FieldDemo,
		ButtonGroupDemo,
		SpinnerEmptyDemo,
		ButtonGroupPopoverDemo,
	} from "$lib/registry/examples/index.js";
	import { FieldSeparator } from "$lib/registry/ui/field/index.js";
	import AppearanceSettings from "./appearance-settings.svelte";
	import FieldCheckbox from "./field-checkbox.svelte";
	import FieldHear from "./field-hear.svelte";
	import InputGroupButtonDemo from "./input-group-button-demo.svelte";
	import ItemDemo from "./item-demo.svelte";
	import Nested from "./nested.svelte";
	import NotionPromptForm from "./notion-prompt-form.svelte";
</script>

<div
	class="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8"
>
	<div class="*:[div]:w-full *:[div]:max-w-full flex flex-col gap-6">
		<div class="border-border rounded-lg border p-6">
			<FieldDemo />
		</div>
	</div>
	<div class="*:[div]:w-full *:[div]:max-w-full flex flex-col gap-6">
		<div class="border-border rounded-lg border p-6">
			<EmptyAvatarGroupDemo />
		</div>
		<SpinnerBadgeDemo />
		<ButtonGroupInputGroupDemo />
		<FieldSliderDemo />
		<InputGroupDemo />
	</div>
	<div class="*:[div]:w-full *:[div]:max-w-full flex flex-col gap-6">
		<InputGroupButtonDemo />
		<ItemDemo />
		<FieldSeparator>Appearance Settings</FieldSeparator>
		<AppearanceSettings />
	</div>
	<div
		class="*:[div]:w-full *:[div]:max-w-full order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex"
	>
		<NotionPromptForm />
		<ButtonGroupDemo />
		<FieldCheckbox />
		<div class="flex justify-between gap-4">
			<Nested />
			<ButtonGroupPopoverDemo />
		</div>
		<FieldHear />
		<div class="border-border rounded-lg border border-dashed p-6">
			<SpinnerEmptyDemo />
		</div>
	</div>
</div>
