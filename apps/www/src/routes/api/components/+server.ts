import type { RequestHandler } from "./$types";
import components from "./components.json";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  return json(components);
};
