<script lang="ts">
	import { page } from "$app/stores";
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
