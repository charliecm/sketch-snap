/**
 * Utilities
 */

import sketch from "sketch"
import Settings from "sketch/settings"

function getSettings() {
  let context = Settings.settingForKey("context")
  let ignoreHidden = Settings.settingForKey("ignoreHidden")
  let ignoreLocked = Settings.settingForKey("ignoreLocked")

  context = context === "group" ? context : "artboard"
  ignoreHidden = ignoreHidden ? true : false
  ignoreLocked = ignoreLocked ? true : false

  Settings.setSettingForKey("context", context)
  Settings.setSettingForKey("ignoreHidden", ignoreHidden)
  Settings.setSettingForKey("ignoreLocked", ignoreLocked)

  return { context, ignoreHidden, ignoreLocked }
}

function getSingleSelection() {
  const doc = sketch.Document.getSelectedDocument()
  const selections = doc.selectedLayers

  if (selections.isEmpty) {
    sketch.UI.message("⚠️ Please select a layer or artboard.")
    return null
  } else if (selections.length !== 1) {
    sketch.UI.message("⚠️ Please select only one layer or artboard.")
    return null
  }

  return selections.layers[0]
}

function getArtboard(layer) {
  if (layer.type === "Artboard") {
    return layer
  } else if (layer.parent) {
    return getArtboard(layer.parent)
  }
  return null
}

function getParentIds(layer, parents) {
  parents = parents || []
  if (!layer.parent) return parents
  parents.push(layer.parent.id)
  return getParentIds(layer.parent, parents)
}

function getLayers(
  direction,
  target,
  context,
  ignoreHidden,
  ignoreLocked,
  targetFrame,
  targetParentIds,
  layer,
  output
) {
  output = output || {
    layers: [],
    position:
      direction === "above" || direction === "left"
        ? -Number.MAX_SAFE_INTEGER
        : Number.MAX_SAFE_INTEGER
  }
  targetFrame =
    targetFrame ||
    target.frame.changeBasis({
      from: target.parent,
      to: context
    })
  targetParentIds = targetParentIds || getParentIds(target)
  layer =
    !layer && target.type === "Artboard"
      ? /* If target is an artboard, start from page */ target.parent
      : layer || context

  if (layer.id === target.id) return output

  // Determine if layer is in region
  const frame = layer.frame.changeBasis({
    from:
      layer.type === "Page"
        ? /* Use page coordinate space */ layer
        : layer.parent,
    to: context
  })
  let position = 0
  let isInRegion = false
  if (direction === "above") {
    // Layer is above target's bottom edge
    position = frame.y + frame.height
    isInRegion = position <= targetFrame.y + targetFrame.height
  } else if (direction === "below") {
    // Layer is below target's top edge
    position = frame.y
    isInRegion = position >= targetFrame.y
  } else if (direction === "left") {
    // Layer is left of target's right edge
    position = frame.x + frame.width
    isInRegion = position <= targetFrame.x + targetFrame.width
  } else {
    // Layer is right of target's left edge
    position = frame.x
    isInRegion = position >= targetFrame.x
  }

  const isIgnored =
    (ignoreHidden && layer.hidden) || (ignoreLocked && layer.locked)

  if (!targetParentIds.includes(layer.id) && !isIgnored && isInRegion) {
    // Add to list
    output.layers.push(layer)
    output.position =
      direction === "above" || direction === "left"
        ? Math.max(output.position, position)
        : Math.min(output.position, position)
  } else {
    // Traverse child layers
    const children = layer.layers
    if (children && children.length) {
      for (const child of children) {
        output = getLayers(
          direction,
          target,
          context,
          ignoreHidden,
          ignoreLocked,
          targetFrame,
          targetParentIds,
          child,
          output
        )
      }
    }
  }

  return output
}

export { getSettings, getSingleSelection, getArtboard, getParentIds, getLayers }
