/**
 * Snap
 */

import sketch from "sketch"
import {
  getArtboard,
  getLayers,
  getSettings,
  getSingleSelection
} from "./utils"

function snapTo(edge) {
  const doc = sketch.Document.getSelectedDocument()
  const selection = getSingleSelection()
  if (!selection) return

  // Get layers to move and the position closest to target edge
  const { context: userContext, ignoreHidden, ignoreLocked } = getSettings()
  const context =
    selection.type === "Artboard"
      ? doc.selectedPage
      : userContext === "artboard"
      ? getArtboard(selection)
      : selection.parent
  const { layers, position } = getLayers(
    edge === "top" ? "above" : edge === "bottom" ? "below" : edge,
    selection,
    context,
    ignoreHidden,
    ignoreLocked
  )

  // Check layers
  if (!layers.length) {
    const direction =
      edge === "top"
        ? "above"
        : edge === "bottom"
        ? "below"
        : edge === "left"
        ? "left of"
        : "right of"
    sketch.UI.message(
      `There are no layers ${direction} '${selection.name}' to snap with`
    )
  }

  // Determine change in position
  let diffX = 0
  let diffY = 0
  const frame = selection.frame.changeBasis({
    from: selection.parent,
    to: context
  })
  if (edge === "top") {
    diffY = frame.y - position
  } else if (edge === "bottom") {
    diffY = frame.y + frame.height - position
  } else if (edge === "left") {
    diffX = frame.x - position
  } else {
    diffX = frame.x + frame.width - position
  }

  // Move layers
  for (const layer of layers) {
    layer.frame.x += diffX
    layer.frame.y += diffY
    const parent = layer.parent
    if (parent.type === "Group") {
      parent.adjustToFit()
    }
  }

  // Select moved layers
  doc.selectedLayers = layers
  sketch.UI.message(
    `✅ Snapped ${layers.length} layer${
      layers.length > 1 ? "s" : ""
    } to the ${edge} of '${selection.name}'`
  )
}

export function snapToTop() {
  snapTo("top")
}

export function snapToBottom() {
  snapTo("bottom")
}

export function snapToLeft() {
  snapTo("left")
}

export function snapToRight() {
  snapTo("right")
}
