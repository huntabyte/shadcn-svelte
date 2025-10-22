<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {LightSwitch} from "$lib/components/ui/light-switch";
</script>

<header class="flex items-center justify-end sticky top-0 w-full p-4">
    <LightSwitch
        variant="outline"
        size="icon"
    />
</header>

<main class="flex place-items-center justify-center h-screen flex-col gap-2">
    <h1 class="text-4xl font-bold">shadcn-svelte repro template</h1>
    <p class="text-muted-foreground">Import and use components here to create a minimal reproduction of your issue.</p>
    <Button variant="outline" href="https://github.com/huntabyte/shadcn-svelte">
        GitHub 
    </Button>
</main>