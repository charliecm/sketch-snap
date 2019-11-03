/**
 * Utilities
 */

function getArtboard(layer) {
  if (layer.type === "Artboard") {
    return layer
  } else if (layer.parent) {
    return getArtboard(layer.parent)
  }
  return null
}

function getLayersBelow(artboard, target, targetTop, layer, output) {
  output = output || {
    layers: [],
    top: Number.MAX_SAFE_INTEGER
  }
  layer = layer || artboard
  const frame = layer.frame.changeBasis({
    from: layer.parent,
    to: artboard
  })
  if (layer.id === target.id) return output
  if (
    layer.id !== target.parent.id &&
    layer.type !== "Artboard" &&
    frame.y >= targetTop
  ) {
    output.top = Math.min(output.top, frame.y)
    output.layers.push(layer)
  } else {
    const children = layer.layers
    if (children && children.length) {
      for (const child of children) {
        output = getLayersBelow(artboard, target, targetTop, child, output)
      }
    }
  }
  return output
}

export { getArtboard, getLayersBelow }
