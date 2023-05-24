<script lang="ts">
  import { Stage } from "svelte-stage";
  import StageBox from "./StageBox.svelte";
  import { Input } from "$components/ui/input";
</script>

<Stage component="Textarea">
  <StageBox>
    <Input placeholder="Hello" />
  </StageBox>
</Stage>
