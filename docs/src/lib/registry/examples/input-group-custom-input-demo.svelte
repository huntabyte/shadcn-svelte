<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
</script>

<div class="grid w-full max-w-sm gap-6">
	<InputGroup.Root>
		<textarea
			data-slot="input-group-control"
			class="field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none transition-[color,box-shadow] md:text-sm"
			placeholder="Autoresize textarea..."
		></textarea>
		<InputGroup.Addon align="block-end">
			<InputGroup.Button class="ms-auto" size="sm" variant="default">
				Submit
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
