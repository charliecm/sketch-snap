import sketch from "sketch"

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

export default function() {
  var doc = require("sketch/dom").Document.getSelectedDocument()
  var selection = doc.selectedLayers

  if (selection.length === 0) {
    sketch.UI.message("Please select a group or layer.")
    return
  }

  let items = {}
  let count = 0
  for (const layer of selection.layers) {
    const artboard = getArtboard(layer)
    if (!artboard || artboard === layer) continue

    const id = artboard.id
    if (!(id in items)) {
      // Create artboard item
      items[id] = {
        artboard,
        target: null,
        top: Number.MAX_SAFE_INTEGER,
        bottom: 0
      }
    }

    const frame = layer.frame.changeBasis({
      from: layer.parent,
      to: artboard
    })
    if (frame.y < items[id].top) {
      // Set top-most layer as target
      items[id].target = layer
      items[id].top = frame.y
      items[id].bottom = frame.y + frame.height
    }
    count++
  }

  if (!count) {
    sketch.UI.message("Please select groups/layers, not artboards.")
    return
  }

  for (const key in items) {
    if (!items.hasOwnProperty(key)) continue
    const item = items[key]
    const artboard = item.artboard

    // Find all layers below target
    const { layers, top } = getLayersBelow(artboard, item.target, item.top)

    // Push layers to bottom of target
    const diff = item.bottom - top
    for (const layer of layers) {
      layer.frame.y += diff
      const parent = layer.parent
      if (parent.type === "Group") {
        parent.adjustToFit()
      }
    }
  }
}
