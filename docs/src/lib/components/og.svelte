<script lang="ts">
	let { title, description }: { title?: string | null; description?: string | null } = $props();
</script>

<div class="flex h-full w-full bg-black text-white" style="font-family: 'Inter Latin'">
	<div
		class="absolute inset-y-0 start-16 flex w-[1px] border border-dashed border-stone-700"
	></div>
	<div class="absolute inset-y-0 end-16 flex w-[1px] border border-dashed border-stone-700"></div>
	<div class="absolute inset-x-0 top-16 flex h-[1px] border border-stone-700"></div>
	<div class="absolute inset-x-0 bottom-16 flex h-[1px] border border-stone-700"></div>
	<div class="absolute end-24 bottom-24 flex flex-row text-white">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={48} height={48}>
			<rect width="256" height="256" fill="none"></rect>
			<line
				x1="208"
				y1="128"
				x2="128"
				y2="208"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="32"
			></line>
			<line
				x1="192"
				y1="40"
				x2="40"
				y2="192"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="32"
			></line>
		</svg>
	</div>
	<div class="absolute inset-32 flex w-[896px] flex-col justify-center">
		<div
			class="flex flex-grow-1 flex-col justify-center text-[64px] leading-[1.1]"
			style="text-wrap: balance; font-weight: 600; letter-spacing: -0.04em;"
		>
			{title}
		</div>
		<div
			class="flex-grow-1 text-[40px] leading-[1.5] text-stone-400"
			style="font-weight: 500; text-wrap: balance;"
		>
			{description}
		</div>
	</div>
</div>
