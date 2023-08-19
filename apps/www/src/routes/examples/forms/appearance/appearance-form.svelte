<script lang="ts" context="module">
	import type { SuperValidated } from "sveltekit-superforms";
	import { z } from "zod";

	export const appearanceFormSchema = z.object({
		theme: z.enum(["light", "dark"], {
			required_error: "Please select a theme."
		}),
		font: z.enum(["inter", "manrope", "system"], {
			invalid_type_error: "Select a font",
			required_error: "Please select a font."
		})
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
	export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
</script>

<script lang="ts">
	import { ChevronDown } from "radix-icons-svelte";
	import * as Form from "@/registry/new-york/ui/super-form";
	import { Button, buttonVariants } from "@/registry/new-york/ui/button";
	import * as RadioGroup from "@/registry/new-york/ui/radio-group";
	import { cn } from "@/utils";
	import Label from "@/registry/default/ui/label/label.svelte";
	export let data: SuperValidated<AppearanceFormSchema>;
</script>

<Form.Root
	schema={appearanceFormSchema}
	{data}
	let:form
	class="space-y-8"
	method="POST"
>
	<Form.Field {form} name="font" let:field>
		<Form.Label>Font</Form.Label>
		<div class="relative w-max">
			<select
				class={cn(
					buttonVariants({ variant: "outline" }),
					"w-[200px] appearance-none bg-transparent font-normal"
				)}
				{...field.attrs}
				on:input={field.handleInput}
			>
				<option value="inter">Inter</option>
				<option value="manrope">Manrope</option>
				<option value="system">System</option>
			</select>
			<ChevronDown class="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
		</div>
	</Form.Field>
	<Form.Field {form} name="theme" let:field>
		<Form.Label>Theme</Form.Label>
		<Form.Description>Select the theme for the dashboard.</Form.Description>
		<Form.Message />
		<RadioGroup.Root
			onValueChange={field.updateValue}
			value={field.attrs.value}
			class="grid max-w-md grid-cols-2 gap-8 pt-2"
		>
			<RadioGroup.Input name={field.attrs.name} />
			<Label
				for="light"
				class="[&:has([data-state=checked])>div]:border-primary"
			>
				<RadioGroup.Item id="light" value="light" class="sr-only" />
				<div
					class="items-center rounded-md border-2 border-muted p-1 hover:border-accent"
				>
					<div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
						<div
							class="space-y-2 rounded-md bg-white p-2 shadow-sm"
						>
							<div class="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
							<div
								class="h-2 w-[100px] rounded-lg bg-[#ecedef]"
							/>
						</div>
						<div
							class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
						>
							<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
							<div
								class="h-2 w-[100px] rounded-lg bg-[#ecedef]"
							/>
						</div>
						<div
							class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
						>
							<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
							<div
								class="h-2 w-[100px] rounded-lg bg-[#ecedef]"
							/>
						</div>
					</div>
				</div>
				<span class="block w-full p-2 text-center font-normal">
					Light
				</span>
			</Label>
			<Label
				for="dark"
				class="[&:has([data-state=checked])>div]:border-primary"
			>
				<RadioGroup.Item id="dark" value="dark" class="sr-only" />
				<div
					class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
				>
					<div class="space-y-2 rounded-sm bg-slate-950 p-2">
						<div
							class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm"
						>
							<div class="h-2 w-[80px] rounded-lg bg-slate-400" />
							<div
								class="h-2 w-[100px] rounded-lg bg-slate-400"
							/>
						</div>
						<div
							class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
						>
							<div class="h-4 w-4 rounded-full bg-slate-400" />
							<div
								class="h-2 w-[100px] rounded-lg bg-slate-400"
							/>
						</div>
						<div
							class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
						>
							<div class="h-4 w-4 rounded-full bg-slate-400" />
							<div
								class="h-2 w-[100px] rounded-lg bg-slate-400"
							/>
						</div>
					</div>
				</div>
				<span class="block w-full p-2 text-center font-normal">
					Dark
				</span>
			</Label>
		</RadioGroup.Root>
	</Form.Field>

	<Button type="submit">Update preferences</Button>
</Form.Root>
