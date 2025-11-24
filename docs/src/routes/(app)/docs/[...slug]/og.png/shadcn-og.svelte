<script lang="ts">
	type Props = {
		title: string
		description: string
	}

	const {title, description}: Props = $props()
</script>

<div
	class="flex h-full w-full bg-black text-white"
	style="fontFamily: 'Geist Sans'"
>
	<div class="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
	<div class="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
	<div class="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
	<div class="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
	<div class="flex absolute flex-row bottom-24 right-24 text-white">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			width={48}
			height={48}
		>
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
	<div class="flex flex-col absolute w-[896px] justify-center inset-32">
		<div
			class="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
			style="text-wrap: balance; font-weight: 600; font-size: {title && title.length > 20 ? '64px' : '80px'}; letterSpacing: '-0.04em'"
		>
			{title}
		</div>
		<div
			class="text-[40px] leading-[1.5] flex-grow-1 flex text-stone-400"
			style="fontWeight: 500; textWrap: 'balance'"
		>
			{description}
		</div>
	</div>
</div>