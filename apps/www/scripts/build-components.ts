import fs from "fs";
import path, { basename, dirname } from "path";

import { components } from "../src/lib/config/components";

const payload = components
  .map((component) => {
    const files = component.files?.map((file) => {
      const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");

      return {
        name: basename(file),
        dir: basename(dirname(file)),
        content
      };
    });

    return {
      ...component,
      files
    };
  })
  .sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

fs.writeFileSync(
  path.join(process.cwd(), "src/routes/api/components/components.json"),
  JSON.stringify(payload, null, 2)
);
