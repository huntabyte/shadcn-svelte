import { defaultTraveler } from './defaultTraveler'

function attachCommentsToNode(
  traveler,
  state,
  parent,
  children,
  findHeadingComments,
) {
  let { index } = state
  const { comments } = state
  let comment = comments[index]
  // Hack to tackle https://github.com/babel/minify/issues/866
  let boundComments, trailingComments
  if (comment == null) {
    return
  }
  if (children == null || children.length === 0) {
    // No children, attach comments to parent
    boundComments = parent.comments != null ? parent.comments : []
    while (comment != null && comment.end <= parent.end) {
      boundComments.push(comment)
      comment = comments[++index]
    }
    state.index = index
    if (boundComments.length !== 0 && parent.comments == null) {
      parent.comments = boundComments
    }
    return
  }
  // Look for heading block comments not immediately followed by a child
  if (findHeadingComments) {
    boundComments = parent.comments != null ? parent.comments : []
    const { start } = children[0]
    while (
      comment != null &&
      (comment.type[0] === 'B' || comment.type[0] === 'M') &&
      comment.end <= start
    ) {
      boundComments.push(comment)
      comment = comments[++index]
    }
    if (boundComments.length !== 0 && parent.comments == null)
      parent.comments = boundComments
  }
  // Attach comments to children
  for (let i = 0, { length } = children; comment != null && i < length; i++) {
    const child = children[i]
    boundComments = []
    while (comment != null && comment.end <= child.start) {
      boundComments.push(comment)
      comment = comments[++index]
    }
    // Check if next comment is line comment and on the same line if location is provided
    if (
      comment != null &&
      comment.loc != null &&
      (comment.type[0] === 'L' || comment.type[0] === 'S')
    ) {
      if (comment.loc.start.line === child.loc.end.line) {
        boundComments.push(comment)
        comment = comments[++index]
      }
    }
    if (boundComments.length !== 0) {
      child.comments = boundComments
    }
    // Travel through child
    state.index = index
    traveler[child.type](child, state)
    index = state.index
    comment = comments[index]
  }
  // Look for remaining comments
  trailingComments = []
  while (comment != null && comment.end <= parent.end) {
    trailingComments.push(comment)
    comment = comments[++index]
  }
  if (trailingComments.length !== 0) {
    parent.trailingComments = trailingComments
  }
  state.index = index
}

function Block(node, state) {
  attachCommentsToNode(this, state, node, node.body, true)
}

let traveler = defaultTraveler.makeChild({
  Program: Block,
  BlockStatement: Block,
  ClassBody: Block,
  ObjectExpression(node, state) {
    attachCommentsToNode(this, state, node, node.properties, true)
  },
  ArrayExpression(node, state) {
    attachCommentsToNode(this, state, node, node.elements, true)
  },
  SwitchStatement(node, state) {
    attachCommentsToNode(this, state, node, node.cases, false)
  },
  SwitchCase(node, state) {
    attachCommentsToNode(this, state, node, node.consequent, false)
  },
  // TODO: Consider ArrayExpression ?
})

export function attachComments(node, comments) {
  /*
  Modifies in-place the AST starting at `node` by attaching the provided `comments` and returns that AST.
  */
  traveler[node.type](node, {
    comments,
    index: 0,
  })
  return node
}
