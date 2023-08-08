<script lang="ts">
	import {
		ExamplesNav,
		PageHeader,
		PageHeaderDescription,
		PageHeaderHeading
	} from "$components/docs";
	import { Button } from "@/registry/default/ui/button";
</script>

<div class="container relative pb-10">
	<PageHeader>
		<PageHeaderHeading class="hidden md:block">
			Check out some examples
		</PageHeaderHeading>
		<PageHeaderHeading class="md:hidden">Examples</PageHeaderHeading>
		<PageHeaderDescription>
			Dashboard, cards, authentication. Some examples built using the
			components. Use this as a guide to build your own.
		</PageHeaderDescription>
		<section class="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
			<Button href="/docs" class="rounded-[6px]">Get Started</Button>
			<Button href="/components" variant="outline" class="rounded-[6px]"
				>Components</Button
			>
		</section>
	</PageHeader>
	<section>
		<ExamplesNav />
		<div
			class="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl"
		>
			<slot />
		</div>
	</section>
</div>
