import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"

export function getPackageInfo() {
    const packageJsonPath = path.join("package.json")

    return fs.readJSONSync(packageJsonPath) as PackageJson
}
