<script lang="ts">
	import { Separator } from "$components/ui/separator";
	import type { PageData } from "./$types";

	import ProfileForm from "./ProfileForm.svelte";

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p>This is how other will see you on the site.</p>
	</div>
	<Separator />
	<ProfileForm data={data.form} />
</div>
