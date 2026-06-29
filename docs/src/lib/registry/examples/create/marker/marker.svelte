<script lang="ts">
	import { toast } from "svelte-sonner";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<ExampleWrapper>
	<Example title="Markers" class="gap-8">
		<Marker.Root>
			<Marker.Content>A default marker</Marker.Content>
		</Marker.Root>
		<Marker.Root>
			<Marker.Icon>
				<IconPlaceholder
					lucide="FileTextIcon"
					tabler="IconFileText"
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
				<a href="#markers" {...props}>
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
		<Marker.Root>
			{#snippet child({ props })}
				<button
					type="button"
					onclick={() => toast("You clicked the button")}
					class="hover:text-foreground transition-colors"
					{...props}
				>
					<Marker.Icon>
						<IconPlaceholder
							lucide="ClockIcon"
							tabler="IconClock"
							hugeicons="ClockIcon"
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
					lucide="UserIcon"
					tabler="IconUser"
					hugeicons="UserIcon"
					phosphor="UserIcon"
					remixicon="RiUserLine"
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
					tabler="IconFileText"
					hugeicons="File01Icon"
					phosphor="FileTextIcon"
					remixicon="RiFileTextLine"
				/>
			</Marker.Icon>
			<Marker.Content>Marker with icon at the top</Marker.Content>
		</Marker.Root>
	</Example>

	<Example title="Border" class="gap-3">
		<Marker.Root variant="border">
			<Marker.Icon>
				<IconPlaceholder
					lucide="GitBranchIcon"
					tabler="IconGitBranch"
					hugeicons="GitBranchIcon"
					phosphor="GitBranchIcon"
					remixicon="RiGitBranchLine"
				/>
			</Marker.Icon>
			<Marker.Content>Switched to release-candidate</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="border">
			<Marker.Icon>
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
				/>
			</Marker.Icon>
			<Marker.Content>Reviewed 8 related files</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="border">
			<Marker.Icon>
				<IconPlaceholder
					lucide="FileTextIcon"
					tabler="IconFileText"
					hugeicons="File01Icon"
					phosphor="FileTextIcon"
					remixicon="RiFileTextLine"
				/>
			</Marker.Icon>
			<Marker.Content>Opened implementation notes</Marker.Content>
		</Marker.Root>
	</Example>

	<Example title="Separator" class="gap-8">
		<Marker.Root variant="separator">
			<Marker.Content>Worked for 42s</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="separator" role="status">
			<Marker.Icon>
				<Spinner />
			</Marker.Icon>
			<Marker.Content>Compacting conversation</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="separator" role="status">
			<Marker.Content class="shimmer">Reading 4 files</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="separator">
			<Marker.Icon>
				<IconPlaceholder
					lucide="CheckIcon"
					tabler="IconCheck"
					hugeicons="Tick02Icon"
					phosphor="CheckIcon"
					remixicon="RiCheckLine"
				/>
			</Marker.Icon>
			<Marker.Content>Conversation compacted</Marker.Content>
		</Marker.Root>
		<Marker.Root variant="separator">
			<Marker.Content>With a <a href="#separator">link to learn more</a></Marker.Content>
		</Marker.Root>
		<Marker.Root variant="separator">
			<Marker.Content>
				<Button.Root variant="outline">
					<IconPlaceholder
						lucide="GitBranchIcon"
						tabler="IconGitBranch"
						hugeicons="GitBranchIcon"
						phosphor="GitBranchIcon"
						remixicon="RiGitBranchLine"
					/>
					Button
				</Button.Root>
			</Marker.Content>
		</Marker.Root>
	</Example>

	<Example title="Accordion" containerClass="min-h-72">
		<Accordion.Root type="single">
			<Accordion.Item value="1">
				<Accordion.Trigger>
					<Marker.Root>
						<Marker.Icon>
							<IconPlaceholder
								lucide="ClockIcon"
								tabler="IconClock"
								hugeicons="ClockIcon"
								phosphor="ClockIcon"
								remixicon="RiTimeLine"
							/>
						</Marker.Icon>
						<Marker.Content>Worked for 42s</Marker.Content>
					</Marker.Root>
				</Accordion.Trigger>
				<Accordion.Content>
					<p class="text-muted-foreground text-sm">
						The user asked for a list of all the files in the current directory. The
						assistant responded with a list of all the files in the current directory.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Example>

	<Example title="Drawer">
		<Drawer.Root direction="right">
			<Marker.Root variant="separator">
				<Drawer.Trigger>
					{#snippet child({ props })}
						<Button.Root variant="outline" {...props}>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="SearchIcon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
								data-icon="inline-start"
							/>
							Explored 4 files
						</Button.Root>
					{/snippet}
				</Drawer.Trigger>
			</Marker.Root>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>File Activity</Drawer.Title>
					<Drawer.Description>Files read while preparing the response.</Drawer.Description
					>
				</Drawer.Header>
				<div class="grid gap-3 px-4 text-sm">
					<div
						class="flex items-center justify-between gap-4 rounded-md border px-3 py-2"
					>
						<span class="truncate">app/chat/page.tsx</span>
						<span class="text-muted-foreground">read</span>
					</div>
					<div
						class="flex items-center justify-between gap-4 rounded-md border px-3 py-2"
					>
						<span class="truncate">components/message.tsx</span>
						<span class="text-muted-foreground">read</span>
					</div>
					<div
						class="flex items-center justify-between gap-4 rounded-md border px-3 py-2"
					>
						<span class="truncate">lib/ai.ts</span>
						<span class="text-muted-foreground">read</span>
					</div>
				</div>
				<Drawer.Footer>
					<Drawer.Close>
						{#snippet child({ props })}
							<Button.Root variant="outline" {...props}>Close</Button.Root>
						{/snippet}
					</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</Example>
</ExampleWrapper>
