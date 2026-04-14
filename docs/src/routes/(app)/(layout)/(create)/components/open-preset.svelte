<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { cn } from "$lib/utils.js";
	import { decodePreset } from "shadcn-svelte/preset";

	type Props = {
		class?: string;
		label?: string;
	};

	let { class: className, label = "Open" }: Props = $props();

	const PRESET_TITLE = "Open Preset";
	const PRESET_DESCRIPTION = "Paste a preset code to load a saved configuration.";
	const PRESET_EXAMPLE = "b2D0wqNxT";

	const isMobile = new IsMobile();
	const designSystem = useDesignSystem();

	let open = $state(false);
	let input = $state("");

	const nextPreset = $derived.by(() => {
		const raw = input.trim().replace(/^--preset\s+/, "");
		if (!raw) return null;
		return decodePreset(raw);
	});
	const isInvalid = $derived(input.trim().length > 0 && nextPreset === null);

	function handleOpenChange(next: boolean) {
		open = next;
		if (!next) input = "";
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!nextPreset) return;
		designSystem.style = nextPreset.style;
		designSystem.baseColor = nextPreset.baseColor;
		designSystem.theme = nextPreset.theme;
		if (nextPreset.chartColor) designSystem.chartColor = nextPreset.chartColor;
		designSystem.font = nextPreset.font;
		designSystem.fontHeading = nextPreset.fontHeading;
		designSystem.iconLibrary = nextPreset.iconLibrary;
		designSystem.radius = nextPreset.radius;
		designSystem.menuAccent = nextPreset.menuAccent;
		designSystem.menuColor = nextPreset.menuColor;
		handleOpenChange(false);
	}

	const triggerClassName = $derived(cn(
		"hover:bg-muted! touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none pointer-coarse:h-10!",
		className
	));
</script>

{#snippet fields()}
	<Field.Field data-invalid={isInvalid || undefined}>
		<Field.Label for="preset-code" class="sr-only">Preset code</Field.Label>
		<Input
			id="preset-code"
			bind:value={input}
			placeholder={`${PRESET_EXAMPLE} or --preset ${PRESET_EXAMPLE}`}
			autocapitalize="none"
			autocorrect="off"
			spellcheck={false}
			aria-invalid={isInvalid}
			class="h-10 md:h-8"
		/>
	</Field.Field>
{/snippet}

{#if isMobile.current}
	<Drawer.Root bind:open onOpenChange={handleOpenChange}>
		<Drawer.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props} class={triggerClassName}>{label}</Button>
			{/snippet}
		</Drawer.Trigger>
		<Drawer.Content class="dark rounded-t-2xl!">
			<Drawer.Header>
				<Drawer.Title class="text-xl">{PRESET_TITLE}</Drawer.Title>
				<Drawer.Description>{PRESET_DESCRIPTION}</Drawer.Description>
			</Drawer.Header>
			<form onsubmit={handleSubmit}>
				<div class="px-4 py-2">{@render fields()}</div>
				<Drawer.Footer>
					<Button type="submit" class="h-10" disabled={!nextPreset}>Open</Button>
					<Drawer.Close>
						{#snippet child({ props })}
							<Button variant="outline" type="button" {...props} class="h-10"
								>Cancel</Button
							>
						{/snippet}
					</Drawer.Close>
				</Drawer.Footer>
			</form>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Dialog.Root bind:open onOpenChange={handleOpenChange}>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props} class={triggerClassName}>{label}</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content class="dark">
			<form onsubmit={handleSubmit}>
				<Dialog.Header>
					<Dialog.Title>{PRESET_TITLE}</Dialog.Title>
					<Dialog.Description>{PRESET_DESCRIPTION}</Dialog.Description>
				</Dialog.Header>
				<div class="py-4">{@render fields()}</div>
				<Dialog.Footer>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button variant="outline" type="button" {...props}>Cancel</Button>
						{/snippet}
					</Dialog.Close>
					<Button type="submit" disabled={!nextPreset}>Open</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/if}
