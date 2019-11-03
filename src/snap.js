/**
 * Snap
 */

import sketch from "sketch"
import { getArtboard, getLayersBelow } from "./utils"

export function snapTop() {
  // TODO: Snap to top
}

export function snapBottom() {
  var doc = sketch.Document.getSelectedDocument()
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

export function snapLeft() {
  // TODO: Snap to left
}

export function snapRight() {
  // TODO: Snap to right
}
