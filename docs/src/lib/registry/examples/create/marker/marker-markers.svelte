<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Markers" class="gap-8">
	<Marker.Root>
		<Marker.Content>A default marker</Marker.Content>
	</Marker.Root>
	<Marker.Root>
		<Marker.Icon>
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
			/>
		</Marker.Icon>
		<Marker.Content>Marker with icon</Marker.Content>
	</Marker.Root>
	<Marker.Root role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content>Marker with a spinner</Marker.Content>
	</Marker.Root>
	<Marker.Root role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content class="shimmer">Marker with shimmer effect</Marker.Content>
	</Marker.Root>
	<Marker.Root role="status">
		<Marker.Content class="shimmer">Thinking...</Marker.Content>
	</Marker.Root>
	<Marker.Root>
		{#snippet child({ props })}
			<a href="#/" {...props}>
				<Marker.Icon>
					<IconPlaceholder
						lucide="GitBranchIcon"
						tabler="IconGitBranch"
						hugeicons="GitBranchIcon"
						phosphor="GitBranchIcon"
						remixicon="RiGitBranchLine"
					/>
				</Marker.Icon>
				<Marker.Content>Marker as a link</Marker.Content>
			</a>
		{/snippet}
	</Marker.Root>
	<Marker.Root class="transition-colors hover:text-foreground">
		{#snippet child({ props })}
			<button {...props} type="button" onclick={() => toast("You clicked the button")}>
				<Marker.Icon>
					<IconPlaceholder
						lucide="ClockIcon"
						tabler="IconClock"
						hugeicons="Clock01Icon"
						phosphor="ClockIcon"
						remixicon="RiTimeLine"
					/>
				</Marker.Icon>
				<Marker.Content class="flex-1">
					<div>Marker as a button</div>
				</Marker.Content>
				<Marker.Icon>
					<IconPlaceholder
						lucide="ChevronRightIcon"
						tabler="IconChevronRight"
						hugeicons="ArrowRight01Icon"
						phosphor="CaretRightIcon"
						remixicon="RiArrowRightSLine"
					/>
				</Marker.Icon>
			</button>
		{/snippet}
	</Marker.Root>
	<Marker.Root>
		<Marker.Icon>
			<IconPlaceholder
				lucide="CircleUserIcon"
				tabler="IconUserCircle"
				hugeicons="UserCircleIcon"
				phosphor="UserCircleIcon"
				remixicon="RiUserSmileLine"
			/>
		</Marker.Icon>
		<Marker.Content>Rhea joined the chat</Marker.Content>
	</Marker.Root>
	<Marker.Root class="justify-center">
		<Marker.Content>
			<strong class="font-medium">Olivia Rose</strong> left the chat
		</Marker.Content>
	</Marker.Root>
	<Marker.Root class="flex-col">
		<Marker.Icon>
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
			/>
		</Marker.Icon>
		<Marker.Content>Marker with icon at the top</Marker.Content>
	</Marker.Root>
</Example>
