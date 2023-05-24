<script lang="ts">
  import { Progress } from "$components/ui/progress";
  import { onMount } from "svelte";

  let progress = 13;
  onMount(() => {
    const timer = setTimeout(() => (progress = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress value={progress} max={100} />
