import Root from "./Card.svelte";
import Content from "./CardContent.svelte";
import Description from "./CardDescription.svelte";
import Footer from "./CardFooter.svelte";
import Header from "./CardHeader.svelte";
import Title from "./CardTitle.svelte";

export const Card = Object.assign(Root, {
	Content,
	Description,
	Footer,
	Header,
	Title
});

export {
	Root as CardRoot,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle
};
