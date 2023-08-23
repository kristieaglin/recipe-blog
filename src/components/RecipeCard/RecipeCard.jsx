import React, { useState, useEffect } from 'react'
import './RecipeCard.css'
import { useNavigate } from 'react-router-dom'

function RecipeCard({recipe}) {

  const navigate = useNavigate()

  


  return (
    <div key={recipe.id} className='recipe-card'>
        <img src={recipe?.imageURL} className='other-recipes-img' onClick={()=>navigate(`/details/${recipe?.id}`)} />
        <div className='other-recipe-info'>
            <h2 onClick={()=>navigate(`/details/${recipe?.id}`)}>{recipe?.title}</h2>
            <p onClick={()=>navigate(`/details/${recipe?.id}`)}>{recipe?.createdAt?.toDate().toDateString()}</p>
        </div>
    </div>
  )
}

export default RecipeCard