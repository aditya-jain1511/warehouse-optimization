import React from 'react'
import Header from '../components/Header'
import AppDrawer from '../components/AppDrawer'
import { Route, Routes } from 'react-router'
import InnerBoxInventory from './InnerBoxInventory'
import OutboxSuggestion from './OutboxSuggestion'
import MaterialInventory from './MaterialInventory'

const Pages = () => {
  return (
    <>
      <Header></Header>
      <div className="container-fluid">
        <div className="row">
            <div className="col-2" id="app-drawer">
                <AppDrawer></AppDrawer>
            </div>
            <div className="col-10">
                <Routes>
                    <Route path="/outboxsuggest" element={<OutboxSuggestion />}></Route>
                    <Route path="/innerboxinventory" element={<InnerBoxInventory />}></Route>
                    <Route path="/materialinventory" element={<MaterialInventory />}></Route>
                    <Route path="*" element={<OutboxSuggestion />}></Route>
                    {/* {OutboxInventory } */}
                    {/* login */}
                </Routes>
            </div>
        </div>
      </div>
    </>
  )
}

export default Pages
