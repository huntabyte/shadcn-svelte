<script lang="ts">
  import { Stage } from "svelte-stage";
  import { Button } from "$ui/button";
  import StageBox from "./StageBox.svelte";
</script>

<Stage component="Button">
  <StageBox>
    <Button>Hello</Button>
  </StageBox>
</Stage>
