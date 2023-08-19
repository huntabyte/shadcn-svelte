<script lang="ts">
	import type { PageData } from "./$types";
	import ProfileForm from "./profile-form.svelte";
	import { Separator } from "@/registry/new-york/ui/separator";
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
