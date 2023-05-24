<script lang="ts">
  import { Icons } from "$components/docs/icons";
  import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading
  } from "$components/docs/page-header";
  import { buttonVariants } from "$components/ui/button";
  import { siteConfig } from "$lib/config/site";
  import { cn } from "$lib/utils";
</script>

<div class="container relative pb-10">
  <!-- <StyleSwitcher /> -->
  <PageHeader>
    <PageHeaderHeading>Build your component library.</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed components that you can copy and paste into your
      apps. Accessible. Customizable. Open Source.
    </PageHeaderDescription>
    <p class="text-sm text-red-600">
      This is an unofficial port of <a
        href={siteConfig.links.shadGithub}
        target="_blank"
        rel="noreferrer"
        class="font-medium underline underline-offset-4">shadcn/ui</a
      >
      to Svelte, and is not affiliated with
      <a
        href={siteConfig.links.shadTwitter}
        target="_blank"
        rel="noreferrer"
        class="font-medium underline underline-offset-4">@shadcn</a
      >, just inspired by him.
    </p>
    <div class="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
      <a href="/docs" class={cn(buttonVariants())}> Get Started </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.github}
        class={cn(buttonVariants({ variant: "outline" }))}
      >
        <Icons.gitHub class="mr-2 h-4 w-4" />
        GitHub
      </a>
    </div>
  </PageHeader>
  <!-- <ExamplesNav class="[&>a:first-child]:text-primary" /> -->
  <section
    class="space-y-8 overflow-hidden rounded-lg border-2 border-primary dark:border-muted md:hidden"
  >
    <img
      src=""
      width={1280}
      height={866}
      alt="Dashboard"
      class="block dark:hidden"
    />
    <img
      src=""
      width={1280}
      height={866}
      alt="Dashboard"
      class="hidden dark:block"
    />
  </section>
  <section class="hidden md:block">
    <div class="overflow-hidden rounded-lg border bg-background shadow-xl">
      <!-- <DashboardPage /> -->
      hello world
    </div>
  </section>
</div>
