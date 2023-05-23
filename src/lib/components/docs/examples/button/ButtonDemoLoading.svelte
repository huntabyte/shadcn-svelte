<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Loader2 } from "lucide-svelte";
</script>

<Button disabled>
  <Loader2 class="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>
