<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import type { ComponentProps } from "svelte";

	type IconSet = Pick<
		ComponentProps<typeof IconPlaceholder>,
		"lucide" | "tabler" | "hugeicons" | "phosphor" | "remixicon"
	>;

	type AttachmentItem = {
		title: string;
		description?: string;
		icon?: IconSet;
		image?: {
			src: string;
			alt: string;
		};
		state?: ComponentProps<typeof Attachment.Root>["state"];
		size?: ComponentProps<typeof Attachment.Root>["size"];
		orientation?: ComponentProps<typeof Attachment.Root>["orientation"];
		class?: string;
		mediaClass?: string;
		actionLabel?: string;
		retryLabel?: string;
		triggerHref?: string;
		triggerLabel?: string;
		actions?: boolean;
		spinner?: boolean;
	};

	const icons = {
		check: {
			lucide: "CheckIcon",
			tabler: "IconCheck",
			hugeicons: "Tick02Icon",
			phosphor: "CheckIcon",
			remixicon: "RiCheckLine",
		},
		clock: {
			lucide: "ClockIcon",
			tabler: "IconClock",
			hugeicons: "ClockIcon",
			phosphor: "ClockIcon",
			remixicon: "RiTimeLine",
		},
		copy: {
			lucide: "CopyIcon",
			tabler: "IconCopy",
			hugeicons: "Copy01Icon",
			phosphor: "CopyIcon",
			remixicon: "RiFileCopyLine",
		},
		download: {
			lucide: "DownloadIcon",
			tabler: "IconDownload",
			hugeicons: "DownloadIcon",
			phosphor: "DownloadIcon",
			remixicon: "RiDownloadLine",
		},
		fileArchive: {
			lucide: "ArchiveIcon",
			tabler: "IconArchive",
			hugeicons: "ArchiveIcon",
			phosphor: "ArchiveIcon",
			remixicon: "RiArchiveLine",
		},
		fileCode: {
			lucide: "FileCodeIcon",
			tabler: "IconFileCode",
			hugeicons: "File01Icon",
			phosphor: "FileCodeIcon",
			remixicon: "RiFileCodeLine",
		},
		fileSearch: {
			lucide: "FolderSearchIcon",
			tabler: "IconFolderSearch",
			hugeicons: "SearchIcon",
			phosphor: "MagnifyingGlassIcon",
			remixicon: "RiSearchLine",
		},
		fileText: {
			lucide: "FileTextIcon",
			tabler: "IconFileText",
			hugeicons: "FileIcon",
			phosphor: "FileTextIcon",
			remixicon: "RiFileTextLine",
		},
		fileWarning: {
			lucide: "TriangleAlertIcon",
			tabler: "IconAlertTriangle",
			hugeicons: "Alert02Icon",
			phosphor: "WarningIcon",
			remixicon: "RiErrorWarningLine",
		},
		presentation: {
			lucide: "TvIcon",
			tabler: "IconDeviceTv",
			hugeicons: "Tv01Icon",
			phosphor: "TelevisionIcon",
			remixicon: "RiTvLine",
		},
		refresh: {
			lucide: "RefreshCwIcon",
			tabler: "IconRefresh",
			hugeicons: "RefreshIcon",
			phosphor: "ArrowClockwiseIcon",
			remixicon: "RiRefreshLine",
		},
		table: {
			lucide: "TableIcon",
			tabler: "IconTable",
			hugeicons: "TableIcon",
			phosphor: "TableIcon",
			remixicon: "RiTableLine",
		},
		x: {
			lucide: "XIcon",
			tabler: "IconX",
			hugeicons: "Cancel01Icon",
			phosphor: "XIcon",
			remixicon: "RiCloseLine",
		},
	} satisfies Record<string, IconSet>;

	const images = {
		workspace:
			"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
		desk: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
		office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
		patio: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80",
		house: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80",
	};

	const files = [
		{ title: "sales-dashboard.pdf", description: "PDF · 2.4 MB", icon: icons.fileText },
		{ title: "customer-import.csv", description: "CSV · 18 KB", icon: icons.table },
		{
			title: "message-renderer.tsx",
			description: "TypeScript · 12 KB",
			icon: icons.fileCode,
		},
	] satisfies AttachmentItem[];

	const verticalFiles = [
		...files,
		{ title: "source-assets.zip", description: "ZIP · 4.2 MB", icon: icons.fileArchive },
		{
			title: "quarterly-review.key",
			description: "Keynote · 9 MB",
			icon: icons.presentation,
		},
	] satisfies AttachmentItem[];

	const states = [
		{
			state: "idle",
			title: "selected-file.pdf",
			description: "Ready to upload",
			verticalDescription: "Ready",
			icon: icons.clock,
		},
		{
			state: "uploading",
			title: "design-system.zip",
			description: "Uploading · 64%",
			verticalDescription: "Uploading",
			spinner: true,
		},
		{
			state: "processing",
			title: "market-research.pdf",
			description: "Processing document",
			verticalDescription: "Processing",
			icon: icons.fileText,
		},
		{
			state: "error",
			title: "financial-model.xlsx",
			description: "Upload failed. Try again.",
			verticalDescription: "Failed",
			icon: icons.fileWarning,
			retryLabel: "Retry financial-model.xlsx",
		},
		{
			state: "done",
			title: "uploaded-report.pdf",
			description: "Uploaded · 1.8 MB",
			verticalDescription: "Done",
			icon: icons.check,
		},
	] satisfies (AttachmentItem & { verticalDescription: string; spinner?: boolean })[];

	const imageFiles = [
		{
			title: "workspace.png",
			description: "PNG · 820 KB",
			image: { src: images.workspace, alt: "Workspace" },
		},
		{
			title: "desk-reference.jpg",
			description: "JPG · 1.1 MB",
			image: { src: images.desk, alt: "Desk" },
		},
		{
			title: "office-reference.jpg",
			description: "JPG · 940 KB",
			image: { src: images.office, alt: "Office" },
		},
	] satisfies AttachmentItem[];

	const verticalImages = [
		...imageFiles,
		{
			title: "patio-reference.jpg",
			description: "JPG · 1.6 MB",
			image: { src: images.patio, alt: "Outdoor patio" },
		},
		{
			title: "house-exterior.jpg",
			description: "JPG · 1.4 MB",
			image: { src: images.house, alt: "House exterior" },
		},
	] satisfies AttachmentItem[];

	const imageStates = [
		{
			state: "idle",
			title: "office-reference.jpg",
			description: "Ready to upload",
			verticalDescription: "Ready",
			image: { src: images.office, alt: "Office" },
		},
		{
			state: "uploading",
			title: "workspace.png",
			description: "Uploading · 72%",
			verticalDescription: "Uploading",
			image: { src: images.workspace, alt: "Workspace" },
		},
		{
			state: "processing",
			title: "desk-reference.jpg",
			description: "Processing image",
			verticalDescription: "Processing",
			image: { src: images.desk, alt: "Desk" },
		},
		{
			state: "error",
			title: "office-reference.jpg",
			description: "Upload failed",
			verticalDescription: "Failed",
			image: { src: images.office, alt: "Office" },
			retryLabel: "Retry office-reference.jpg",
		},
		{
			state: "done",
			title: "workspace.png",
			description: "Uploaded · 1.2 MB",
			verticalDescription: "Done",
			image: { src: images.workspace, alt: "Workspace" },
		},
	] satisfies (AttachmentItem & { verticalDescription: string })[];

	let isVisible = $state(true);
</script>

{#snippet RenderIcon(icon: IconSet)}
	<IconPlaceholder {...icon} />
{/snippet}

{#snippet RemoveAction(label: string)}
	<Attachment.Action aria-label={label}>
		{@render RenderIcon(icons.x)}
	</Attachment.Action>
{/snippet}

{#snippet AttachmentCard(item: AttachmentItem)}
	<Attachment.Root
		state={item.state}
		size={item.size}
		orientation={item.orientation}
		class={item.class}
	>
		{#if item.image}
			<Attachment.Media variant="image" class={item.mediaClass}>
				<img src={item.image.src} alt={item.image.alt} />
			</Attachment.Media>
		{:else if item.spinner}
			<Attachment.Media>
				<Spinner />
			</Attachment.Media>
		{:else if item.icon}
			<Attachment.Media>
				{@render RenderIcon(item.icon)}
			</Attachment.Media>
		{/if}
		<Attachment.Content>
			<Attachment.Title>{item.title}</Attachment.Title>
			{#if item.description}
				<Attachment.Description>{item.description}</Attachment.Description>
			{/if}
		</Attachment.Content>
		{#if item.actions !== false}
			<Attachment.Actions>
				{#if item.retryLabel}
					<Attachment.Action aria-label={item.retryLabel}>
						{@render RenderIcon(icons.refresh)}
					</Attachment.Action>
				{/if}
				{@render RemoveAction(item.actionLabel ?? `Remove ${item.title}`)}
			</Attachment.Actions>
		{/if}
		{#if item.triggerHref}
			<Attachment.Trigger>
				{#snippet child({ props })}
					<a
						{...props}
						href={item.triggerHref}
						target="_blank"
						rel="noreferrer"
						aria-label={item.triggerLabel ?? `Open ${item.title}`}
					></a>
				{/snippet}
			</Attachment.Trigger>
		{/if}
	</Attachment.Root>
{/snippet}

<ExampleWrapper>
	<Example title="Files" class="gap-8">
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Horizontal</div>
			<div class="flex flex-col gap-3">
				{#each files as file (file.title)}
					{@render AttachmentCard({ ...file, class: "w-full" })}
				{/each}
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Vertical</div>
			<Attachment.Group class="w-full">
				{#each verticalFiles as file (file.title)}
					{@render AttachmentCard({ ...file, orientation: "vertical" })}
				{/each}
			</Attachment.Group>
		</div>
	</Example>

	<Example title="Content Only" class="gap-8">
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Title</div>
			<div class="flex flex-col gap-3">
				{@render AttachmentCard({
					title: "React Documentation",
					class: "w-full",
					actionLabel: "Remove React Documentation",
				})}
				{@render AttachmentCard({
					title: "Tailwind CSS",
					class: "w-full",
					actionLabel: "Remove Tailwind CSS",
				})}
				{@render AttachmentCard({
					title: "shadcn/ui",
					size: "sm",
					class: "w-48",
					actions: false,
					triggerHref: "https://ui.shadcn.com",
					triggerLabel: "Open shadcn/ui",
				})}
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Title and Description</div>
			<div class="flex flex-col gap-3">
				{@render AttachmentCard({
					title: "Building accessible components",
					description: "react.dev · 8 min read",
					class: "w-full",
				})}
				{@render AttachmentCard({
					title: "Utility-first CSS framework",
					description: "tailwindcss.com",
					class: "w-full",
				})}
				{@render AttachmentCard({
					title: "Compound components in React",
					description: "ui.shadcn.com/docs",
					size: "sm",
					class: "w-full max-w-80",
					actions: false,
					triggerHref: "https://ui.shadcn.com/docs",
					triggerLabel: "Open Compound components in React",
				})}
			</div>
		</div>
	</Example>

	<Example title="States" class="gap-8">
		<div class="flex w-full flex-col gap-3">
			<div class="text-muted-foreground px-1 text-xs font-medium">Horizontal</div>
			<div class="flex flex-col gap-2">
				{#each states as item (item.title)}
					{@render AttachmentCard({
						...item,
						class: "w-full",
						actionLabel: item.state === "error" ? "Remove attachment" : undefined,
					})}
				{/each}
			</div>
		</div>
		<div class="flex w-full flex-col gap-3">
			<div class="text-muted-foreground px-1 text-xs font-medium">Vertical</div>
			<Attachment.Group class="w-full">
				{#each states as item (item.title)}
					{@render AttachmentCard({
						...item,
						description: item.verticalDescription,
						orientation: "vertical",
					})}
				{/each}
			</Attachment.Group>
		</div>
	</Example>

	<Example title="Images" class="gap-8">
		<div class="flex w-full flex-col gap-3">
			<div class="text-muted-foreground px-1 text-xs font-medium">Horizontal</div>
			<div class="flex flex-col gap-2">
				{#each imageFiles as image (image.title)}
					{@render AttachmentCard({
						...image,
						class: "w-full",
						triggerHref: image.image?.src,
					})}
				{/each}
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Vertical</div>
			<Attachment.Group class="w-full">
				{#each verticalImages as image (image.title)}
					{@render AttachmentCard({
						...image,
						orientation: "vertical",
						triggerHref: image.image?.src,
					})}
				{/each}
			</Attachment.Group>
		</div>
	</Example>

	<Example title="Image States" class="gap-8">
		<div class="flex w-full flex-col gap-3">
			<div class="text-muted-foreground px-1 text-xs font-medium">Horizontal</div>
			<div class="flex flex-col gap-2">
				{#each imageStates as item (`${item.state}-${item.title}`)}
					{@render AttachmentCard({
						...item,
						class: "w-full",
						actionLabel: item.state === "error" ? "Remove attachment" : undefined,
						retryLabel: item.state === "error" ? "Retry image upload" : undefined,
					})}
				{/each}
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<div class="text-muted-foreground px-1 text-xs font-medium">Vertical</div>
			<Attachment.Group class="w-full">
				{#each imageStates as item (`${item.state}-${item.title}`)}
					{@render AttachmentCard({
						...item,
						description: item.verticalDescription,
						orientation: "vertical",
					})}
				{/each}
			</Attachment.Group>
		</div>
	</Example>

	<Example title="Sizes" class="gap-3">
		{@render AttachmentCard({
			title: "Default attachment",
			description: "PDF · 2.4 MB",
			icon: icons.fileText,
			size: "default",
			class: "w-full",
			actions: false,
		})}
		{@render AttachmentCard({
			title: "Small attachment",
			description: "PDF · 2.4 MB",
			icon: icons.fileText,
			size: "sm",
			class: "w-full",
			actions: false,
		})}
		{@render AttachmentCard({
			title: "Extra small attachment",
			icon: icons.fileText,
			size: "xs",
			class: "w-full",
			actions: false,
		})}
	</Example>

	<Example title="Scrollable Group" class="gap-4">
		<Attachment.Group class="w-full">
			{@render AttachmentCard({
				title: "briefing-notes.pdf",
				description: "PDF · 1.4 MB",
				icon: icons.fileText,
				class: "w-64",
			})}
			{@render AttachmentCard({
				title: "workspace.png",
				description: "PNG · 820 KB",
				image: { src: images.workspace, alt: "Workspace" },
				class: "w-64",
			})}
			{@render AttachmentCard({
				title: "customers.csv",
				description: "CSV · 18 KB",
				icon: icons.table,
				class: "w-64",
			})}
			{@render AttachmentCard({
				title: "renderer.tsx",
				description: "TSX · 12 KB",
				icon: icons.fileCode,
				class: "w-64",
			})}
		</Attachment.Group>
		<Attachment.Group class="w-full">
			{@render AttachmentCard({
				title: "invoice.pdf",
				description: "PDF",
				icon: icons.fileText,
				orientation: "vertical",
			})}
			{@render AttachmentCard({
				title: "desk.jpg",
				description: "JPG",
				image: { src: images.desk, alt: "Desk" },
				orientation: "vertical",
				mediaClass: "aspect-square w-full",
			})}
			{@render AttachmentCard({
				title: "assets.zip",
				description: "ZIP",
				icon: icons.fileArchive,
				orientation: "vertical",
			})}
			{@render AttachmentCard({
				title: "office.jpg",
				description: "JPG",
				image: { src: images.office, alt: "Office" },
				orientation: "vertical",
				mediaClass: "aspect-square w-full",
			})}
			{@render AttachmentCard({
				title: "notes.pdf",
				description: "PDF",
				icon: icons.fileText,
				orientation: "vertical",
			})}
		</Attachment.Group>
	</Example>

	<Example title="Triggers" class="gap-3">
		{#if isVisible}
			<Attachment.Root class="w-full">
				<Attachment.Media>
					{@render RenderIcon(icons.fileText)}
				</Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>contract-review.pdf</Attachment.Title>
					<Attachment.Description>PDF · 820 KB</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action aria-label="Download attachment">
						{@render RenderIcon(icons.download)}
					</Attachment.Action>
					<Attachment.Action
						aria-label="Remove attachment"
						onclick={() => (isVisible = false)}
					>
						{@render RenderIcon(icons.x)}
					</Attachment.Action>
				</Attachment.Actions>
				<Attachment.Trigger>
					{#snippet child({ props })}
						<!-- svelte-ignore a11y_invalid_attribute -->
						<a
							{...props}
							href="#"
							target="_blank"
							rel="noreferrer"
							aria-label="Open contract-review.pdf"
						></a>
					{/snippet}
				</Attachment.Trigger>
			</Attachment.Root>
		{:else}
			<Button variant="outline" onclick={() => (isVisible = true)}>Restore attachment</Button>
		{/if}
		<Dialog.Root>
			<Attachment.Root class="w-full">
				<Attachment.Media>
					{@render RenderIcon(icons.fileSearch)}
				</Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>research-summary.pdf</Attachment.Title>
					<Attachment.Description>Open preview dialog</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action aria-label="Copy link">
						{@render RenderIcon(icons.copy)}
					</Attachment.Action>
					<Attachment.Action aria-label="Remove research-summary.pdf">
						{@render RenderIcon(icons.x)}
					</Attachment.Action>
				</Attachment.Actions>
				<Dialog.Trigger>
					{#snippet child({ props })}
						<Attachment.Trigger {...props} aria-label="Preview research-summary.pdf" />
					{/snippet}
				</Dialog.Trigger>
			</Attachment.Root>
			<Dialog.Content class="sm:max-w-md">
				<Dialog.Header>
					<Dialog.Title>research-summary.pdf</Dialog.Title>
					<Dialog.Description>
						Attachment triggers can open dialogs while actions remain independently
						reachable.
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</Example>
</ExampleWrapper>
