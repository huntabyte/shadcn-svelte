<script lang="ts">
	import { DateFormatter, getDayOfWeek, getLocalTimeZone, now } from "@internationalized/date";

	import type { Mail } from "../data.js";
	import * as Icons from "../icons.js";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Button, buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { Calendar } from "$lib/registry/new-york/ui/calendar/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { Switch } from "$lib/registry/new-york/ui/switch/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";

	export let mail: Mail | null = null;

	const fullFormatter = new DateFormatter("en-US", {
		dateStyle: "medium",
		timeStyle: "medium",
	});

	const relativeFormatter = new DateFormatter("en-US", {
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h12",
	});
	let todayDate = now(getLocalTimeZone());

	function getClosestWeekend() {
		const dayOfWeek = getDayOfWeek(todayDate, "en-US");
		if (dayOfWeek === 6) {
			return todayDate.toDate();
		}
		return todayDate.add({ days: 6 - dayOfWeek }).toDate();
	}
</script>

<div class="flex h-full flex-col">
	<div class="mb-1 flex items-center p-2">
		<div class="flex items-center gap-2">
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="archive_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.Archive class="size-4" />
					<span class="sr-only">Archive</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Archive</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="move_to_junk_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.ArchiveX class="size-4" />
					<span class="sr-only">Move to junk</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to junk</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="move_to_trash_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.Trash2 class="size-4" />
					<span class="sr-only">Move to trash</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Move to trash</Tooltip.Content>
			</Tooltip.Root>
			<Separator orientation="vertical" class="mx-1 h-6" />
			<Tooltip.Root openDelay={0} group>
				<Popover.Root portal={null}>
					<Tooltip.Trigger asChild let:builder={tooltip_builder} id="snooze_popover">
						<Popover.Trigger asChild let:builder={popover_builder} id="snooze_popover">
							<Button
								builders={[tooltip_builder, popover_builder]}
								variant="ghost"
								size="icon"
								disabled={!mail}
							>
								<Icons.Clock class="size-4" />
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
									<span class="text-muted-foreground ml-auto">
										{relativeFormatter.format(
											todayDate.add({ hours: 4 }).toDate()
										)}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Tomorrow
									<span class="text-muted-foreground ml-auto">
										{relativeFormatter.format(
											todayDate.add({ days: 1 }).toDate()
										)}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									This weekend
									<span class="text-muted-foreground ml-auto">
										{relativeFormatter.format(getClosestWeekend())}
									</span>
								</Button>
								<Button variant="ghost" class="justify-start font-normal">
									Next week
									<span class="text-muted-foreground ml-auto">
										{relativeFormatter.format(
											todayDate.add({ weeks: 1 }).toDate()
										)}
									</span>
								</Button>
							</div>
						</div>
						<div class="p-2">
							<Calendar bind:value={todayDate} initialFocus />
						</div>
					</Popover.Content>
				</Popover.Root>
				<Tooltip.Content>Snooze</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="ml-auto flex items-center gap-2">
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="reply_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.Reply class="size-4" />
					<span class="sr-only">Reply</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="reply_all_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.ReplyAll class="size-4" />
					<span class="sr-only">Reply all</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Reply all</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={0} group>
				<Tooltip.Trigger
					id="forward_tooltip"
					class={buttonVariants({ variant: "ghost", size: "icon" })}
					disabled={!mail}
				>
					<Icons.Forward class="size-4" />
					<span class="sr-only">Forward</span>
				</Tooltip.Trigger>
				<Tooltip.Content>Forward</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 h-6" />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				id="more_options_dropdown"
				class={buttonVariants({ variant: "ghost", size: "icon" })}
				disabled={!mail}
			>
				<Icons.EllipsisVertical class="size-4" />
				<span class="sr-only">More</span>
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
		<div class="flex h-full flex-1 flex-col overflow-hidden">
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
					<div class="text-muted-foreground ml-auto text-xs">
						{fullFormatter.format(new Date(mail.date))}
					</div>
				{/if}
			</div>
			<Separator />
			<div class="flex-1 overflow-y-auto whitespace-pre-wrap p-4 text-sm">
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
		<div class="text-muted-foreground p-8 text-center">No message selected</div>
	{/if}
</div>
