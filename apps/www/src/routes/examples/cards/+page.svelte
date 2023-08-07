<script lang="ts">
	import DemoCookieSettings from "./(components)/CookieSettings.svelte";
	import DemoCreateAccount from "./(components)/CreateAccount.svelte";
	import DemoContainer from "./(components)/DemoContainer.svelte";
	import DemoNotifications from "./(components)/Notifications.svelte";
	import DemoPaymentMethod from "./(components)/PaymentMethod.svelte";
	import DemoShareDocument from "./(components)/ShareDocument.svelte";
	import DemoGithub from "./(components)/GithubCard.svelte";
	import DemoReportAnIssue from "./(components)/ReportAnIssue.svelte";
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
			<DemoPaymentMethod />
		</DemoContainer>
	</div>
	<div class="col-span-2 grid items-start gap-6 lg:col-span-1">
		<DemoContainer>
			<DemoShareDocument />
		</DemoContainer>
		<DemoContainer>
			<DemoNotifications />
		</DemoContainer>
	</div>
	<div
		class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1"
	>
		<DemoContainer>
			<DemoReportAnIssue />
		</DemoContainer>
		<DemoContainer>
			<DemoGithub />
		</DemoContainer>
		<DemoContainer>
			<DemoCookieSettings />
		</DemoContainer>
	</div>
</div>
