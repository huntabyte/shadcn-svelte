<script lang="ts">
  import { Stage } from "svelte-stage";
  import { Toggle } from "$components/ui/toggle";
  import StageBox from "./StageBox.svelte";
  import { Bold } from "lucide-svelte";
</script>

<Stage component="Avatar">
  <StageBox>
    <Toggle aria-label="toggle bold">
      <Bold class="h-4 w-4" />
    </Toggle>
  </StageBox>
</Stage>
