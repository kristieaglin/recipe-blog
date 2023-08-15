import React, { useState } from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { BsArrowBarRight } from "react-icons/bs";
//BsArrowBarRight

function Header() {

    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(true)

    // array for recipe categories
    const recipeCategoies = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Beverages']

  return (
    <div className='header-container'>
        <div>
            <h1 onClick={()=>navigate('/')}>C'est délicieux.</h1>
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
                        <Link to={'/'} className='recipe-category'>All</Link>
                        {
                            recipeCategoies.map((item,index)=><Link key={index} className='recipe-category' to={`/recipes/${item}`}>{item}</Link>)
                        }
                        <button className='signup-btn'>Sign up</button>
                    </div>
                    <BsArrowBarRight className='menu-icon arrow-icon' onClick={()=>setMenuOpen(true)}/>
                </div>
            }
        </div>
    </div>
  )
}

export default Header