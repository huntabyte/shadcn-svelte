<script lang="ts">
	import Badge from "$components/ui/Badge.svelte";
	import Button from "$components/ui/Button/Button.svelte";
	import Separator from "$components/ui/Separator.svelte";
</script>

<div class="bg-white px-4 py-8">
	<div
		class="mx-auto flex max-w-3xl flex-col items-center justify-start space-y-4 sm:flex-row sm:items-end sm:justify-around sm:space-y-0"
	>
		<Button href="/">Hello</Button>
		<div>
			<Badge>Online</Badge>
		</div>
		<Separator />
	</div>
</div>
