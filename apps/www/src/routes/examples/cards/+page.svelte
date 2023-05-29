<script lang="ts">
	import DemoCookieSettings from "./CookieSettings.svelte";
	import DemoCreateAccount from "./CreateAccount.svelte";
	import DemoContainer from "./DemoContainer.svelte";
	import DemoNotifications from "./Notifications.svelte";
	import DemoPaymentMethod from "./PaymentMethod.svelte";
</script>

<div class="md:hidden">
	<img
		src="/examples/cards-light.png"
		width={1280}
		height={1214}
		alt="Cards"
		class="block dark:hidden"
	/>
	<img
		src="/examples/cards-dark.png"
		width={1280}
		height={1214}
		alt="Cards"
		class="hidden dark:block"
	/>
</div>
<div
	class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3"
>
	<div class="col-span-3 grid items-start gap-6 lg:col-span-1">
		<DemoContainer>
			<DemoCreateAccount />
		</DemoContainer>
		<DemoContainer>
			<DemoNotifications />
		</DemoContainer>
	</div>
	<div class="col-span-3 grid items-start gap-6 lg:col-span-2">
		<DemoContainer>
			<DemoPaymentMethod />
		</DemoContainer>
		<DemoContainer>
			<DemoCookieSettings />
		</DemoContainer>
	</div>
</div>
