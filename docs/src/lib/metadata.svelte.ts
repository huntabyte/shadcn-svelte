interface MetadataConfig {
	// base defaults
	siteName?: string;
	titleTemplate?: string; // e.g. "%s | My Site"
	defaultTitle?: string;
	defaultDescription?: string;

	// fixed meta that rarely changes
	author?: string;
	siteUrl?: string;
	twitterHandle?: string;
	locale?: string;
}

interface MetadataValues {
	title: string;
	description: string;

	// open graph
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogType?: string;
	ogUrl?: string;

	// twitter
	twitterTitle?: string;
	twitterDescription?: string;
	twitterImage?: string;
	twitterCard?: "summary" | "summary_large_image" | "app" | "player";

	// other common meta
	keywords?: string[];
	canonical?: string;
	noindex?: boolean;
}

export class MetadataState {
	private config: MetadataConfig = $state({
		siteName: "",
		titleTemplate: "%s",
		defaultTitle: "",
		defaultDescription: "",
		author: "",
		siteUrl: "",
		twitterHandle: "",
		locale: "en",
	});

	private state: MetadataValues = $state({
		title: "",
		description: "",
		ogTitle: undefined,
		ogDescription: undefined,
		ogImage: undefined,
		ogType: "website",
		ogUrl: undefined,
		twitterTitle: undefined,
		twitterDescription: undefined,
		twitterImage: undefined,
		twitterCard: "summary_large_image",
		keywords: [],
		canonical: undefined,
		noindex: false,
	});

	constructor(config: MetadataConfig = {}) {
		this.config = { ...this.config, ...config };
		this.state.title = this.config.defaultTitle || "";
		this.state.description = this.config.defaultDescription || "";
	}

	// getters with computed values
	get formattedTitle(): string {
		if (!this.state.title) return this.config.defaultTitle || "";

		if (this.config.titleTemplate?.includes("%s")) {
			return this.config.titleTemplate.replace("%s", this.state.title);
		}

		return this.state.title;
	}

	get effectiveOgTitle(): string {
		return this.state.ogTitle || this.formattedTitle;
	}

	get effectiveOgDescription(): string {
		return this.state.ogDescription || this.state.description;
	}

	get effectiveTwitterTitle(): string {
		return this.state.twitterTitle || this.effectiveOgTitle;
	}

	get effectiveTwitterDescription(): string {
		return this.state.twitterDescription || this.effectiveOgDescription;
	}

	// update methods
	setTitle(title: string) {
		this.state.title = title;
	}

	setDescription(description: string) {
		this.state.description = description;
	}

	setOg(
		data: Partial<
			Pick<MetadataValues, "ogTitle" | "ogDescription" | "ogImage" | "ogType" | "ogUrl">
		>
	) {
		Object.assign(this.state, data);
	}

	setTwitter(
		data: Partial<
			Pick<
				MetadataValues,
				"twitterTitle" | "twitterDescription" | "twitterImage" | "twitterCard"
			>
		>
	) {
		Object.assign(this.state, data);
	}

	setKeywords(keywords: string[]) {
		this.state.keywords = keywords;
	}

	setCanonical(canonical: string) {
		this.state.canonical = canonical;
	}

	setNoindex(noindex: boolean) {
		this.state.noindex = noindex;
	}

	// bulk update method
	update(data: Partial<MetadataValues>) {
		Object.assign(this.state, data);
	}

	// reset to defaults
	reset() {
		this.state.title = this.config.defaultTitle || "";
		this.state.description = this.config.defaultDescription || "";
		this.state.ogTitle = undefined;
		this.state.ogDescription = undefined;
		this.state.ogImage = undefined;
		this.state.ogType = "website";
		this.state.ogUrl = undefined;
		this.state.twitterTitle = undefined;
		this.state.twitterDescription = undefined;
		this.state.twitterImage = undefined;
		this.state.twitterCard = "summary_large_image";
		this.state.keywords = [];
		this.state.canonical = undefined;
		this.state.noindex = false;
	}

	// get all current state (useful for debugging or passing to components)
	getState() {
		return {
			...this.state,
			formattedTitle: this.formattedTitle,
			effectiveOgTitle: this.effectiveOgTitle,
			effectiveOgDescription: this.effectiveOgDescription,
			effectiveTwitterTitle: this.effectiveTwitterTitle,
			effectiveTwitterDescription: this.effectiveTwitterDescription,
			config: this.config,
		};
	}
}
