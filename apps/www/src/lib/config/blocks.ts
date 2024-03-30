import type { BlockName } from "$lib/registry/schema.js";
import type { Style } from "$lib/registry/styles.js";

type BlockConfig = {
	iframeHeight: string;
	className: string;
	description: string;
};

export const blockMeta: Record<Style["name"], Record<BlockName, BlockConfig>> = {
	default: {
		"authentication-01": {
			description:
				"A simple login form with email and password. The submit button says 'Sign in'.",
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
		},
		"authentication-02": {
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
			description:
				"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
		},
		"authentication-03": {
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
			description:
				"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account",
		},
		"authentication-04": {
			iframeHeight: "800px",
			className: "w-full h-full p-4 lg:p-0",
			description:
				"A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.",
		},
		"dashboard-01": {
			iframeHeight: "825px",
			className: "w-full h-full",
			description:
				"An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.",
		},
		"dashboard-02": {
			iframeHeight: "800px",
			className: "w-full h-full",
			description:
				"A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.",
		},
		"dashboard-03": {
			iframeHeight: "740px",
			className: "w-full h-full",
			description:
				"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.",
		},
		"dashboard-04": {
			iframeHeight: "780px",
			className: "w-full h-full",
			description:
				"A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.",
		},
		"dashboard-05": {
			iframeHeight: "1112px",
			className: "w-full h-full",
			description:
				"An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.",
		},
		"dashboard-06": {
			iframeHeight: "938px",
			className: "w-full h-full",
			description:
				"A products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.",
		},
		"dashboard-07": {
			iframeHeight: "1200px",
			className: "w-full h-full",
			description:
				"A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.",
		},
	},
	"new-york": {
		"authentication-01": {
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
			description:
				"A simple login form with email and password. The submit button says 'Sign in'.",
		},
		"authentication-02": {
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
			description:
				"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
		},
		"authentication-03": {
			iframeHeight: "600px",
			className: "w-full h-screen flex items-center justify-center px-4",
			description:
				"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account",
		},
		"authentication-04": {
			iframeHeight: "800px",
			className: "w-full h-full p-4 lg:p-0",
			description:
				"A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.",
		},
		"dashboard-01": {
			iframeHeight: "730px",
			className: "w-full h-full",
			description:
				"An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.",
		},
		"dashboard-02": {
			iframeHeight: "800px",
			className: "w-full h-full",
			description:
				"A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.",
		},
		"dashboard-03": {
			iframeHeight: "720px",
			className: "w-full h-full",
			description:
				"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.",
		},
		"dashboard-04": {
			iframeHeight: "780px",
			className: "w-full h-full",
			description:
				"A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.",
		},
		"dashboard-05": {
			iframeHeight: "956px",
			className: "w-full h-full",
			description:
				"An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.",
		},
		"dashboard-06": {
			iframeHeight: "820px",
			className: "w-full h-full",
			description:
				"A products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.",
		},
		"dashboard-07": {
			iframeHeight: "1100px",
			className: "w-full h-full",
			description:
				"A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.",
		},
	},
};
