import Root, {
	attachmentVariants,
	type AttachmentOrientation,
	type AttachmentSize,
	type AttachmentState,
} from "./attachment.svelte";
import Group from "./attachment-group.svelte";
import Media, {
	attachmentMediaVariants,
	type AttachmentMediaVariant,
} from "./attachment-media.svelte";
import Content from "./attachment-content.svelte";
import Title from "./attachment-title.svelte";
import Description from "./attachment-description.svelte";
import Actions from "./attachment-actions.svelte";
import Action from "./attachment-action.svelte";
import Trigger from "./attachment-trigger.svelte";

export {
	Root,
	Group,
	Media,
	Content,
	Title,
	Description,
	Actions,
	Action,
	Trigger,
	attachmentVariants,
	attachmentMediaVariants,
	type AttachmentOrientation,
	type AttachmentSize,
	type AttachmentState,
	type AttachmentMediaVariant,
	//
	Root as Attachment,
	Group as AttachmentGroup,
	Media as AttachmentMedia,
	Content as AttachmentContent,
	Title as AttachmentTitle,
	Description as AttachmentDescription,
	Actions as AttachmentActions,
	Action as AttachmentAction,
	Trigger as AttachmentTrigger,
};
