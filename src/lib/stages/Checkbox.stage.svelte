<script lang="ts">
  import { Stage } from "svelte-stage";
  import StageBox from "./StageBox.svelte";
  import { Checkbox } from "$ui/checkbox";
</script>

<Stage component="Checkbox">
  <StageBox>
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  </StageBox>
</Stage>
