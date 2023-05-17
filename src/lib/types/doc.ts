// This is a temporary type definition for the metadata object
// will want to use a more robust type definition in the future
// something similar to the one used in
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
