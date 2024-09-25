const { app, BrowserWindow } = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    console.log(app.getAppPath())
    win.loadURL(`file://${app.getAppPath()}\\build\\index.html`);
}

app.whenReady().then(() => {
    createWindow();
});