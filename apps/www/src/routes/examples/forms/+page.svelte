<script lang="ts">
	import * as Form from "@/registry/new-york/ui/super-form";
	import type { PageData } from "./$types";
	import ProfileForm from "./profile-form-super.svelte";
	import { Separator } from "@/registry/new-york/ui/separator";
	import { profileFormSchema } from "./profile-form.svelte";
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">
			This is how others will see you on the site.
		</p>
	</div>
	<Separator />
	<ProfileForm data={data.form} />
</div>

<Form.Root
	data={data.form}
	schema={profileFormSchema}
	let:form
	options={{ taintedMessage: null }}
/>
