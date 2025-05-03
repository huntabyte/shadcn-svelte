<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import BookmarkCheck from "@lucide/svelte/icons/bookmark-check";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
	import Gift from "@lucide/svelte/icons/gift";
	import Popcorn from "@lucide/svelte/icons/popcorn";
	import ShieldAlert from "@lucide/svelte/icons/shield-alert";
</script>

<div class="grid max-w-xl items-start gap-4">
	<Alert.Root>
		<CheckCircle2 />
		<Alert.Title>Success! Your changes have been saved</Alert.Title>
		<Alert.Description>This is an alert with icon, title and description.</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<BookmarkCheck />
		<Alert.Description>
			This one has an icon and a description only. No title.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<Alert.Description>This one has a description only. No title. No icon.</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<Popcorn />
		<Alert.Title>Let&apos;s try one with icon and title.</Alert.Title>
	</Alert.Root>
	<Alert.Root>
		<ShieldAlert />
		<Alert.Title>
			This is a very long alert title that demonstrates how the component handles extended
			text content and potentially wraps across multiple lines
		</Alert.Title>
	</Alert.Root>
	<Alert.Root>
		<Gift />
		<Alert.Description>
			This is a very long alert description that demonstrates how the component handles
			extended text content and potentially wraps across multiple lines
		</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<AlertCircle />
		<Alert.Title>
			This is an extremely long alert title that spans multiple lines to demonstrate how the
			component handles very lengthy headings while maintaining readability and proper text
			wrapping behavior
		</Alert.Title>
		<Alert.Description>
			This is an equally long description that contains detailed information about the alert.
			It shows how the component can accommodate extensive content while preserving proper
			spacing, alignment, and readability across different screen sizes and viewport widths.
			This helps ensure the user experience remains consistent regardless of the content
			length.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		<AlertCircle />
		<Alert.Title>Something went wrong!</Alert.Title>
		<Alert.Description>Your session has expired. Please log in again.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		<AlertCircle />
		<Alert.Title>Unable to process your payment.</Alert.Title>
		<Alert.Description>
			<p>Please verify your billing information and try again.</p>
			<ul class="list-inside list-disc text-sm">
				<li>Check your card details</li>
				<li>Ensure sufficient funds</li>
				<li>Verify billing address</li>
			</ul>
		</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<CheckCircle2 />
		<Alert.Title class="max-w-[calc(100%-4rem)] overflow-ellipsis">
			The selected emails have been marked as spam.
		</Alert.Title>
		<Button size="sm" variant="outline" class="absolute right-3 top-2.5 h-6 shadow-none">
			Undo
		</Button>
	</Alert.Root>
	<Alert.Root
		class="border-amber-50 bg-amber-50 text-amber-900 dark:border-amber-950 dark:bg-amber-950 dark:text-amber-100"
	>
		<CheckCircle2 />
		<Alert.Title>Plot Twist: This Alert is Actually Amber!</Alert.Title>
		<Alert.Description>This one has custom colors for light and dark mode.</Alert.Description>
	</Alert.Root>
</div>
