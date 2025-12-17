<script lang="ts">
	import DesignSystemProvider from '$lib/components/design-system-provider.svelte';

    let { children } = $props();
</script>

<DesignSystemProvider>
    {@render children()}
</DesignSystemProvider>