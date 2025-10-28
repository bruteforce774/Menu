// Sørg for at tsconfig har "lib": ["ES2020", "DOM"] for DOM-typene.

// CALCULATION: Pure function that compares two DOM nodes
// No side effects - just reads properties and returns a boolean
const isNodeChanged = (node1: Element, node2: Element): boolean => {
  const n1Attributes: NamedNodeMap = node1.attributes
  const n2Attributes: NamedNodeMap = node2.attributes

  if (n1Attributes.length !== n2Attributes.length) {
    return true
  }

  const hasDifferentAttribute = Array.from(n1Attributes).some(attribute => {
    const name: string = attribute.name
    const attribute1: string | null = node1.getAttribute(name)
    const attribute2: string | null = node2.getAttribute(name)
    return attribute1 !== attribute2
  })

  if (hasDifferentAttribute) {
    return true
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true
  }

  return false
}

// ACTION: This function mutates the DOM!
// It removes, adds, or replaces actual DOM elements (side effects)
export const applyDiff = (
  parentNode: Element,
  realNode?: Element,
  virtualNode?: Element
): void => {
  if (realNode && !virtualNode) {
    realNode.remove() // ACTION: DOM mutation
    return
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode) // ACTION: DOM mutation
    return
  }

  if (realNode && virtualNode && isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode) // ACTION: DOM mutation
    return
  }

  // Hvis begge er tilstede og ikke endret, diff barn rekursivt
  if (realNode && virtualNode) {
    const realChildren: Element[] = Array.from(realNode.children)
    const virtualChildren: Element[] = Array.from(virtualNode.children)

    const max = Math.max(realChildren.length, virtualChildren.length)
    for (let i = 0; i < max; i++) {
      applyDiff(
        realNode,
        realChildren[i],      // Element | undefined
        virtualChildren[i]    // Element | undefined
      )
    }
  }
}
