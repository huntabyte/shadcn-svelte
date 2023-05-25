<script lang="ts">
  import { Underline } from "lucide-svelte";
  import { Toggle } from "$components/ui/toggle";
</script>

<Toggle aria-label="Toggle underline" disabled>
  <Underline class="h-4 w-4" />
</Toggle>
