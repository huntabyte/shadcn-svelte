import Action from "./attachment-action.svelte";
import Actions from "./attachment-actions.svelte";
import Content from "./attachment-content.svelte";
import Description from "./attachment-description.svelte";
import Group from "./attachment-group.svelte";
import Media from "./attachment-media.svelte";
import Title from "./attachment-title.svelte";
import Trigger from "./attachment-trigger.svelte";
import Root, {
	attachmentVariants,
	type AttachmentOrientation,
	type AttachmentSize,
} from "./attachment.svelte";

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
	Root as Attachment,
	Group as AttachmentGroup,
	Media as AttachmentMedia,
	Content as AttachmentContent,
	Title as AttachmentTitle,
	Description as AttachmentDescription,
	Actions as AttachmentActions,
	Action as AttachmentAction,
	Trigger as AttachmentTrigger,
	attachmentVariants,
	type AttachmentOrientation,
	type AttachmentSize,
};
