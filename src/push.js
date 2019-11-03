import sketch from "sketch"

function getArtboard(layer) {
  if (layer.type === "Artboard") {
    return layer
  } else if (layer.parent) {
    return getArtboard(layer.parent)
  }
  return null
}

function traverse(layer, all) {
  let layers = all || []
  if (layer.type !== "Artboard" && layer.frame.y > top) {
    layers.push(layer)
  } else {
    if (layer.layers && layer.layers.length) {
      layer.layers.forEach(child => {
        layers = traverse(child, layers)
      })
    }
  }
  return layers
}

export default function() {
  var doc = require("sketch/dom").Document.getSelectedDocument()
  var selection = doc.selectedLayers

  if (selection.length === 0) {
    sketch.UI.message("Please select a layer.")
    return
  }

  let topMost = null

  let artboards = {}
  for (const layer of selection.layers) {
    const artboard = getArtboard(layer)
    if (artboard === layer) {
      continue
    }
    if (artboard.id in artboards) {
      artboards[id].targets.push(layer)
    } else {
      artboards[artboard.id] = {
        targets: [layer],
        artboard
      }
    }
  }

  let artboardsArr = Object.entries(artboards)

  console.log(artboards)

  if (!artboardsArr.length) {
    sketch.UI.message("Please select a layer, not artboards.")
    return
  }

  for (const artboard of artboardsArr) {
    console.log(artboard)
    artboard.targets.sort((a, b) => {
      const yA = a.frame.changeBasis(null, artboard).y
      const yB = b.frame.changeBasis(null, artboard).y
      return yA < yB
    })
    const target = artboard.targets[0] // Top-most layer
    const below = traverse(allLayers)
    below.sort((a, b) => {
      const yA = a.frame.changeBasis(null, artboard).y
      const yB = b.frame.changeBasis(null, artboard).y
      return yA < yB
    })
    const topMost = below.targets[0]
    console.log("top most", topMost)

    for (let layer of below) {
      layer.frame.y += 10
    }
  }
}
