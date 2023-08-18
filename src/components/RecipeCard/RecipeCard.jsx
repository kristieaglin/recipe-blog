import React from 'react'
import './RecipeCard.css'
import { useNavigate } from 'react-router-dom'

function RecipeCard({recipe}) {

  const navigate = useNavigate()

  return (
    <div key={recipe.id} className='recipe-card' onClick={()=>navigate(`/details/${recipe?.id}`)}>
        <img src={recipe?.imageURL} className='other-recipes-img' />
        <div className='other-recipe-info'>
            <h2>{recipe?.title}</h2>
            <p>{recipe?.createdAt?.toDate().toDateString()}</p>
        </div>
    </div>
  )
}

export default RecipeCard