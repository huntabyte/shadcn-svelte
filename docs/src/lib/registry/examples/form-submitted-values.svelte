<script lang="ts">
	let { value }: { value: unknown } = $props();
</script>

<pre class="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground"><code
		>{JSON.stringify(value, null, 2)}</code
	></pre>
