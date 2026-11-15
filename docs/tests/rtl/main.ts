import { mount } from "svelte";
import App from "./fixtures/app.svelte";
import Gallery from "./fixtures/gallery.svelte";
import "./style.css";
mount(new URLSearchParams(window.location.search).has("example") ? Gallery : App, {
	target: document.getElementById("app")!,
});
