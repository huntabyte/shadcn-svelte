<script lang="ts">
	import LinkedCard from "./linked-card.svelte";
</script>

<div class="mt-4 mb-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
	<LinkedCard href="#use-shadcn-sveltecreate" class="items-start">
		<p class="font-medium">Use shadcn-svelte/create</p>
		<p class="text-muted-foreground mt-1 text-sm">
			Build your preset visually and generate a setup command.
		</p>
	</LinkedCard>
	<LinkedCard href="#use-the-cli" class="items-start">
		<p class="font-medium">Use the CLI</p>
		<p class="text-muted-foreground mt-1 text-sm">
			Scaffold a supported template directly from the terminal.
		</p>
	</LinkedCard>
	<LinkedCard href="#existing-project" class="items-start">
		<p class="font-medium">Existing Project</p>
		<p class="text-muted-foreground mt-1 text-sm">
			Add shadcn-svelte to an app you already created.
		</p>
	</LinkedCard>
</div>
