import Root from "./Card.svelte";
import Content from "./CardContent.svelte";
import Description from "./CardDescription.svelte";
import Footer from "./CardFooter.svelte";
import Header from "./CardHeader.svelte";
import Title from "./CardTitle.svelte";

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle
};

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
