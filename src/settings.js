/**
 * Settings
 */

import BrowserWindow from "sketch-module-web-view"
import { getWebview } from "sketch-module-web-view/remote"
import UI from "sketch/ui"
import Settings from "sketch/settings"
import { getSettings } from "./utils"

const webviewIdentifier = "sketch-snap.webview"

export default function() {
  // https://github.com/skpm/sketch-module-web-view/blob/master/docs/browser-window.md
  const options = {
    identifier: webviewIdentifier,
    title: "Snap Settings",
    width: 232,
    height: 242,
    show: false,
    remembersWindowFrame: true,
    alwaysOnTop: true,
    fullscreenable: false,
    resizable: false
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.once("ready-to-show", () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  webContents.on("did-finish-load", () => {
    const { context, ignoreHidden, ignoreLocked } = getSettings()
    webContents.executeJavaScript(
      `updateSettings("${context}", ${ignoreHidden}, ${ignoreLocked})`
    )
  })

  webContents.on("context", value => {
    Settings.setSettingForKey("context", value)
  })

  webContents.on("ignoreHidden", value => {
    Settings.setSettingForKey("ignoreHidden", value)
  })

  webContents.on("ignoreLocked", value => {
    Settings.setSettingForKey("ignoreLocked", value)
  })

  webContents.on("openLink", url => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url))
  })

  webContents.on("close", value => {
    browserWindow.close()
  })

  browserWindow.loadURL(require("../resources/webview.html"))
}

export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
