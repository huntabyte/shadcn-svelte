<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLInputAttributes } from "svelte/elements";

  // 2-way binding for type
  function setType(node: HTMLInputElement, _type: HTMLInputAttributes["type"]) {
    if (_type) {
      node.type = _type;
      return {
        update(_type: string) {
          node.type = _type;
        }
      };
    }
  }

  let className: string | undefined | null = undefined;

  export let type: HTMLInputAttributes["type"] = "text";
  export let value: HTMLInputAttributes["value"] = undefined;
  export { className as class };

  type $$Props = HTMLInputAttributes;
</script>

<input
  class={cn(
    "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  bind:value
  on:blur
  on:change
  on:click
  on:focus
  on:keydown
  on:keypress
  on:keyup
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:paste
  on:input
  use:setType={type}
  {...$$restProps}
/>
