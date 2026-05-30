<script lang="ts">
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/svelte"
import { Button } from "$lib/registry/ui/button/index.js"
import { Card, CardContent } from "$lib/registry/ui/card/index.js"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "$lib/registry/ui/empty/index.js"
</script>

<Card>
      <CardContent>
        <Empty class="p-4">
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Add01Icon} stroke-width={2}></HugeiconsIcon>
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Distribute Track</EmptyTitle>
            <EmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Create Release</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
