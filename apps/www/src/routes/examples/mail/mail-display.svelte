<script lang="ts">
	// import Time, { dayjs } from 'svelte-time';
	import { today, getLocalTimeZone } from "@internationalized/date";

	import Archive from "lucide-svelte/icons/archive";
	import ArchiveX from "lucide-svelte/icons/archive-x";
	import Clock from "lucide-svelte/icons/clock";
	import Forward from "lucide-svelte/icons/forward";
	import MoreVertical from "lucide-svelte/icons/more-vertical";
	import Reply from "lucide-svelte/icons/reply";
	import ReplyAll from "lucide-svelte/icons/reply-all";
	import Trash2 from "lucide-svelte/icons/trash-2";

	import * as Avatar from "@/registry/default/ui/avatar";
	import { Button } from "@/registry/default/ui/button";
	import { Calendar } from "@/registry/default/ui/calendar";
	import * as DropdownMenu from "@/registry/default/ui/dropdown-menu";
	import { Label } from "@/registry/default/ui/label";
	import * as Popover from "@/registry/default/ui/popover";
	import { Separator } from "@/registry/default/ui/separator";
	import { Switch } from "@/registry/default/ui/switch";
	import { Textarea } from "@/registry/default/ui/textarea";
	import * as Tooltip from "@/registry/default/ui/tooltip";
	import type { Mail } from "./data";

	export let mail: Mail | null = null;

	let value = today(getLocalTimeZone());
</script>

<div class="flex h-full flex-col">
	<div class="flex items-center p-2">
		<div class="flex items-center gap-2">
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="archive_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<Archive class="size-4" />
						<span class="sr-only">Archive</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Archive</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="move_to_junk_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<ArchiveX class="size-4" />
						<span class="sr-only">Move to junk</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to junk</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="move_to_trash_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<Trash2 class="size-4" />
						<span class="sr-only">Move to trash</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to trash</Tooltip.Content>
			</Tooltip.Root>
			<Separator orientation="vertical" class="mx-1 h-6" />
			<Tooltip.Root openDelay={0}>
				<Popover.Root portal={null}>
					<Tooltip.Trigger asChild let:builder={tooltip_builder} id="snooze_tooltip">
						<Popover.Trigger asChild let:builder={popover_builder} id="snooze_popover">
							<Button
								builders={[tooltip_builder, popover_builder]}
								variant="ghost"
								size="icon"
								disabled={!mail}
							>
								<Clock class="size-4" />
								<span class="sr-only">Snooze</span>
							</Button>
						</Popover.Trigger>
					</Tooltip.Trigger>
					<Popover.Content class="flex w-[535px] p-0">
						<div class="flex flex-col gap-2 border-r px-2 py-4">
							<div class="px-4 text-sm font-medium">Snooze until</div>
							<div class="grid min-w-[250px] gap-1">
								<Button variant="ghost" class="justify-start font-normal">
									Later today
									<span class="ml-auto text-muted-foreground">
										<!-- <Time
											timestamp={dayjs().add(4, "hours")}
											format="ddd, h:mm A"
										/> -->
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Tomorrow
									<span class="ml-auto text-muted-foreground">
										<!-- <Time
											timestamp={dayjs().add(1, "day")}
											format="ddd, h:mm A"
										/> -->
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									This weekend
									<span class="ml-auto text-muted-foreground">
										<!-- <Time timestamp={dayjs().day(6)} format="ddd, h:mm A" /> -->
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Next week
									<span class="ml-auto text-muted-foreground">
										<!-- <Time
											timestamp={dayjs().add(1, "week")}
											format="ddd, h:mm A"
										/> -->
									</span>
								</Button>
							</div>
						</div>
						<Calendar bind:value initialFocus class="p-2" />
					</Popover.Content>
				</Popover.Root>
				<Tooltip.Content>Snooze</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="ml-auto flex items-center gap-2">
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="reply_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<Reply class="size-4" />
						<span class="sr-only">Reply</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="reply_all_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<ReplyAll class="size-4" />
						<span class="sr-only">Reply all</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply all</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder id="forward_tooltip">
					<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
						<Forward class="size-4" />
						<span class="sr-only">Forward</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Forward</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder id="more_options_dropdown">
				<Button builders={[builder]} variant="ghost" size="icon" disabled={!mail}>
					<MoreVertical class="size-4" />
					<span class="sr-only">More</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
				<DropdownMenu.Item>Star thread</DropdownMenu.Item>
				<DropdownMenu.Item>Add label</DropdownMenu.Item>
				<DropdownMenu.Item>Mute thread</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<Separator />
	{#if mail}
		<div class="flex flex-1 flex-col">
			<div class="flex items-start p-4">
				<div class="flex items-start gap-4 text-sm">
					<Avatar.Root>
						<Avatar.Image alt={mail.name} />
						<Avatar.Fallback>
							{mail.name
								.split(" ")
								.map((chunk) => chunk[0])
								.join("")}
						</Avatar.Fallback>
					</Avatar.Root>
					<div class="grid gap-1">
						<div class="font-semibold">{mail.name}</div>
						<div class="line-clamp-1 text-xs">{mail.subject}</div>
						<div class="line-clamp-1 text-xs">
							<span class="font-medium">Reply-To:</span>
							{mail.email}
						</div>
					</div>
				</div>
				{#if mail.date}
					<div class="ml-auto text-xs text-muted-foreground">
						<!-- <Time timestamp={new Date(mail.date)} format="MMM D, YYYY, h:mm:ss A" /> -->
					</div>
				{/if}
			</div>
			<Separator />
			<div class="flex-1 whitespace-pre-wrap p-4 text-sm">
				{mail.text}
			</div>
			<Separator class="mt-auto" />
			<div class="p-4">
				<form>
					<div class="grid gap-4">
						<Textarea class="p-4" placeholder={`Reply ${mail.name}...`} />
						<div class="flex items-center">
							<Label for="mute" class="flex items-center gap-2 text-xs font-normal">
								<Switch id="mute" aria-label="Mute thread" /> Mute this thread
							</Label>
							<Button size="sm" class="ml-auto">Send</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<div class="p-8 text-center text-muted-foreground">No message selected</div>
	{/if}
</div>
