<script lang="ts">
  import { Avatar as AvatarPrimitive, type AvatarImageProps } from "radix-svelte";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export let src: AvatarImageProps["src"] = undefined;
  export let alt: AvatarImageProps["alt"] = undefined;
  export { className as class };
</script>

<AvatarPrimitive.Image
  {alt}
  {src}
  class={cn("aspect-square h-full w-full", className)}
  {...$$restProps}
/>
