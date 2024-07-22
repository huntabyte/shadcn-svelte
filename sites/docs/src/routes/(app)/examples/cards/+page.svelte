<script lang="ts">
	import {
		CardsCookieSettings,
		CardsCreateAccount,
		CardsGithub,
		CardsNotifications,
		CardsPaymentMethod,
		CardsReportIssue,
		CardsShare,
		CardsTeamMembers,
		DemoContainer,
	} from "./(components)/index.js";
	import CardsLight from "$lib/img/examples/cards-light.png?enhanced";
	import CardsDark from "$lib/img/examples/cards-dark.png?enhanced";
</script>

<div class="md:hidden">
	<enhanced:img src={CardsLight} alt="Cards" class="block dark:hidden" />
	<enhanced:img src={CardsDark} alt="Cards" class="hidden dark:block" />
</div>
<div
	class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3"
>
	<div class="col-span-2 grid items-start gap-6 lg:col-span-1">
		<DemoContainer>
			<CardsCreateAccount />
		</DemoContainer>
		<DemoContainer>
			<CardsPaymentMethod />
		</DemoContainer>
	</div>
	<div class="col-span-2 grid items-start gap-6 lg:col-span-1">
		<DemoContainer>
			<CardsTeamMembers />
		</DemoContainer>
		<DemoContainer>
			<CardsShare />
		</DemoContainer>
		<DemoContainer />
		<DemoContainer>
			<CardsNotifications />
		</DemoContainer>
	</div>
	<div
		class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1"
	>
		<DemoContainer>
			<CardsReportIssue />
		</DemoContainer>
		<DemoContainer>
			<CardsGithub />
		</DemoContainer>
		<DemoContainer>
			<CardsCookieSettings />
		</DemoContainer>
	</div>
</div>
