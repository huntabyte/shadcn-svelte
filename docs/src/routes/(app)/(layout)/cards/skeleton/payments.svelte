<script lang="ts">
import { Card, CardContent, CardHeader } from "$lib/registry/ui/card/index.js"
import { Skeleton } from "$lib/registry/ui/skeleton/index.js"
const rows = [0, 1, 2]
</script>

<Card>
      <CardHeader class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Skeleton class="h-4 w-12 rounded-md"></Skeleton>
          <Skeleton class="size-1.5 rounded-full"></Skeleton>
          <Skeleton class="size-7 rounded-md"></Skeleton>
          <Skeleton class="size-1.5 rounded-full"></Skeleton>
          <Skeleton class="h-4 w-20 rounded-md"></Skeleton>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2">
          {#each rows as row}
            <div
              class="flex items-center gap-3 rounded-xl bg-muted p-3"
            >
              <Skeleton class="size-9 rounded-lg bg-muted-foreground/15"></Skeleton>
              <div class="flex flex-1 flex-col gap-2">
                <Skeleton class="h-4 w-40 rounded-md bg-muted-foreground/15"></Skeleton>
                <Skeleton class="h-3 w-56 rounded-md bg-muted-foreground/15"></Skeleton>
              </div>
              <Skeleton class="size-4 rounded-md bg-muted-foreground/15"></Skeleton>
            </div>
{/each}
        </div>
      </CardContent>
    </Card>
