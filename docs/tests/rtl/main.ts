import { mount } from "svelte";
import App from "./fixtures/app.svelte";
import Gallery from "./fixtures/gallery.svelte";
import LogicalSides from "./fixtures/logical-sides.svelte";
import "./style.css";
const query = new URLSearchParams(window.location.search);
mount(query.has("logical-sides") ? LogicalSides : query.has("example") ? Gallery : App, {
	target: document.getElementById("app")!,
});
