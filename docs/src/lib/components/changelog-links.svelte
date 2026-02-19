<script lang="ts">
	const links = [
		{ title: "June 2025 - Calendar Components", href: "/docs/changelog/2025-06-calendar" },
		{ title: "May 2025 - Tailwind v4", href: "/docs/changelog/2025-05-tailwind-v4" },
		{ title: "March 2024 - Introducing Blocks", href: "/docs/changelog/2024-03-blocks" },
		{ title: "February 2024 - New Component Resizable", href: "/docs/changelog/2024-02-resizable" },
		{ title: "January 2024 - New Components", href: "/docs/changelog/2024-01-new-components" },
		{ title: "December 2023 - Calendar", href: "/docs/changelog/2023-12-calendar" },
		{ title: "November 2023 - Toggle Group", href: "/docs/changelog/2023-11-toggle-group" },
		{
			title: "October 2023 - Command and Combobox",
			href: "/docs/changelog/2023-10-command-combobox",
		},
	];
</script>

<div class="grid gap-4 sm:grid-cols-2">
	{#each links as link}
		{@const [date, ...rest] = link.title.split(" - ")}
		<a
			href={link.href}
			class="bg-surface text-surface-foreground hover:bg-surface/80 flex flex-col rounded-xl p-4 transition-colors"
		>
			<p class="text-muted-foreground text-sm">{date}</p>
			<p class="mt-1 font-medium">{rest.join(" - ")}</p>
		</a>
	{/each}
</div>
