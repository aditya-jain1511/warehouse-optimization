import './App.css';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import { InnerBoxAvailableContext } from './context/InnerBoxAvailableContext';
import { MaterialListContext } from './context/MaterialListContext';


function App() {



  const [materialList, setMaterialList] = useState([])
  const [inBoxInventory, setInBoxInventory] = useState([
    {
      innerBoxName: "INNER BOX",
      innerBoxCode: "3CP00030",
      length: 420,
      breadth: 420,
      width: 35,
    },
    {
      innerBoxName: "INNER BOX Coll pack 6\"",
      innerBoxCode: "3CP00204",
      length: 290,
      breadth: 210,
      width: 150,
    },
    {
      innerBoxName: "INNER BOX CHIP TRAY 4\" KIT",
      innerBoxCode: "3CP10284",
      length: 266,
      breadth: 296,
      width: 51,
    },
    {
      innerBoxName: "INNER BOX",
      innerBoxCode: "3CP71121",
      length: 360,
      breadth: 360,
      width: 60,
    },
    {
      innerBoxName: "INNER BOX DEVICE noTube",
      innerBoxCode: "3CP71221",
      length: 74,
      breadth: 60,
      width: 138,
    },
    {
      innerBoxName: "INNER BOX Coll Pack 8\"",
      innerBoxCode: "3CP90199",
      length: 280,
      breadth: 280,
      width: 150,
    },
    {
      innerBoxName: "INNER BOX WAFER",
      innerBoxCode: "3CP72219",
      length: 234,
      breadth: 256,
      width: 63,
    },    
  ])


  return (
    <BrowserRouter>
      <InnerBoxAvailableContext.Provider value={{inBoxInventory, setInBoxInventory}}>
        <MaterialListContext.Provider value={{materialList, setMaterialList}}>
          <Pages></Pages>
        </MaterialListContext.Provider>
      </InnerBoxAvailableContext.Provider>
    </BrowserRouter>
  );
}

export default App;
