<script lang="ts">
	import DialogScrollableContent from "./dialog-scrollable-content.svelte";
	import DialogWithForm from "./dialog-with-form.svelte";
	import DialogWithStickyFooter from "./dialog-with-sticky-footer.svelte";
</script>

<div class="flex flex-col items-start gap-4 md:flex-row">
	<DialogWithForm />
	<DialogScrollableContent />
	<DialogWithStickyFooter />
</div>
