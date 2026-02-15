<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Example title="Basic">
	<Accordion.Root type="single" value="item-1" class="w-full">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				<span class="flex w-full items-center justify-between gap-4 font-medium">
					Is it styled?
				</span>
			</Accordion.Trigger>
			<Accordion.Content class="flex flex-col gap-4 text-balance">
				<p>
					Yes. It comes with default styles that match the other components'
					aesthetic.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>
				<span class="flex w-full items-center justify-between gap-4 font-medium">
					Is it animated?
				</span>
			</Accordion.Trigger>
			<Accordion.Content class="flex flex-col gap-4 text-balance">
				<p>
					Yes. It's animated by default, but you can disable it if you
					prefer.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>
				<span class="flex w-full items-center justify-between gap-4 font-medium">
					Can I use keyboard shortcuts?
				</span>
			</Accordion.Trigger>
			<Accordion.Content class="flex flex-col gap-4 text-balance">
				<p>
					Yes. It supports custom keyboard shortcuts. Check out the
					component documentation for more details.
				</p>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</Example>
