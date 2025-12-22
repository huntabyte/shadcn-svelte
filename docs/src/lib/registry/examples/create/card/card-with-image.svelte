<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Image">
	<Card.Root size="default" class="relative mx-auto w-full max-w-sm pt-0">
		<div class="bg-primary absolute inse.t-0 z-30 aspect-video opacity-50 mix-blend-color" ></div>
		<img
			src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="by mymind on Unsplash"
			class="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
		/>
		<Card.Header>
			<Card.Title>Beautiful Landscape</Card.Title>
			<Card.Description>
				A stunning view that captures the essence of natural beauty.
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button.Root class="w-full">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="Add01Icon"
					phosphor="PlusIcon"
					data-icon="inline-start"
				/>
				Button
			</Button.Root>
		</Card.Footer>
	</Card.Root>
</Example>
