<script lang="ts">
	import { Separator } from "@/registry/new-york/ui/separator";
	import NotificationsForm from "./notifications-form.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Notifications</h3>
		<p class="text-sm text-muted-foreground">
			Configure how you receive notifications.
		</p>
	</div>
	<Separator />
	<NotificationsForm data={data.form} />
</div>
