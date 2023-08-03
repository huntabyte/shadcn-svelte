import {
	createProgress,
	type CreateProgressProps as ProgressProps,
	melt
} from "@melt-ui/svelte";
export { melt, ProgressProps };
export { default as Progress } from "./Progress.svelte";

export const ctx = {
	getProgress: (props: ProgressProps) => {
		const {
			elements: { root }
		} = createProgress(props);

		return root;
	}
};
