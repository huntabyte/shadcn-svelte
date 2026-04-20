<script lang="ts">
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import PlusIcon from "@lucide/svelte/icons/plus";
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
				<Breadcrumb.List class="justify-center md:justify-start">
					<Breadcrumb.Item>
						<Breadcrumb.Link href="#" class="inline-flex items-center gap-1.5">
							<ArrowLeftIcon class="size-3" />
							Editorial Dashboard
						</Breadcrumb.Link>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<h1
				class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
			>
				Article Directory
			</h1>
		</div>
		<div>
			<ButtonGroup.Root class="gap-2 sm:ml-auto md:gap-4">
				<Button>
					<PlusIcon data-icon="inline-start" />
					New Article
				</Button>
			</ButtonGroup.Root>
		</div>
	</div>
</header>
