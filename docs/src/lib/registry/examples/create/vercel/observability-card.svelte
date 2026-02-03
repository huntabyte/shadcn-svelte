<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Observability" class="items-center justify-center">
	<Card.Root class="relative w-full max-w-md overflow-hidden pt-0">
		<div class="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color"></div>
		<img
			src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="by mymind on Unsplash"
			title="Photo by mymind on Unsplash"
			class="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
		/>
		<Card.Header>
			<Card.Title>Observability Plus is replacing Monitoring</Card.Title>
			<Card.Description>
				Switch to the improved way to explore your data, with natural language. Monitoring
				will no longer be available on the Pro plan in November, 2025
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button>
				Create Query
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
					data-icon="inline-end"
				/>
			</Button>
			<Badge variant="secondary" class="ml-auto">Warning</Badge>
		</Card.Footer>
	</Card.Root>
</Example>
