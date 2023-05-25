<script lang="ts">
  import { cn } from "$lib/utils";

  import CodeBlockWrapper from "$components/docs/CodeBlockWrapper.svelte";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<CodeBlockWrapper
  expandButtonTitle="Expand"
  class={cn("my-6 overflow-hidden rounded-md", className)}
>
  <slot />
</CodeBlockWrapper>
