<script lang="ts">
  import { ChevronRight } from "lucide-svelte";
  import { balancer } from "svelte-action-balancer";

  import { Icons } from "$components/docs/icons";
  import { badgeVariants } from "$components/ui/badge";
  import { Separator } from "$components/ui/separator";
  import { cn } from "$lib/utils";

  import type { PageData } from "./$types";

  export let data: PageData;
  type Component = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
  $: component = data.component as unknown as Component;
  $: doc = data.metadata;
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  <div class="mx-auto w-full min-w-0">
    <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
      <ChevronRight class="h-4 w-4" />
      <div class="font-medium text-foreground">{doc.title}</div>
    </div>
    <div class="space-y-2">
      <h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
        {doc.title}
      </h1>
      {#if doc.description}
        <p class="text-lg text-muted-foreground" use:balancer>
          {doc.description}
        </p>
      {/if}
    </div>
    {#if doc.source || doc.radix}
      <div class="flex items-center space-x-2 pt-4">
        {#if doc.source}
          <a
            href={doc.source}
            target="_blank"
            rel="noreferrer"
            class={cn(badgeVariants({ variant: "secondary" }))}
          >
            <Icons.gitHub class="mr-1 h-3 w-3" />
            Component Source
          </a>
        {/if}
        {#if doc.radix}
          <a
            href={doc.radix.link}
            target="_blank"
            rel="noreferrer"
            class={cn(badgeVariants({ variant: "secondary" }))}
          >
            <Icons.radix class="mr-1 h-3 w-3" />
            Radix Svelte Reference
          </a>
        {/if}
      </div>
    {/if}
    <Separator class="my-4 md:my-6" />
    <div class="mdsvex">
      <svelte:component this={component} />
    </div>
    <!-- <Mdx code={doc.body.code} /> -->
    <Separator class="my-4 md:my-6" />
    <!-- <DocsPager {doc} /> -->
  </div>
  <div class="hidden text-sm xl:block">
    <div
      class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6"
    >
      (TOC HERE)
    </div>
  </div>
</main>
