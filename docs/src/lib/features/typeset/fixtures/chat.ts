// Assistant chat answer: the core genre. Short paragraphs, scannable lists,
// a small table, code, and a closing question. The user bubble that precedes
// it is page chrome, rendered outside the typeset container.
export const CHAT_QUESTION =
	"My SvelteKit dev server takes forever to start. How do I figure out what's actually slow?";

export const CHAT_HTML = `
<p>Slow dev startup in SvelteKit almost always comes down to one of three things: module count, heavy config work at boot, or something outside the compiler entirely. Here's how to narrow it down fast.</p>
<h3>1. Get a baseline</h3>
<p>Start the server with profiling on and note the two numbers it prints:</p>
<pre><code>vite dev --debug --profile</code></pre>
<ul>
<li><strong>Startup time</strong>: everything before "Ready". Config loading, env files, plugins.</li>
<li><strong>First compile</strong>: the time after you hit a route. Module graph size lives here.</li>
</ul>
<h3>2. Check the usual suspects</h3>
<table>
<thead>
<tr><th>Symptom</th><th>Likely cause</th></tr>
</thead>
<tbody>
<tr><td>Slow before "Ready"</td><td>Heavy <code>vite.config</code>, sync I/O in config, large <code>.env</code> cascade</td></tr>
<tr><td>Slow first page</td><td>Barrel files pulling in whole icon or UI libraries</td></tr>
<tr><td>Slow every save</td><td>Type checking or lint running in the dev loop</td></tr>
</tbody>
</table>
<p>The barrel-file one is the classic. A single <code>import { Check } from "@lucide/svelte"</code> through a barrel can pull thousands of modules into the graph. Fix it with a direct import:</p>
<pre><code>import Check from "@lucide/svelte/icons/check";</code></pre>
<h3>3. Measure, don't guess</h3>
<p>If neither jumps out, generate a trace and look at the actual spans:</p>
<pre><code>vite dev --profile
# reproduce the slow start, then:
open CPU*.cpuprofile</code></pre>
<blockquote><p>Compare against a bare <code>sv create</code> app on the same machine first. If that's also slow, the problem is your machine or antivirus scanning <code>node_modules</code>, not your app.</p></blockquote>
<p>Want to paste the first few lines of your trace output? I can point at the exact span that's eating the time.</p>
`;
