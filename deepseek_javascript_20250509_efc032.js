const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('./server');

let mainWindow;

function createWindow() {
    // Start Express server
    express;
    
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    // Load the frontend
    mainWindow.loadURL('http://localhost:3000');
    
    // Open DevTools (remove for production)
    mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});