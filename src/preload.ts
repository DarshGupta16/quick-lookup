const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  fetchCurrentModel: () => ipcRenderer.invoke("fetch-current-model"),
  changeModel: (model: string) => ipcRenderer.send("change-model", model),
  closeWindow: () => ipcRenderer.send("close-window"),
});
