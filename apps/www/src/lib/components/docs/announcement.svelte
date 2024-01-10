<script lang="ts">
	import { Separator } from "@/registry/new-york/ui/separator";
	import { cn } from "$lib/utils";
	import { Icons } from "./icons";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	href="/docs/changelog"
	class={cn(
		"inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium",
		className
	)}
	{...$$restProps}
>
	🎉 <Separator class="mx-2 h-4" orientation="vertical" />{" "}
	<span class="sm:hidden">New components and more.</span>
	<span class="hidden sm:inline">
		New components, cli updates and more.
	</span>
	<Icons.arrowRight class="ml-1 h-4 w-4" />
</a>
