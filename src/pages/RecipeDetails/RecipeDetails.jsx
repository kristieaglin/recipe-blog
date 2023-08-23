import React, { useEffect, useState } from 'react'
import './RecipeDetails.css'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import Ingredients from '../../components/Ingredients/Ingredients'
import Instructions from '../../components/Instructions/Instructions'
import Comments from '../../components/Comments/Comments';
import Likes from '../../components/Likes/Likes'

function RecipeDetails() {

    const {recipeId} = useParams()

    const [recipe, setRecipe] = useState({})

    useEffect(()=>{
        const docRef = doc(db, 'recipes', recipeId)

        getDoc(docRef)
        .then(res=>{
            // console.log(res)
            setRecipe(res.data())
        })
        .catch(err=>console.log(err))
    },[])

    // console.log(recipe.ingredients)

  return (
    <>
        <div className='details-container'>
            <div className='details-info'>
                <div className='title-details'>
                    <h1>{recipe?.title}</h1>
                    <h2>{recipe?.category}</h2>
                </div>
                <p>{recipe?.summary}</p>
                <div className='created-info'>
                    <div>
                        <p>Date published:</p>
                        <p>{recipe?.createdAt?.toDate().toDateString()}</p>
                    </div>
                    <div>
                        <p>{recipe?.createdBy && 'Submitted by:'}</p>
                        <p>{recipe?.createdBy && recipe?.createdBy?.charAt(0).toUpperCase()  + recipe?.createdBy.slice(1)}</p>
                    </div>
                </div>
                <Likes recipeId={recipeId}/>
            </div>
            <img src={recipe?.imageURL} className='details-img' />
        </div>
        <div className='ingredients-container'>
            <h2>Ingredients</h2>
            <Ingredients ingredients={recipe?.ingredients} />
        </div>
        <div className='instructions-container'>
            <h2>Instructions</h2>
            <Instructions instructions={recipe?.instructions} />
        </div>
        <div className='comments-container'>
            <h2>Comments</h2>
            <Comments recipeId={recipeId} />
        </div>
    </>
  )
}

export default RecipeDetails