<script lang="ts">
	import AvatarImg1 from "$lib/img/avatars/01.png";
	import AvatarImg2 from "$lib/img/avatars/02.png";
	import AvatarImg3 from "$lib/img/avatars/03.png";
	import AvatarImg4 from "$lib/img/avatars/04.png";
	import AvatarImg5 from "$lib/img/avatars/05.png";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
</script>

<div class="space-y-8">
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={AvatarImg1} alt="Avatar" />
			<Avatar.Fallback>OM</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Olivia Martin</p>
			<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$1,999.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="flex h-9 w-9 items-center justify-center space-y-0 border">
			<Avatar.Image src={AvatarImg2} alt="Avatar" />
			<Avatar.Fallback>JL</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Jackson Lee</p>
			<p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={AvatarImg3} alt="Avatar" />
			<Avatar.Fallback>IN</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
			<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$299.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={AvatarImg4} alt="Avatar" />
			<Avatar.Fallback>WK</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">William Kim</p>
			<p class="text-sm text-muted-foreground">will@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$99.00</div>
	</div>
	<div class="flex items-center">
		<Avatar.Root class="h-9 w-9">
			<Avatar.Image src={AvatarImg5} alt="Avatar" />
			<Avatar.Fallback>SD</Avatar.Fallback>
		</Avatar.Root>
		<div class="ml-4 space-y-1">
			<p class="text-sm font-medium leading-none">Sofia Davis</p>
			<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
		</div>
		<div class="ml-auto font-medium">+$39.00</div>
	</div>
</div>
