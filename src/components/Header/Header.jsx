import React, { useState } from 'react'
import './Header.css'
import { FiMenu } from "react-icons/fi";
import { BsArrowBarRight } from "react-icons/bs";
//BsArrowBarRight

function Header() {

    const [menuOpen, setMenuOpen] = useState(true)

    // array for recipe categories
    const recipeCategoies = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Beverages']

  return (
    <div className='header-container'>
        <div>
            <h1>C'est délicieux.</h1>
            <p>amazing recipes from South Louisiana</p>
        </div>
        <div>
            {
                menuOpen ?
                <div className='menu-closed'>
                    <button className='signup-btn'>Sign up</button>
                    <FiMenu className='menu-icon' onClick={()=>setMenuOpen(false)} />
                </div>
                :
                <div className='menu-open'>
                    <div className='menu-options'>
                        {
                            recipeCategoies.map((item,index)=><p key={index} className='recipe-category'>{item}</p>)
                        }
                        <button className='signup-btn'>Sign up</button>
                    </div>
                    <BsArrowBarRight className='menu-icon' onClick={()=>setMenuOpen(true)}/>
                </div>
            }
        </div>
    </div>
  )
}

export default Header