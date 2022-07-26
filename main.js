// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// 监听渲染进程发送过来的open-message
ipcMain.on("open-message", (event, arg) => {
  // 答复
  event.reply("open-reply",'这是主进程的答复');
  console.log(arg);
});


function CWindow (url) {
  // Create the browser window.
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // 配置浏览器可以支持node接口
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  // and load the index.html of the app.
  newWindow.loadURL(url);

  // Open the DevTools.
  newWindow.webContents.openDevTools();
}

// 监听渲染进程发送过来要求打开新窗口
ipcMain.on('openNewWindow',(event,arg) => {
  CWindow('https://www.taobao.com')
  CWindow('https://www.baidu.com')
})


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // 配置浏览器可以支持node接口
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  setTimeout(() => {
    // 主动发消息给渲染进程
    mainWindow.webContents.send(
      "open-active",
      "创建窗口后，主进程主动发送数据给渲染进程"
    );
  }, 2000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
