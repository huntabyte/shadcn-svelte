<script lang="ts">
	import { config } from "@/stores";
	import { themes } from "@/registry";
	import { ThemeWrapper } from "$lib/components/docs";
	const activeTheme = themes.find((theme) => theme.name === $config.theme);

	export let setCodeString: (node: HTMLElement) => void;

	const prefixes = [
		"card",
		"popover",
		"primary",
		"secondary",
		"muted",
		"accent",
		"destructive"
	];
</script>

<ThemeWrapper defaultTheme="zinc" class="relative space-y-4">
	<div data-rehype-pretty-code-fragment="">
		<pre
			class="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
			use:setCodeString>
            <code
				class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                <span class="line text-white">
                    @layer base &#123;
                </span>
                <span class="line text-white">&nbsp;&nbsp;:root &#123;</span>
            <span class="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVars.light["background"]};
            </span>
            <span class="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVars.light["foreground"]};
            </span>
            {#each prefixes as prefix}
					<span class="line text-white">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                {activeTheme?.cssVars.light[prefix]}
                ;
              </span>
              <span class="line text-white">
                &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                {activeTheme?.cssVars.light[`${prefix}-foreground`]}
                ;
              </span>
				{/each}
                <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                    {activeTheme?.cssVars.light["border"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                    {activeTheme?.cssVars.light["input"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                    {activeTheme?.cssVars.light["ring"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--radius: {$config.radius}rem;
                  </span>
                  <span class="line text-white">&nbsp;&nbsp;&#125;</span>
                  <span class="line text-white">&nbsp;</span>
                  <span class="line text-white">&nbsp;&nbsp;.dark &#123;</span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
                    {activeTheme?.cssVars.dark["background"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
                    {activeTheme?.cssVars.dark["foreground"]};
                  </span>
                  {#each prefixes as prefix}
					<span class="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
              {activeTheme?.cssVars.dark[prefix]}
              ;
            </span>
            <span class="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
              {activeTheme?.cssVars.dark[`${prefix}-foreground`]}
              ;
            </span>
				{/each}
                <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
                    {activeTheme?.cssVars.dark["border"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
                    {activeTheme?.cssVars.dark["input"]};
                  </span>
                  <span class="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
                    {activeTheme?.cssVars.dark["ring"]};
                  </span>
                  <span class="line text-white">&nbsp;&nbsp;&#125;</span>
                  <span class="line text-white">&#125;</span>
            </code>
        </pre>
	</div>
</ThemeWrapper>
