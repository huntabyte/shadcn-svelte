<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
</script>

<Select.Root type="single">
	<Select.Trigger class="w-full max-w-64">Select a timezone</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>North America</Select.Label>
			<Select.Item value="est">Eastern Standard Time</Select.Item>
			<Select.Item value="cst">Central Standard Time</Select.Item>
			<Select.Item value="mst">Mountain Standard Time</Select.Item>
			<Select.Item value="pst">Pacific Standard Time</Select.Item>
			<Select.Item value="akst">Alaska Standard Time</Select.Item>
			<Select.Item value="hst">Hawaii Standard Time</Select.Item>
		</Select.Group>
		<Select.Group>
			<Select.Label>Europe & Africa</Select.Label>
			<Select.Item value="gmt">Greenwich Mean Time</Select.Item>
			<Select.Item value="cet">Central European Time</Select.Item>
			<Select.Item value="eet">Eastern European Time</Select.Item>
			<Select.Item value="west">Western European Summer Time</Select.Item>
			<Select.Item value="cat">Central Africa Time</Select.Item>
			<Select.Item value="eat">East Africa Time</Select.Item>
		</Select.Group>
		<Select.Group>
			<Select.Label>Asia</Select.Label>
			<Select.Item value="msk">Moscow Time</Select.Item>
			<Select.Item value="ist">India Standard Time</Select.Item>
			<Select.Item value="cst_china">China Standard Time</Select.Item>
			<Select.Item value="jst">Japan Standard Time</Select.Item>
			<Select.Item value="kst">Korea Standard Time</Select.Item>
			<Select.Item value="ist_indonesia">Indonesia Central Standard Time</Select.Item>
		</Select.Group>
		<Select.Group>
			<Select.Label>Australia & Pacific</Select.Label>
			<Select.Item value="awst">Australian Western Standard Time</Select.Item>
			<Select.Item value="acst">Australian Central Standard Time</Select.Item>
			<Select.Item value="aest">Australian Eastern Standard Time</Select.Item>
			<Select.Item value="nzst">New Zealand Standard Time</Select.Item>
			<Select.Item value="fjt">Fiji Time</Select.Item>
		</Select.Group>
		<Select.Group>
			<Select.Label>South America</Select.Label>
			<Select.Item value="art">Argentina Time</Select.Item>
			<Select.Item value="bot">Bolivia Time</Select.Item>
			<Select.Item value="brt">Brasilia Time</Select.Item>
			<Select.Item value="clt">Chile Standard Time</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
