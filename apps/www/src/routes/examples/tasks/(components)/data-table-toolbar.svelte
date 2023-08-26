<script lang="ts">
	import { Cross2 } from "radix-icons-svelte";
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { priorities, statuses } from "../(data)/data";
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input placeholder="Filter tasks..." class="h-8 w-[150px] lg:w-[250px]" />
	</div>
</div>
