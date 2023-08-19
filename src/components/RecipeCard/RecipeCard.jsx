import React from 'react'
import './RecipeCard.css'
import { useNavigate } from 'react-router-dom'
import { BsFillSuitHeartFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"

function RecipeCard({recipe}) {

  const navigate = useNavigate()

  return (
    <div key={recipe.id} className='recipe-card' onClick={()=>navigate(`/details/${recipe?.id}`)}>
        <img src={recipe?.imageURL} className='other-recipes-img' />
        <div className='other-recipe-info'>
            <h2>{recipe?.title}</h2>
            <p>{recipe?.createdAt?.toDate().toDateString()}</p>
            <BsFillSuitHeartFill className='main-icon' />
            <FaRegComment className='main-icon' />
        </div>
    </div>
  )
}

export default RecipeCard