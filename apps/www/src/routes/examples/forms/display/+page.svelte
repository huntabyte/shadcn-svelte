<script lang="ts">
	import type { PageData } from "./$types";
	import DisplayForm from "./display-form.svelte";
	import { Separator } from "@/registry/new-york/ui/separator";
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Display</h3>
		<p class="text-sm text-muted-foreground">
			Turn items on or off to control what's displayed in the app.
		</p>
	</div>
	<Separator />
	<DisplayForm data={data.form} />
</div>
