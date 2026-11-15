<script lang="ts">
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				previous: "Previous",
				next: "Next",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				previous: "السابق",
				next: "التالي",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				previous: "הקודם",
				next: "הבא",
			},
		},
	};
	const t = useTranslation(translations, "ar");
	function formatNumber(num: number): string {
		return t.language === "ar"
			? num.toString().replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]!)
			: num.toString();
	}
</script>

<Pagination.Root count={30} perPage={10} page={2} dir={t.dir}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item
				><Pagination.Previous
					text={t.values.previous}
					aria-label={t.values.previous}
				/></Pagination.Item
			>
			{#each pages as page (page.key)}
				{#if page.type === "ellipsis"}<Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
				{:else}<Pagination.Item
						><Pagination.Link {page} isActive={currentPage === page.value}
							>{formatNumber(page.value)}</Pagination.Link
						></Pagination.Item
					>{/if}
			{/each}
			<Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
			<Pagination.Item
				><Pagination.Next text={t.values.next} aria-label={t.values.next} /></Pagination.Item
			>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
