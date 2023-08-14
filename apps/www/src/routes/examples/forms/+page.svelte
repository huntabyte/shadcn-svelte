<script lang="ts">
	import type { PageData } from "./$types";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import { Separator } from "@/registry/new-york/ui/separator";
	import ProfileForm from "./profile-form.svelte";
	import { superForm } from "sveltekit-superforms/client";

	export let data: PageData;
	const form = superForm(data.form);
	const { form: formStore } = form;
</script>

<SuperDebug data={$formStore} />

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">
			This is how others will see you on the site.
		</p>
	</div>
	<Separator />
	<ProfileForm {form} />
</div>
