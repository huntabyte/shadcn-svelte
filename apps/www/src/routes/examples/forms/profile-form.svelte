<script lang="ts">
	import type { ZodValidation } from "sveltekit-superforms";
	import type { SuperForm } from "sveltekit-superforms/client";
	import { cn } from "@/utils";
	import * as Select from "@/registry/new-york/ui/select";
	import * as Form from "@/registry/new-york/ui/form";
	import { Label } from "@/registry/new-york/ui/label";
	import { Button } from "@/registry/new-york/ui/button";
	import { Input } from "@/registry/new-york/ui/input";
	import { Textarea } from "@/registry/new-york/ui/textarea";
	import type { AnyZodObject } from "zod";

	type T = $$Generic<AnyZodObject>;
	export let form: SuperForm<ZodValidation<T>, unknown>;
</script>

<Form.Root {form}>
	<form class="space-y-8">
		<Form.Field name="username" let:field>
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Input placeholder="shadcn" {...field()} />
				<Form.Description>
					This is your public display name. It can be your real name or a
					pseudonym. You can only change this once every 30 days.
				</Form.Description>
			</Form.Item>
		</Form.Field>
	</form>
</Form.Root>
