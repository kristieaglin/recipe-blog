import React from 'react'
import './RecipeCard.css'

function RecipeCard({recipe}) {


  return (
    <div key={recipe.id} className='recipe-card'>
        <img src={recipe?.imageURL} className='other-recipes-img' />
        <div className='other-recipe-info'>
            <h2>{recipe?.title}</h2>
            <p>{recipe?.createdAt?.toDate().toDateString()}</p>
        </div>
    </div>
  )
}

export default RecipeCard