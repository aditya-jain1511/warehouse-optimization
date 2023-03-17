import './App.css';
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import { InnerBoxAvailableContext } from './context/InnerBoxAvailableContext';

function App() {

  const [inBoxInventory, setInBoxInventory] = useState([
    {
      plant:"Phillipines",
      plantCode:"0959",
      materialCode:"JSUS523$EJNE",
      quantPBox:30,
      innerBoxCode: "PH0959JSUS202030",
      len: 20,
      height: 20,
      width: 30,
      innerQuantity:100
    },
    {
      plant:"USA",
      plantCode:"1502",
      materialCode:"JSUS523$EJNE",
      quantPBox:25,
      innerBoxCode: "US1502JSUS303030",
      len: 30,
      height: 30,
      width: 30,
      innerQuantity:10
    },   
  ])


  return (
    <BrowserRouter>
      <InnerBoxAvailableContext.Provider value={{inBoxInventory, setInBoxInventory}}>
          <Pages></Pages>
      </InnerBoxAvailableContext.Provider>
    </BrowserRouter>
  );
}

export default App;
