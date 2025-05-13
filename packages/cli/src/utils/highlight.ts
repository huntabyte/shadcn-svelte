import color from "chalk";

export const highlight = (...args: unknown[]) => color.bold.cyan(...args);
