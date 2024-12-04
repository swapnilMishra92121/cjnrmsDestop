// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All APIs exposed by the context bridge are available here.

// Binds the buttons to the context bridge API.
// const { ipcRenderer } = require('electron');

console.log('Renderer process loaded');

// Event listener for the Save Token button
    document.getElementById('saveToken').addEventListener('click', () => {
      const inputElement = document.getElementById('tokenInput');
      console.log('hello world', inputElement.value);
      const tokenValue = inputElement.value;
  
    //   ipcRenderer.send('save-token', tokenValue);
    });
  

 
  