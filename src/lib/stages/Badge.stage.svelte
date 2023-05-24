<script lang="ts">
  import { Stage } from "svelte-stage";
  import { Badge } from "$components/ui/badge";
  import StageBox from "./StageBox.svelte";
</script>

<Stage component="Badge">
  <StageBox>
    <Badge>Hello</Badge>
  </StageBox>
</Stage>
