import React, { useContext } from 'react'
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext'
import { MaterialListContext } from '../context/MaterialListContext'

const MaterialInventory = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)
    const {materialList, setMaterialList} = useContext(MaterialListContext)
    
  return (
    <div>
      jjj
    </div>
  )
}

export default MaterialInventory
