import { mount } from "svelte";
import App from "./fixtures/app.svelte";
import "./style.css";
mount(App, { target: document.getElementById("app")! });
