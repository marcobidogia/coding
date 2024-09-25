const { app, BrowserWindow, ipcMain } = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences : {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    console.log(app.getAppPath())
    win.loadURL(`file://${app.getAppPath()}\\build\\index.html`);
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('getValue', async (event, arg) =>
{
    console.log('recieved getValue request form IPC')
    console.log(arg);
    event.reply('getValue', arg + 1)
});