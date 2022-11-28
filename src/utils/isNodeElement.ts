export const isNodeElement = (node: Node): node is Element => {
  return node.nodeType === Node.ELEMENT_NODE
}
