<script lang="ts">
  import { Stage } from "svelte-stage";
  import { Switch } from "$ui/switch";
  import StageBox from "./StageBox.svelte";
</script>

<Stage component="Switch">
  <StageBox>
    <Switch>Hello</Switch>
  </StageBox>
</Stage>
