<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Share</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>Email link</Menubar.Item>
					<Menubar.Item>Messages</Menubar.Item>
					<Menubar.Sub>
						<Menubar.SubTrigger>More options</Menubar.SubTrigger>
						<Menubar.SubContent>
							<Menubar.Item>Airdrop</Menubar.Item>
							<Menubar.Item>Bluetooth</Menubar.Item>
						</Menubar.SubContent>
					</Menubar.Sub>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Separator />
			<Menubar.Item>
				Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
