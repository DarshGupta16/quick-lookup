import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import Store from "electron-store";

const store = new Store({
  defaults: {
    currentModel: "gemini-2.0-flash",
  },
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    titleBarStyle: "hidden",
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.hide();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  globalShortcut.register("Control+Q", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("fetch-current-model", () => {
  return store.get("currentModel");
});

ipcMain.on("change-model", (event, model) => {
  store.set("currentModel", model);
});

ipcMain.on("close-window", (event) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    window.hide();
  }
});
