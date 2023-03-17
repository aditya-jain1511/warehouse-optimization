import './App.css';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import { InnerBoxAvailableContext } from './context/InnerBoxAvailableContext';
import { MaterialListContext } from './context/MaterialListContext';


function App() {



  const [materialList, setMaterialList] = useState([
    {
      "id": 0,
      "innerBoxCode": "3CP00030",
      "materialCode": "RDK24MM33R$1L",
      "quantPBox": 250
    },
    {
      "id": 1,
      "innerBoxCode": "3CP00030",
      "materialCode": "LDK220M33R$1R",
      "quantPBox": 3000
    },
    {
      "id": 2,
      "innerBoxCode": "3CP00204",
      "materialCode": "STP240N10F7$Z5",
      "quantPBox": 1000
    },
    {
      "id": 3,
      "innerBoxCode": "3CP10284",
      "materialCode": "32F101VCT6$97",
      "quantPBox": 540
    },
    {
      "id": 4,
      "innerBoxCode": "3CP71121",
      "materialCode": "32F030K6T6$S3",
      "quantPBox": 1500
    },
    {
      "id": 5,
      "innerBoxCode": "3CP71221",
      "materialCode": "32F030K6T6$S1",
      "quantPBox": 1500
    },
    {
      "id": 5,
      "innerBoxCode": "3CP10284",
      "materialCode": "32F030K6T6$S1",
      "quantPBox": 1500
    }
  ]
  )
  const [inBoxInventory, setInBoxInventory] = useState([
    {
      innerBoxName: "INNER BOX",
      innerBoxCode: "3CP00030",
      len: 420,
      breadth: 420,
      width: 35,
    },
    {
      innerBoxName: "INNER BOX Coll pack 6\"",
      innerBoxCode: "3CP00204",
      len: 290,
      breadth: 210,
      width: 150,
    },
    {
      innerBoxName: "INNER BOX CHIP TRAY 4\" KIT",
      innerBoxCode: "3CP10284",
      len: 266,
      breadth: 296,
      width: 51,
    },
    {
      innerBoxName: "INNER BOX",
      innerBoxCode: "3CP71121",
      len: 360,
      breadth: 360,
      width: 60,
    },
    {
      innerBoxName: "INNER BOX DEVICE noTube",
      innerBoxCode: "3CP71221",
      len: 74,
      breadth: 60,
      width: 138,
    },
    {
      innerBoxName: "INNER BOX Coll Pack 8\"",
      innerBoxCode: "3CP90199",
      len: 280,
      breadth: 280,
      width: 150,
    },
    {
      innerBoxName: "INNER BOX WAFER",
      innerBoxCode: "3CP72219",
      len: 234,
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
