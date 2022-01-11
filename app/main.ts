import { app, BrowserWindow, screen } from 'electron';

let win:BrowserWindow;

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  // win.webContents.openDevTools();
  win.loadFile(`dist/xdaily/index.html`);

  return win;
}

try {

  app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });



} catch (e) {
  // Catch Error
  // throw e;
}
