<script lang="ts">
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/svelte"
import { Button } from "$lib/registry/ui/button/index.js"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "$lib/registry/ui/card/index.js"
import { Field, FieldGroup, FieldLabel } from "$lib/registry/ui/field/index.js"
import { Input } from "$lib/registry/ui/input/index.js"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "$lib/registry/ui/item/index.js"
</script>

<Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="email-address">Email Address</FieldLabel>
            <Input id="email-address"
              type="email"
              placeholder="artist@studio.inc"></Input>
          </Field>
          <Field>
            <div class="flex items-center justify-between">
              <FieldLabel for="current-password">
                Current Password
              </FieldLabel>
              <a
                href="/"
                class="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
              >
                Forgot?
              </a>
            </div>
            <Input id="current-password"
              type="password"
              placeholder="••••••••••••••••••••••••"></Input>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter class="flex-col gap-4">
        <Button class="w-full">
          <HugeiconsIcon icon={SquareLock02Icon} stroke-width={2}></HugeiconsIcon>
          Update Security
        </Button>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <HugeiconsIcon icon={AlertCircleIcon}
              class="text-destructive"
              stroke-width={2}></HugeiconsIcon>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription class="line-clamp-1">
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <HugeiconsIcon icon={ArrowRight01Icon}
            class="size-4"
            stroke-width={2}></HugeiconsIcon>
        </Item>
      </CardFooter>
    </Card>
