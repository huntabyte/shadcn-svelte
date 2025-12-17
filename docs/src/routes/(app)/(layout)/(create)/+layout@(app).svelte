<script lang="ts">
    import { setupLocks } from "./lib/locks.svelte.js";

    let { children } = $props();

    setupLocks();
</script>

{@render children()}