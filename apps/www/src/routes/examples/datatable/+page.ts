import type { PageLoad } from "./$types";
import { paymentData } from "./data";

export const load: PageLoad = async () => {
	return {
		paymentData
	};
};
