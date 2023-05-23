<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from "$ui/alert";
  import { Terminal } from "lucide-svelte";
</script>

<Alert variant="destructive">
  <Terminal class="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>
