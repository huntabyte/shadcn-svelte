<script lang="ts">
	import type { PageData } from "./$types";

	import RegisterForm from "./RegisterForm.svelte";

	export let data: PageData;
</script>

<RegisterForm data={data.form} />
