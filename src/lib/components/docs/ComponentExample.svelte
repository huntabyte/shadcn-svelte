<script lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$components/ui/tabs";
  import { cn } from "$lib/utils";
  import CopyButton from "./CopyButton.svelte";

  let codeString: string;
  let className: string | undefined | null = undefined;
  export { className as class };
  export let align: "start" | "center" | "end" = "center";
</script>

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...$$restProps}>
  <Tabs value="preview" class="relative mr-auto w-full">
    <div class="flex items-center justify-between pb-3">
      <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="preview"
          class="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          class="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <CopyButton value={codeString} class="absolute right-4 top-20" />
    </div>
    <TabsContent value="preview" class="rounded-md border">
      <div
        class={cn("flex min-h-[350px] justify-center p-10", {
          "items-center": align === "center",
          "items-start": align === "start",
          "items-end": align === "end"
        })}
      >
        <slot name="example" />
      </div>
    </TabsContent>
    <TabsContent value="code">
      <div
        class="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
      >
        <slot />
      </div>
    </TabsContent>
  </Tabs>
</div>
