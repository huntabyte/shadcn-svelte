<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Front Door</Card.Title>
		<Card.Description>Smart Lock Pro</Card.Description>
		<Card.Action>
			<div class="flex items-center gap-1.5 text-sm text-muted-foreground">
				Locked
				<IconPlaceholder
					lucide="LockIcon"
					tabler="IconLock"
					hugeicons="SquareLock02Icon"
					phosphor="LockKeyIcon"
					remixicon="RiLockLine"
					class="size-4"
				/>
			</div>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<div
			class="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]"
		>
			<Badge variant="destructive" class="absolute top-2 right-2">Live</Badge>
		</div>
	</Card.Content>
</Card.Root>
