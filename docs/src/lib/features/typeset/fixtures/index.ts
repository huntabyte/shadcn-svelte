import { ARTICLE_HTML } from "./article.js";
import { CHANGELOG_HTML } from "./changelog.js";
import { CHAT_HTML } from "./chat.js";
import { DOCS_HTML } from "./docs.js";
import { KITCHEN_SINK_HTML } from "./elements.js";
import { NOTES_HTML } from "./notes.js";
import { RECIPE_HTML } from "./recipe.js";
import { TAILWIND_HTML } from "./tailwind.js";

export const FIXTURES = {
	docs: DOCS_HTML,
	chat: CHAT_HTML,
	article: ARTICLE_HTML,
	changelog: CHANGELOG_HTML,
	notes: NOTES_HTML,
	recipe: RECIPE_HTML,
	elements: KITCHEN_SINK_HTML,
	tailwind: TAILWIND_HTML,
} as const;

export const CONTENT_OPTIONS = [
	{ value: "docs", label: "Docs" },
	{ value: "chat", label: "Chat" },
	{ value: "article", label: "Article" },
	{ value: "changelog", label: "Changelog" },
	{ value: "notes", label: "Notes" },
] as const;

export type FixtureName = (typeof CONTENT_OPTIONS)[number]["value"];
