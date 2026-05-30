<script lang="ts">
import {
  ArrowRight02Icon,
  ArrowUp01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/svelte"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "$lib/registry/ui/alert-dialog/index.js"
import { Badge } from "$lib/registry/ui/badge/index.js"
import { Button } from "$lib/registry/ui/button/index.js"
import { ButtonGroup } from "$lib/registry/ui/button-group/index.js"
import { Card, CardContent } from "$lib/registry/ui/card/index.js"
import { Checkbox } from "$lib/registry/ui/checkbox/index.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "$lib/registry/ui/dropdown-menu/index.js"
import { Field, FieldGroup } from "$lib/registry/ui/field/index.js"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "$lib/registry/ui/input-group/index.js"
import { RadioGroup, RadioGroupItem } from "$lib/registry/ui/radio-group/index.js"
import { Switch } from "$lib/registry/ui/switch/index.js"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "$lib/registry/ui/tabs/index.js"
import { Textarea } from "$lib/registry/ui/textarea/index.js"
"use client"
</script>

<Card class="w-full">
      <CardContent class="flex flex-col gap-6">
        <div class="flex gap-2">
          <Button>
            Button{" "}
            <HugeiconsIcon icon={ArrowRight02Icon}
              stroke-width={2}
              data-icon="inline-end"></HugeiconsIcon>
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name"></InputGroupInput>
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <HugeiconsIcon icon={Search01Icon} stroke-width={2}></HugeiconsIcon>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field class="flex-1">
            <Textarea placeholder="Message" class="resize-none"></Textarea>
          </Field>
        </FieldGroup>
        <div class="flex items-center gap-2">
          <div class="flex gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline" class="hidden 4xl:flex">
              Outline
            </Badge>
          </div>
          <RadioGroup
            value="apple"
            class="ml-auto flex w-fit gap-3"
            aria-label="Fruit preference"
          >
            <RadioGroupItem value="apple" aria-label="Apple"></RadioGroupItem>
            <RadioGroupItem value="banana" aria-label="Banana"></RadioGroupItem>
          </RadioGroup>
          <div class="flex gap-3">
            <Checkbox checked aria-label="Enable email alerts"></Checkbox>
            <Checkbox class="hidden 4xl:flex"
              aria-label="Enable push alerts"></Checkbox>
          </div>
          <Switch checked
            class="flex 4xl:hidden"
            aria-label="Enable compact notifications"></Switch>
        </div>
        <div class="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger class="cn-button cn-button-variant-outline cn-button-size-default">
              <span class="hidden md:flex style-sera:md:hidden">
                Alert Dialog
              </span>
              <span class="flex md:hidden style-sera:md:flex">Dialog</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device and your data?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonGroup class="ml-auto">
            <Button variant="outline">
              <span class="style-sera:hidden">Button Group</span>
              <span class="hidden style-sera:block">Group</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                class="cn-button cn-button-variant-outline cn-button-size-icon"
                aria-label="Open quick actions"
              >
                <HugeiconsIcon icon={ArrowUp01Icon} stroke-width={2}></HugeiconsIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" class="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Switch checked
            class="hidden 4xl:flex"
            aria-label="Enable advanced setting"></Switch>
        </div>
      </CardContent>
    </Card>
