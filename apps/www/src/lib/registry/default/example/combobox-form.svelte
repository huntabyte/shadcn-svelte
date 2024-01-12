<script lang="ts" context="module">
	import { z } from "zod";

	const languages = [
		{ label: "English", value: "en" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Spanish", value: "es" },
		{ label: "Portuguese", value: "pt" },
		{ label: "Russian", value: "ru" },
		{ label: "Japanese", value: "ja" },
		{ label: "Korean", value: "ko" },
		{ label: "Chinese", value: "zh" }
	] as const;

	type Language = (typeof languages)[number]["value"];

	export const formSchema = z.object({
		language: z.enum(languages.map((f) => f.value) as [Language, ...Language[]], {
			errorMap: () => ({ message: "Please select a valid language." })
		})
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import * as Form from "@/registry/default/ui/form";
	import { Button } from "@/registry/default/ui/button";
	import * as Popover from "@/registry/default/ui/popover";
	import * as Command from "@/registry/default/ui/command";
	import type { SuperValidated } from "sveltekit-superforms";
	import { cn } from "@/utils";
	import { tick } from "svelte";
	import { Check, ChevronsUpDown } from "lucide-svelte";
	export let form: SuperValidated<FormSchema> = $page.data.combobox;

	let open = false;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Form.Root
	{form}
	schema={formSchema}
	let:config
	method="POST"
	action="?/combobox"
	class="space-y-6"
>
	<Form.Field {config} name="language" let:setValue let:value>
		<Form.Item class="flex flex-col">
			<Form.Label>Language</Form.Label>
			<Popover.Root bind:open let:ids>
				<Popover.Trigger asChild let:builder>
					<Form.Control id={ids.trigger} let:attrs>
						<Button
							builders={[builder]}
							{...attrs}
							variant="outline"
							role="combobox"
							type="button"
							class={cn(
								"w-[200px] justify-between",
								!value && "text-muted-foreground"
							)}
						>
							{languages.find((f) => f.value === value)?.label ?? "Select language"}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</Form.Control>
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0">
					<Command.Root>
						<Command.Input autofocus placeholder="Search language..." />
						<Command.Empty>No language found.</Command.Empty>
						<Command.Group>
							{#each languages as language}
								<Command.Item
									value={language.value}
									onSelect={() => {
										setValue(language.value);
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check
										class={cn(
											"mr-2 h-4 w-4",
											language.value !== value && "text-transparent"
										)}
									/>
									{language.label}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
			<Form.Description>
				This is the language that will be used in the dashboard.
			</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
