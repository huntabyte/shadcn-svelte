type BlockConfig = {
	name: string;
	container: {
		height: string;
		class: string;
	};
	description: string;
	style: "new-york" | "default";
};

export const blocks: BlockConfig[] = [
	{
		name: "authentication-01",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A simple login form with email and password. The submit button says 'Sign in'.",
		style: "default",
	},
	{
		name: "authentication-02",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
		style: "default",
	},
	{
		name: "authentication-03",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account",
		style: "default",
	},
	{
		name: "authentication-04",
		container: {
			height: "800px",
			class: "w-full h-full p-4 lg:p-0",
		},
		description:
			"A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.",
		style: "default",
	},
	{
		name: "dashboard-01",
		container: {
			height: "825px",
			class: "w-full h-full",
		},
		description:
			"An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.",
		style: "default",
	},
	{
		name: "dashboard-02",
		container: {
			height: "800px",
			class: "w-full h-full",
		},
		description:
			"A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.",
		style: "default",
	},
	{
		name: "dashboard-03",
		container: {
			height: "740px",
			class: "w-full h-full",
		},
		description:
			"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.",
		style: "default",
	},
	{
		name: "dashboard-04",
		container: {
			height: "780px",
			class: "w-full h-full",
		},
		description:
			"A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.",
		style: "default",
	},
	{
		name: "authentication-01",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A simple login form with email and password. The submit button says 'Sign in'.",
		style: "new-york",
	},
	{
		name: "authentication-02",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
		style: "new-york",
	},
	{
		name: "authentication-03",
		container: {
			height: "600px",
			class: "w-full h-screen flex items-center justify-center px-4",
		},
		description:
			"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account",
		style: "new-york",
	},
	{
		name: "authentication-04",
		container: {
			height: "800px",
			class: "w-full h-full p-4 lg:p-0",
		},
		description:
			"A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.",
		style: "new-york",
	},
	{
		name: "dashboard-01",
		container: {
			height: "825px",
			class: "w-full h-full",
		},
		description:
			"An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.",
		style: "new-york",
	},
	{
		name: "dashboard-02",
		container: {
			height: "800px",
			class: "w-full h-full",
		},
		description:
			"A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.",
		style: "new-york",
	},
	{
		name: "dashboard-03",
		container: {
			height: "740px",
			class: "w-full h-full",
		},
		description:
			"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.",
		style: "new-york",
	},
	{
		name: "dashboard-04",
		container: {
			height: "780px",
			class: "w-full h-full",
		},
		description:
			"A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.",
		style: "new-york",
	},
];
