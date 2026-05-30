<script lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "$lib/registry/ui/card/index.js"
import { Skeleton } from "$lib/registry/ui/skeleton/index.js"
</script>

<Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-36 rounded-md"></Skeleton>
        <Skeleton class="h-4 w-64 rounded-md"></Skeleton>
        <CardAction>
          <Skeleton class="size-8 rounded-md"></Skeleton>
        </CardAction>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-32 rounded-md"></Skeleton>
          <Skeleton class="h-9 w-full rounded-lg"></Skeleton>
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-24 rounded-md"></Skeleton>
          <Skeleton class="h-9 w-full rounded-lg"></Skeleton>
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-20 rounded-md"></Skeleton>
          <Skeleton class="h-9 w-full rounded-lg"></Skeleton>
        </div>
        <div class="flex flex-col gap-3 rounded-xl bg-muted p-4">
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-28 rounded-md bg-muted-foreground/15"></Skeleton>
            <Skeleton class="h-4 w-24 rounded-md bg-muted-foreground/15"></Skeleton>
          </div>
          <Skeleton class="h-px w-full rounded-none bg-muted-foreground/15"></Skeleton>
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-28 rounded-md bg-muted-foreground/15"></Skeleton>
            <Skeleton class="h-4 w-12 rounded-md bg-muted-foreground/15"></Skeleton>
          </div>
          <Skeleton class="h-px w-full rounded-none bg-muted-foreground/15"></Skeleton>
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-24 rounded-md bg-muted-foreground/15"></Skeleton>
            <Skeleton class="h-4 w-20 rounded-md bg-muted-foreground/15"></Skeleton>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton class="h-9 w-full rounded-lg"></Skeleton>
      </CardFooter>
    </Card>
