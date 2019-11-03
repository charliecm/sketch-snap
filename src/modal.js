import BrowserWindow from "sketch-module-web-view"
import { getWebview } from "sketch-module-web-view/remote"
import UI from "sketch/ui"

const webviewIdentifier = "sketch-push.webview"

export default function() {
  // https://github.com/skpm/sketch-module-web-view/blob/master/docs/browser-window.md
  const options = {
    identifier: webviewIdentifier,
    width: 240,
    height: 180,
    show: false,
    titleBarStyle: "hidden",
    remembersWindowFrame: true
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.once("ready-to-show", () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  webContents.on("did-finish-load", () => {
    UI.message("UI loaded!")
  })

  // Handle calls from view
  webContents.on("nativeLog", s => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL(require("../resources/webview.html"))
}

export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
