<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Field.Field orientation="horizontal">
	<Input type="search" placeholder="Search..." />
	<Button>Search</Button>
</Field.Field>
