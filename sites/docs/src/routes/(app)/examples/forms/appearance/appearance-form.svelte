<script lang="ts" module>
	import { z } from "zod";

	export const appearanceFormSchema = z.object({
		theme: z.enum(["light", "dark"], {
			required_error: "Please select a theme.",
		}),
		font: z.enum(["inter", "manrope", "system"], {
			invalid_type_error: "Select a font",
			required_error: "Please select a font.",
		}),
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import SuperDebug, { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { browser } from "$app/environment";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as RadioGroup from "$lib/registry/new-york/ui/radio-group/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

	let { data }: { data: SuperValidated<Infer<AppearanceFormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(appearanceFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-8">
	<Form.Field {form} name="font">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Font</Form.Label>
				<div class="relative w-max">
					<select
						{...props}
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-[200px] appearance-none font-normal"
						)}
						bind:value={$formData.font}
					>
						<option value="inter">Inter</option>
						<option value="manrope">Manrope</option>
						<option value="system">System</option>
					</select>
					<ChevronDown class="absolute right-3 top-2.5 size-4 opacity-50" />
				</div>
			{/snippet}
		</Form.Control>
		<Form.Description>Set the font you want to use in the dashboard.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Fieldset {form} name="theme">
		<Form.Legend>Theme</Form.Legend>
		<Form.Description>Select the theme for the dashboard.</Form.Description>
		<Form.FieldErrors />
		<RadioGroup.Root
			class="grid max-w-md grid-cols-2 gap-8 pt-2"
			orientation="horizontal"
			bind:value={$formData.theme}
			name="theme"
		>
			<Form.Control>
				{#snippet children({ props })}
					<Label class="[&:has([data-state=checked])>div]:border-primary">
						<RadioGroup.Item {...props} value="light" class="sr-only" />
						<div
							class="border-muted hover:border-accent items-center rounded-md border-2 p-1"
						>
							<div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
								<div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
									<div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
									<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
								</div>
								<div
									class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
								>
									<div class="size-4 rounded-full bg-[#ecedef]"></div>
									<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
								</div>
								<div
									class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
								>
									<div class="size-4 rounded-full bg-[#ecedef]"></div>
									<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
								</div>
							</div>
						</div>
						<span class="block w-full p-2 text-center font-normal"> Light </span>
					</Label>
				{/snippet}
			</Form.Control>
			<Form.Control>
				{#snippet children({ props })}
					<Label class="[&:has([data-state=checked])>div]:border-primary">
						<RadioGroup.Item {...props} value="dark" class="sr-only" />
						<div
							class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1"
						>
							<div class="space-y-2 rounded-sm bg-slate-950 p-2">
								<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div class="h-2 w-[80px] rounded-lg bg-slate-400"></div>
									<div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
								</div>
								<div
									class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
								>
									<div class="size-4 rounded-full bg-slate-400"></div>
									<div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
								</div>
								<div
									class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
								>
									<div class="size-4 rounded-full bg-slate-400"></div>
									<div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
								</div>
							</div>
						</div>
						<span class="block w-full p-2 text-center font-normal"> Dark </span>
					</Label>
				{/snippet}
			</Form.Control>
		</RadioGroup.Root>
	</Form.Fieldset>
	<Form.Button>Update preferences</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
