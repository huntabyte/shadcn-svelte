<script lang="ts">
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Group class="px-0">
	<Sidebar.GroupContent>
		<Calendar
			readonly
			type="single"
			class="[&_[role=gridcell]_[role=button][data-today]]:bg-sidebar-primary [&_[role=gridcell]_[role=button][data-today]]:text-sidebar-primary-foreground select-none [&_[role=gridcell]]:w-[33px]"
		/>
	</Sidebar.GroupContent>
</Sidebar.Group>
