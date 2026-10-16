<script lang="ts">
	import CodeBlockActions from "./code-block-actions.svelte";
	import CodeBlockCardDialog from "./code-block-card-dialog.svelte";
	import CodeBlockChatAnswer from "./code-block-chat-answer.svelte";
	import CodeBlockDestructive from "./code-block-destructive.svelte";
	import CodeBlockDiffWrap from "./code-block-diff-wrap.svelte";
	import CodeBlockDiff from "./code-block-diff.svelte";
	import CodeBlockEmpty from "./code-block-empty.svelte";
	import CodeBlockHeaderEdges from "./code-block-header-edges.svelte";
	import CodeBlockHeader from "./code-block-header.svelte";
	import CodeBlockHeight from "./code-block-height.svelte";
	import CodeBlockHighlightedLines from "./code-block-highlighted-lines.svelte";
	import CodeBlockLanguages from "./code-block-languages.svelte";
	import CodeBlockLineNumbers from "./code-block-line-numbers.svelte";
	import CodeBlockMarkdown from "./code-block-markdown.svelte";
	import CodeBlockPlain from "./code-block-plain.svelte";
	import CodeBlockRtl from "./code-block-rtl.svelte";
	import CodeBlockShowMoreScroll from "./code-block-show-more-scroll.svelte";
	import CodeBlockShowMore from "./code-block-show-more.svelte";
	import CodeBlockSingleLine from "./code-block-single-line.svelte";
	import CodeBlockSmallCombinations from "./code-block-small-combinations.svelte";
	import CodeBlockSmallDestructive from "./code-block-small-destructive.svelte";
	import CodeBlockSmall from "./code-block-small.svelte";
	import CodeBlockStartLine from "./code-block-start-line.svelte";
	import CodeBlockStreaming from "./code-block-streaming.svelte";
	import CodeBlockSyntaxHighlighting from "./code-block-syntax-highlighting.svelte";
	import CodeBlockTabs from "./code-block-tabs.svelte";
	import CodeBlockTrace from "./code-block-trace.svelte";
	import CodeBlockTypeset from "./code-block-typeset.svelte";
	import CodeBlockWrapLineNumbers from "./code-block-wrap-line-numbers.svelte";
	import CodeBlockWrap from "./code-block-wrap.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper class="md:grid-cols-1">
	<CodeBlockPlain />
	<CodeBlockWrap />
	<CodeBlockLineNumbers />
	<CodeBlockHeader />
	<CodeBlockActions />
	<CodeBlockDestructive />
	<CodeBlockDiff />
	<CodeBlockHighlightedLines />
	<CodeBlockHeight />
	<CodeBlockShowMore />
	<CodeBlockShowMoreScroll />
	<CodeBlockSyntaxHighlighting />
	<CodeBlockEmpty />
	<CodeBlockSmall />
	<CodeBlockSmallDestructive />
	<CodeBlockTrace />
	<CodeBlockTypeset />
	<CodeBlockWrapLineNumbers />
	<CodeBlockStartLine />
	<CodeBlockDiffWrap />
	<CodeBlockHeaderEdges />
	<CodeBlockSingleLine />
	<CodeBlockSmallCombinations />
	<CodeBlockStreaming />
	<CodeBlockMarkdown />
	<CodeBlockLanguages />
	<CodeBlockCardDialog />
	<CodeBlockChatAnswer />
	<CodeBlockTabs />
	<CodeBlockRtl />
</ExampleWrapper>
