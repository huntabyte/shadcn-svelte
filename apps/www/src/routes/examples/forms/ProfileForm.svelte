<script lang="ts">
	import {
		FormDescription,
		FormField,
		FormInput,
		FormLabel,
		FormMessage
	} from "$components/ui/form";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { profileSchema } from "./schemas";
	import type { Validation } from "sveltekit-superforms/index";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { Loader2 } from "lucide-svelte";

	export let data: Validation<typeof profileSchema>;

	const form = superForm(data, {
		taintedMessage: null,
		onSubmit: ({ action, data, form, controller }) => {
			console.log("Data", data.get("urls[0]"));
			console.log("Form", form);
		}
	});

	$: ({ form: superFrm, delayed, errors, tainted } = form);
</script>

<SuperDebug data={{ $superFrm, $errors, $tainted }} />
<form action="?/updateProfile" method="POST" class="space-y-8" use:form.enhance>
	<FormField {form} let:field name="username">
		<FormLabel>Username</FormLabel>
		<FormInput type="text" {...field} />
		<FormDescription>
			This is your public display name. It can be your real name or a
			pseudonym. You can only change this once every 30 days.
		</FormDescription>
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="email">
		<FormLabel>Email</FormLabel>
		<FormInput type="text" {...field} />
		<FormDescription>
			You can manage verified email addresses in your email settings.
		</FormDescription>
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="bio">
		<FormLabel>Bio</FormLabel>
		<FormInput type="textarea" {...field} />
		<FormDescription>
			You can @mention other users and organizations to link to them.
		</FormDescription>
		<FormMessage />
	</FormField>
	<div class="space-y-2">
		{#each $superFrm.urls as url, index (`${url}-${index}`)}
			<FormField {form} let:field name={`urls[${index}]`}>
				<FormLabel class={cn(index !== 0 && "sr-only")}>URLs</FormLabel>
				<FormDescription class={cn(index !== 0 && "sr-only")}
					>Add links to your website, blog, or social media profiles</FormDescription
				>
				<FormInput type="password" {...field} />
				<FormMessage />
			</FormField>
		{/each}
		<Button
			type="button"
			variant="link"
			size="sm"
			class="mt-1"
			on:click={() => {
				$superFrm.urls = [...$superFrm.urls, ""];
			}}
		>
			Add URL
		</Button>
	</div>

	<Button type="submit" disabled={$delayed}>
		{#if $delayed}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Registering...
		{:else}
			Register
		{/if}
	</Button>
</form>
