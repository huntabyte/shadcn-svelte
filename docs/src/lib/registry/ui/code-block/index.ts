import Actions from "./code-block-actions.svelte";
import Content from "./code-block-content.svelte";
import CopyButton from "./code-block-copy-button.svelte";
import Footer from "./code-block-footer.svelte";
import Header from "./code-block-header.svelte";
import Title from "./code-block-title.svelte";
import Line, {
	codeBlockLineVariants,
	type CodeBlockLineToken,
	type CodeBlockLineVariant,
} from "./code-block-line.svelte";
import Root, {
	codeBlockVariants,
	type CodeBlockSize,
	type CodeBlockVariant,
} from "./code-block.svelte";

export {
	Root,
	Header,
	Title,
	Actions,
	CopyButton,
	Content,
	Line,
	Footer,
	codeBlockVariants,
	codeBlockLineVariants,
	type CodeBlockVariant,
	type CodeBlockSize,
	type CodeBlockLineVariant,
	type CodeBlockLineToken,
	//
	Root as CodeBlock,
	Header as CodeBlockHeader,
	Title as CodeBlockTitle,
	Actions as CodeBlockActions,
	CopyButton as CodeBlockCopyButton,
	Content as CodeBlockContent,
	Line as CodeBlockLine,
	Footer as CodeBlockFooter,
};
