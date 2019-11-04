/**
 * Select
 */

import sketch from "sketch"
import {
  getArtboard,
  getLayers,
  getSettings,
  getSingleSelection
} from "./utils"

function select(direction) {
  const doc = sketch.Document.getSelectedDocument()
  const selection = getSingleSelection()
  if (!selection) return

  // Get layers
  const { context: userContext, ignoreHidden, ignoreLocked } = getSettings()
  const context =
    selection.type === "Artboard"
      ? doc.selectedPage
      : userContext === "artboard"
      ? getArtboard(selection)
      : selection.parent
  const { layers } = getLayers(
    direction,
    selection,
    context,
    ignoreHidden,
    ignoreLocked
  )

  // Check layers
  const directionText =
    direction === "above" || direction === "below"
      ? direction
      : direction === "left"
      ? "left of"
      : "right of"
  if (!layers.length) {
    sketch.UI.message(
      `⚠️ There are no layers ${directionText} '${selection.name}' to select`
    )
  }

  // Select layers
  doc.selectedLayers = layers
  sketch.UI.message(
    `✅ Selected ${layers.length} layer${
      layers.length > 1 ? "s" : ""
    } ${directionText} '${selection.name}'`
  )
}

export function selectAbove() {
  select("above")
}

export function selectBelow() {
  select("below")
}

export function selectLeft() {
  select("left")
}

export function selectRight() {
  select("right")
}
