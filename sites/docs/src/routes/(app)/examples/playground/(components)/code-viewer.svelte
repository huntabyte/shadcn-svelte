<script lang="ts">
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button variant="secondary" builders={[builder]}>View code</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[625px]">
		<Dialog.Header>
			<Dialog.Title>View code</Dialog.Title>
			<Dialog.Description>
				You can use the following code to start integrating your current prompt and settings
				into your application.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4">
			<div class="rounded-md bg-black p-6">
				<pre><code class="text-muted-foreground grid gap-1 text-sm [&_span]:h-4"
						><span><span class="text-sky-300">import</span> os</span><span
							><span class="text-sky-300">import</span> openai</span
						><span /><span
							>openai.api_key = os.getenv(<span class="text-green-300"
								>&quot;OPENAI_API_KEY&quot;</span
							>)</span
						><span /><span>response = openai.Completion.create(</span><span> model=<span
								class="text-green-300">&quot;davinci&quot;</span
							>,</span
						><span> prompt=<span class="text-amber-300">&quot;&quot;</span>,</span
						><span> temperature=<span class="text-amber-300">0.9</span>,</span
						><span> max_tokens=<span class="text-amber-300">5</span>,</span
						><span> top_p=<span class="text-amber-300">1</span>,</span
						><span> frequency_penalty=<span class="text-amber-300">0</span>,</span
						><span> presence_penalty=<span class="text-green-300">0</span>,</span><span
							>)</span
						></code
					></pre>
			</div>
			<div>
				<p class="text-muted-foreground text-sm">
					Your API Key can be found here. You should use environment variables or a secret
					management tool to expose your key to your applications.
				</p>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
