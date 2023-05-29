export type Metadata = {
	title: string;
	description: string;
	openGraph: {
		title: string;
		description: string;
		type: "article";
		url: string;
		images: [
			{
				url: string;
				width: number;
				height: number;
				alt: string;
			}
		];
	};
	twitter: {
		card: "summary_large_image";
		title: string;
		description: string;
		images: string[];
		creator: string;
	};
};

export type FrontMatter = {
	title: string;
	description: string;
	component: boolean;
	source: string;
	radix?: string;
};

export type DocFile = {
	default: import("svelte/internal").SvelteComponent;
	metadata: FrontMatter;
};

export type DocResolver = () => Promise<DocFile>;

export type TableOfContentsItem = {
	title: string;
	url: string;
	items?: TableOfContentsItem[];
};

export type TableOfContents = {
	items: TableOfContentsItem[];
};
