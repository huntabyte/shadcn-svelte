<script lang="ts">
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
</script>

<header>
	<div
		class="container flex flex-col items-center justify-center gap-(--gap) py-(--gap) sm:flex-row sm:justify-between"
	>
		<div class="flex flex-col gap-2 text-center sm:text-left">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="#" class="flex items-center gap-1.5">
							<ArrowLeftIcon class="size-3.5" />
							Back to articles
						</Breadcrumb.Link>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<h1
				class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
			>
				EDIT ARTICLE
			</h1>
		</div>
		<ButtonGroup.Root class="gap-2 md:gap-4">
			<Badge title="2 minutes ago">Autosaved</Badge>
			<ButtonGroup.Root class="gap-2 md:gap-4">
				<Button variant="link">
					Preview
					<ExternalLinkIcon data-icon="inline-end" />
				</Button>
				<Button>Submit Draft</Button>
			</ButtonGroup.Root>
		</ButtonGroup.Root>
	</div>
</header>
