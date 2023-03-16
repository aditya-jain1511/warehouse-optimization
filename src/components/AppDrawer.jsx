import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import "../css/appdrawer.css"

const AppDrawer = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <Nav vertical className='nav'>
                    <NavItem className='navItem'>
                        <Link className='nav-item-link' to="/outboxsuggest">OutBox Suggestion</Link>
                    </NavItem>
                    <NavItem className='navItem'>
                        <Link className='nav-item-link' to="/innerboxinventory">InnerBox Inventory</Link>
                    </NavItem>
                    <NavItem className='navItem'>
                        <Link className='nav-item-link' to="/materialinventory">Material Inventory</Link>
                    </NavItem>     
                </Nav>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AppDrawer
