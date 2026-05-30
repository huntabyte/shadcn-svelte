<script lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "$lib/registry/ui/card/index.js"
import { Skeleton } from "$lib/registry/ui/skeleton/index.js"
const rows = [0, 1]
</script>

<Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-36 rounded-md"></Skeleton>
        <div class="flex flex-col gap-1.5">
          <Skeleton class="h-4 w-full max-w-64 rounded-md"></Skeleton>
          <Skeleton class="h-4 w-48 rounded-md"></Skeleton>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-3">
          {#each rows as row}
            <div
              class="flex flex-col gap-3 rounded-xl bg-muted p-4"
            >
              <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15"></Skeleton>
              <Skeleton class="h-8 w-36 rounded-md bg-muted-foreground/15"></Skeleton>
              <Skeleton class="h-2 w-full rounded-full bg-muted-foreground/15"></Skeleton>
              <div class="flex items-center justify-between">
                <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15"></Skeleton>
                <Skeleton class="h-3 w-20 rounded-md bg-muted-foreground/15"></Skeleton>
              </div>
            </div>
{/each}
        </div>
      </CardContent>
      <CardFooter class="justify-center">
        <Skeleton class="h-3 w-56 rounded-md"></Skeleton>
      </CardFooter>
    </Card>
