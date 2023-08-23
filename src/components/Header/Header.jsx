import React, { useState } from 'react'
import './Header.css'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../config/firebaseConfig';
import { useAuthState} from 'react-firebase-hooks/auth'
import { FiMenu } from "react-icons/fi";
import { BsArrowBarRight } from "react-icons/bs";
import { signOut } from 'firebase/auth';

function Header() {

    //get user data
    const [user] = useAuthState(auth)

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
                    {
                        user ?
                        <div className='logged-in-menu-closed'>
                            <p>Hello, {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}!</p>
                            <button className='signup-btn' onClick={()=>signOut(auth)}>Log out</button>
                        </div>
                        :
                        <button className='signup-btn' onClick={()=>navigate('/auth')}>Sign up</button>
                    }
                    <FiMenu className='menu-icon' onClick={()=>setMenuOpen(false)} />
                </div>
                :
                <div className='menu-open'>
                    {
                        user ?
                        <div>
                            <div className='menu-options'>
                            <p className='recipe-category-p'>Hello, {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}!</p>
                            <Link to={'/'} className='recipe-category'>Home</Link>
                            <Link to={'/add'} className='recipe-category'>Add a new Entry</Link>
                            <Link to={'/favorites'} className='recipe-category'>Favorites</Link>
                            <h3 className='category-title'>Recipes by category</h3>
                            {
                                recipeCategoies.map((item,index)=><Link key={index} className='recipe-category' to={`/recipes/${item}`}>{item}</Link>)
                            }
                            <button className='signup-btn' onClick={()=>signOut(auth)}>Log out</button>
                            </div>
                        </div>
                        :
                        <div className='menu-options'>
                            <Link to={'/'} className='recipe-category'>Home</Link>
                            <h3 className='category-title'>Recipes by category</h3>
                            {
                                recipeCategoies.map((item,index)=><Link key={index} className='recipe-category' to={`/recipes/${item}`}>{item}</Link>)
                            }
                        <button className='signup-btn' onClick={()=>navigate('/auth')}>Sign up</button>
                        </div>
                    }
                    <BsArrowBarRight className='menu-icon arrow-icon' onClick={()=>setMenuOpen(true)}/>
                </div>
            }
        </div>
    </div>
  )
}

export default Header