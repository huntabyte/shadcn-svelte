import type { RegistryItemType } from "@shadcn-svelte/registry";

type Example = {
    title: string;
    name: string;
    type: RegistryItemType;
}

export const examples: Example[] = [
    {
        title: "Accordion",
        name: "accordion",
        type: "registry:example",
    },
];