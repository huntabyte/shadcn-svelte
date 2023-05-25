import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import components from "./components.json";

export const GET: RequestHandler = async () => {
  return json(components);
};
