import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

var ipcRenderer = window.require('electron').ipcRenderer

var setValue = null;

function App() {
  var [IPCValue, IPCValueSetter] = useState(0);
  setValue = (val) =>
  {
    IPCValueSetter(val)
  }
  
  ipcRenderer.once('getValue', (sender, arg) => {
    // eslint-disable-next-line no-console
    console.log(arg);
    setValue(arg)
  });

  return (
    <div className="App">
      <span>{IPCValue}</span>
      <button onClick={() => ipcRenderer.send('getValue', IPCValue)}>Request value</button>
    </div>
  );
}

export default App;
