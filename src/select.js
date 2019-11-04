/**
 * Select
 */

import sketch from "sketch"
import { getSingleSelection, getArtboard, getLayers } from "./utils"

function select(direction) {
  const selection = getSingleSelection()
  if (!selection) return

  // Select layers
  const artboard = getArtboard(selection)
  const { layers } = getLayers(direction, selection, artboard)
  const doc = sketch.Document.getSelectedDocument()
  doc.selectedLayers = layers
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
