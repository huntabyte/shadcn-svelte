<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<div>
	<div class="flex flex-col gap-1">
		<div class="text-sm font-medium leading-none">Tailwind CSS</div>
		<div class="text-muted-foreground text-sm">A utility-first CSS framework.</div>
	</div>
	<Separator class="my-4" />
	<div class="flex h-5 items-center gap-4 text-sm">
		<div>Blog</div>
		<Separator orientation="vertical" />
		<div>Docs</div>
		<Separator orientation="vertical" />
		<div>Source</div>
	</div>
</div>
