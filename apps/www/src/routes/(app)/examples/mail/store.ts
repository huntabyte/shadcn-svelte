import { writable } from "svelte/store";
import { type Mail, mails } from "./data.js";

type MailStore = {
	selected: Mail["id"] | null;
};

function createMailStore() {
	const store = writable<MailStore>({ selected: mails[0].id });

	return {
		subscribe: store.subscribe,
		setMail: (id: Mail["id"]) => {
			store.update((store) => ({ ...store, selected: id }));
		},
	};
}

export const mailStore = createMailStore();
