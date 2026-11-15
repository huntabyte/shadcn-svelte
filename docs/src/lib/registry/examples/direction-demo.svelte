<script lang="ts">
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	let direction = $state<"ltr" | "rtl">("rtl");
</script>

<div class="flex w-full max-w-sm flex-col gap-6">
	<Button variant="outline" onclick={() => (direction = direction === "rtl" ? "ltr" : "rtl")}>
		Switch to {direction === "rtl" ? "LTR" : "RTL"}
	</Button>
	<DirectionProvider {direction}>
		<div
			dir={direction}
			lang={direction === "rtl" ? "ar" : "en"}
			class="flex flex-col gap-6"
			data-testid="direction-demo"
		>
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item
						><Breadcrumb.Link href="#">{direction === "rtl" ? "الرئيسية" : "Home"}</Breadcrumb.Link
						></Breadcrumb.Item
					>
					<Breadcrumb.Separator />
					<Breadcrumb.Item
						><Breadcrumb.Page>{direction === "rtl" ? "الإعدادات" : "Settings"}</Breadcrumb.Page
						></Breadcrumb.Item
					>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<Tabs.Root value="account">
				<Tabs.List aria-label="Settings">
					<Tabs.Trigger value="account">{direction === "rtl" ? "الحساب" : "Account"}</Tabs.Trigger>
					<Tabs.Trigger value="password"
						>{direction === "rtl" ? "كلمة المرور" : "Password"}</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Root>
			<Slider type="single" value={50} aria-label="Volume" />
			<div class="flex items-center gap-2">
				<Switch id="direction-notifications" /><label for="direction-notifications"
					>{direction === "rtl" ? "الإشعارات" : "Notifications"}</label
				>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="w-fit rounded-md border px-3 py-2"
					>{direction === "rtl" ? "فتح القائمة" : "Open menu"}</DropdownMenu.Trigger
				>
				<DropdownMenu.Content align="start">
					<DropdownMenu.Group>
						<DropdownMenu.Item>{direction === "rtl" ? "الملف الشخصي" : "Profile"}</DropdownMenu.Item
						>
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger
								>{direction === "rtl" ? "المزيد" : "More"}</DropdownMenu.SubTrigger
							>
							<DropdownMenu.SubContent side={direction === "rtl" ? "left" : "right"}
								><DropdownMenu.Group
									><DropdownMenu.Item
										>{direction === "rtl" ? "الإعدادات" : "Settings"}</DropdownMenu.Item
									></DropdownMenu.Group
								></DropdownMenu.SubContent
							>
						</DropdownMenu.Sub>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</DirectionProvider>
</div>
