// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.

export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent;

  if (!userAgent) {
    return "npm";
  }

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  return "npm";
}
