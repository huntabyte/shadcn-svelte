<script lang="ts">
  import { Terminal } from "lucide-svelte";
  import { Stage } from "svelte-stage";
  import { Alert, AlertDescription, AlertTitle } from "$components/ui/alert";
  import StageBox from "./StageBox.svelte";
</script>

<Stage component="Alert">
  <StageBox>
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription
        >You can add components to your app using the cli.</AlertDescription
      >
    </Alert>
  </StageBox>
</Stage>
