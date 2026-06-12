import color from "picocolors";
import { Command } from "commander";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { z } from "zod";
import * as p from "@clack/prompts";
import { ConfigError, error } from "../../utils/errors.js";
import * as cliConfig from "../../utils/config/index.js";
import { intro, handleError, prettifyList } from "../../utils/prompt-helpers.js";
import * as registry from "../../utils/registry/index.js";
import { preflightInit } from "../init/preflight.js";
import { addRegistryItems } from "../../utils/add-registry-items.js";
import { getEnvProxy } from "../../utils/get-env-proxy.js";
import { highlight } from "../../utils/colors.js";
import { type PresetConfig, decodePreset, encodePreset } from "../../preset/index.js";
import * as project from "../../utils/project.js";
import { installDependencies } from "../../utils/install-deps.js";

const initOptionsSchema = z.object({
    cwd: z.string(),
    preset: z.string().optional(),
    deps: z.boolean(),
    proxy: z.string().optional(),
    skipPreflight: z.boolean(),
});

type InitOptions = z.infer<typeof initOptionsSchema>;

export const apply = new Command()
    .command("apply")
    .description("apply a preset to an existing project")
    .option("--preset <preset>", "the preset to use")
    .option("-c, --cwd <path>", "the working directory", process.cwd())
    .option("--no-deps", "disable adding & installing dependencies")
    .option("--skip-preflight", "ignore preflight checks and continue", false)
    .option("--proxy <proxy>", "fetch items from registry using a proxy", getEnvProxy())
    .action(async (opts) => {
        intro();
        const options = initOptionsSchema.parse(opts);
        const cwd = path.resolve(options.cwd);

        try {
            // Ensure target directory exists.
            if (!existsSync(cwd)) {
                throw error(`The path ${color.cyan(cwd)} does not exist. Please try again.`);
            }

            if (options.preset === undefined) {
                throw error(`${color.bold(`--preset`)} is required.`);
            }

            const presetConfig = decodePreset(options.preset);
            if (presetConfig === null) {
                throw error(`${color.bold(`--preset ${options.preset}`)} is not a valid preset.`);
            }

            preflightInit(cwd, { skipPreflight: options.skipPreflight });

            const config = await cliConfig.getConfig(cwd);
            if (!config) {
                throw new ConfigError(
                    `Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
                );
            }

            await runApply({ cwd, config, decidedPresets: presetConfig, options });

            p.outro(`Preset ${color.bold(options.preset)} applied successfully.`);
        } catch (e) {
            handleError(e);
        }
    })

export async function runApply({
    cwd,
    config,
    decidedPresets,
    options,
}: {
    cwd: string;
    config: cliConfig.ResolvedConfig;
    decidedPresets: PresetConfig;
    options: InitOptions;
}) {
    if (options.proxy !== undefined) {
        process.env.HTTP_PROXY = options.proxy;
        p.log.info(`You are using the provided proxy: ${color.green(options.proxy)}`);
    }

    // set the config to reflect the newly applied preset
    config.iconLibrary = decidedPresets.iconLibrary;
    config.menuColor = decidedPresets.menuColor;
    config.menuAccent = decidedPresets.menuAccent;
    config.style = decidedPresets.style;
    config.tailwind.baseColor = decidedPresets.baseColor;

    const tasks: p.Task[] = [];

    tasks.push({
        title: "Applying preset to config file",
        async task() {
            cliConfig.writeConfig(cwd, config);
            return `Config file ${highlight("components.json")} created`;
        },
    });

    // we create a registry base item using the encoded preset at the /init endpoint in the docs
    const registryUrl = registry.getRegistryUrl(config);
    const encodedPreset = encodePreset(decidedPresets);
    const presetUrl = new URL(`/init?preset=${encodedPreset}`, registryUrl).toString();

    const registryIndex = await registry.getRegistryIndex(registryUrl);
    const existingComponents = await project.getComponents({
        registryIndex,
        config,
    });

    const result = await addRegistryItems({
        selectedItems: [
            presetUrl, 
            ...existingComponents
                .filter((component) => component.name !== "utils")
                .map((component) => component.name)
        ],
        config,
        deps: options.deps,
        overwrite: true,
    });

    if (options.deps) {
        await installDependencies({
            cwd,
            prompt: options.deps,
            dependencies: Array.from(result.dependencies),
            devDependencies: Array.from(result.devDependencies),
        });
    } else if (result.skippedDeps.size) {
        const prettyList = prettifyList([...result.skippedDeps], 7);
        p.log.warn(
            `shadcn-svelte has been initialized ${color.bold(color.red("without"))} the following ${highlight("dependencies")}:\n${color.gray(prettyList)}`
        );
    }

    await p.tasks(tasks);
}
