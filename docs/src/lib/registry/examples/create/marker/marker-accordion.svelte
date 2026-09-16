<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Accordion" containerClass="min-h-72">
	<Accordion.Root type="single">
		<Accordion.Item value="1">
			<Accordion.Trigger>
				<Marker.Root>
					<Marker.Icon>
						<IconPlaceholder
							lucide="ClockIcon"
							tabler="IconClock"
							hugeicons="Clock01Icon"
							phosphor="ClockIcon"
							remixicon="RiTimeLine"
						/>
					</Marker.Icon>
					<Marker.Content>Worked for 42s</Marker.Content>
				</Marker.Root>
			</Accordion.Trigger>
			<Accordion.Content>
				<p class="text-sm text-muted-foreground">
					The user asked for a list of all the files in the current directory. The assistant
					responded with a list of all the files in the current directory.
				</p>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</Example>
