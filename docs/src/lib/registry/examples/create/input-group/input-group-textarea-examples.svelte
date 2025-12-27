<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Textarea">
	<Field.Group>
		<Field.Field>
			<Field.Label for="textarea-header-footer-12"
				>Default Textarea (No Input Group)</Field.Label
			>
			<Textarea id="textarea-header-footer-12" placeholder="Enter your text here..." />
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-header-footer-13">Input Group</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-header-footer-13"
					placeholder="Enter your text here..."
				/>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field data-invalid="true">
			<Field.Label for="textarea-header-footer-14">Invalid</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-header-footer-14"
					placeholder="Enter your text here..."
					aria-invalid="true"
				/>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled="true">
			<Field.Label for="textarea-header-footer-15">Disabled</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-header-footer-15"
					placeholder="Enter your text here..."
					disabled
				/>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="prompt-31">Addon (block-start)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea id="prompt-31" />
				<InputGroup.Addon align="block-start">
					<InputGroup.Text>Ask, Search or Chat...</InputGroup.Text>
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="AlertCircleIcon"
						phosphor="InfoIcon"
						class="text-muted-foreground ml-auto"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-header-footer-30">Addon (block-end)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-header-footer-30"
					placeholder="Enter your text here..."
				/>
				<InputGroup.Addon align="block-end">
					<InputGroup.Text>0/280 characters</InputGroup.Text>
					<InputGroup.Button
						variant="default"
						size="icon-xs"
						class="ml-auto rounded-full"
					>
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
						/>
						<span class="sr-only">Send</span>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-comment-31">Addon (Buttons)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-comment-31"
					placeholder="Share your thoughts..."
					class="min-h-[120px]"
				/>
				<InputGroup.Addon align="block-end">
					<InputGroup.Button variant="ghost" class="ml-auto" size="sm"
						>Cancel</InputGroup.Button
					>
					<InputGroup.Button variant="default" size="sm">Post Comment</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-code-32">Code Editor</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea
					id="textarea-code-32"
					placeholder="console.log('Hello, world!');"
					class="min-h-[300px] py-3"
				/>
				<InputGroup.Addon align="block-start" class="border-b">
					<InputGroup.Text class="font-mono font-medium">
						<IconPlaceholder
							lucide="CodeIcon"
							tabler="IconBrandJavascript"
							hugeicons="CodeIcon"
							phosphor="CodeIcon"
						/>
						script.js
					</InputGroup.Text>
					<InputGroup.Button size="icon-xs" class="ml-auto">
						<IconPlaceholder
							lucide="RefreshCwIcon"
							tabler="IconRefresh"
							hugeicons="RefreshIcon"
							phosphor="ArrowClockwiseIcon"
						/>
					</InputGroup.Button>
					<InputGroup.Button size="icon-xs" variant="ghost">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
				<InputGroup.Addon align="block-end" class="border-t">
					<InputGroup.Text>Line 1, Column 1</InputGroup.Text>
					<InputGroup.Text class="ml-auto">JavaScript</InputGroup.Text>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
	</Field.Group>
</Example>
