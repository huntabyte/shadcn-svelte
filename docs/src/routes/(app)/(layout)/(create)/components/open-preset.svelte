<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { cn } from "$lib/utils.js";
	import { isPresetCode } from "shadcn-svelte/preset";

	type Props = {
		class?: string;
		label?: string;
	};

	let { class: className, label = "Open Preset" }: Props = $props();

	const designSystem = useDesignSystem();

	let open = $state(false);
	let input = $state("");

	const PRESET_FLAG_PATTERN = /^--preset\b\s+(.+)$/i;

	const nextPreset = $derived.by(() => {
		const trimmed = input.trim();
		if (!trimmed) return null;
		const preset = trimmed.match(PRESET_FLAG_PATTERN)?.[1]?.trim() ?? trimmed;
		return isPresetCode(preset) ? preset : null;
	});

	const isInvalid = $derived(input.trim().length > 0 && nextPreset === null);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!nextPreset) return;
		designSystem.preset = nextPreset;
		open = false;
	}

	$effect(() => {
		if (!open) input = "";
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={cn(
			"hover:bg-muted! touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none pointer-coarse:h-10!",
			className
		)}
	>
		{#snippet child({ props })}
			<Button {...props} variant="outline">{label}</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="dark">
		<form onsubmit={handleSubmit}>
			<Dialog.Header>
				<Dialog.Title>Open Preset</Dialog.Title>
				<Dialog.Description>
					Paste a preset code to load a saved configuration.
				</Dialog.Description>
			</Dialog.Header>
			<div class="py-4">
				<Field.Field data-invalid={isInvalid || undefined}>
					<Field.Label for="preset-code" class="sr-only">Preset code</Field.Label>
					<Field.Content>
						<Input
							id="preset-code"
							bind:value={input}
							placeholder="b2D0wqNxT or --preset b2D0wqNxT"
							autocapitalize="none"
							autocorrect="off"
							spellcheck={false}
							aria-invalid={isInvalid}
							class="h-10 md:h-8"
						/>
					</Field.Content>
				</Field.Field>
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} variant="outline" type="button">Cancel</Button>
					{/snippet}
				</Dialog.Close>
				<Button type="submit" disabled={!nextPreset}>Open</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
