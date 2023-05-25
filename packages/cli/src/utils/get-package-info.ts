// Credit to @shadcn for the original code. It has been slightly modified to fit the needs of this project.

import fs from "fs-extra";
import path from "path";
import { type PackageJson } from "type-fest";

export function getPackageInfo() {
  const packageJsonPath = path.join("package.json");

  return fs.readJSONSync(packageJsonPath) as PackageJson;
}
