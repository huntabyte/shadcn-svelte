<script lang="ts">
	type Props = {
		title: string;
		description: string;
	};

	const { title, description }: Props = $props();
</script>

<div class="flex h-full w-full bg-black text-white" style="fontFamily: 'Geist Sans'">
	<div class="absolute inset-y-0 left-16 flex w-[1px] border border-dashed border-stone-700" />
	<div class="absolute inset-y-0 right-16 flex w-[1px] border border-dashed border-stone-700" />
	<div class="absolute inset-x-0 top-16 flex h-[1px] border border-stone-700" />
	<div class="absolute inset-x-0 bottom-16 flex h-[1px] border border-stone-700" />
	<div class="absolute bottom-24 right-24 flex flex-row text-white">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={48} height={48}>
			<rect width="256" height="256" fill="none"></rect>
			<line
				x1="208"
				y1="128"
				x2="128"
				y2="208"
				fill="none"
				stroke="#eb4f27"
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
				stroke="#eb4f27"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="32"
			></line>
		</svg>
	</div>
	<div class="absolute inset-32 flex w-[896px] flex-col justify-center">
		<div
			class="flex-grow-1 flex flex-col justify-center leading-[1.1] tracking-tight"
			style="text-wrap: balance; font-weight: 600; font-size: {title && title.length > 20
				? '64px'
				: '80px'}; letterSpacing: '-0.04em'"
		>
			{title}
		</div>
		<div
			class="flex-grow-1 text-[40px] leading-[1.5] text-stone-400"
			style="fontWeight: 500; textWrap: 'balance'"
		>
			{description}
		</div>
	</div>
</div>
