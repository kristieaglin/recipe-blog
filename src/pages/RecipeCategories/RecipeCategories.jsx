import React, { useEffect, useState } from 'react'
import './RecipeCategories.css'
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

function RecipeCategories() {

    const {recipeCategory} = useParams()

    const [recipe, setRecipe] = useState([])

    useEffect(()=>{
      //create reference to recipe collection
      const recipeRef = collection(db, 'recipes')

      //get data that matches the category
      const q = query(recipeRef, where('category', '==', recipeCategory))

      //get data that matches query
      getDocs(q, recipeRef)
      .then(res=>{
        // console.log(res.docs[0].data())
        const recipes = res.docs.map(item=>{
          return {
              ...item.data(),
              id: item.id
          }
        })
        setRecipe(recipes)
      })
      .catch(err=>console.log(err))

    },[recipeCategory])

  return (
    <div className='recipe-categories-container'>
      {recipe.map((item)=><RecipeCard key={item?.id} recipe={item} />)}
    </div>
  )
}

export default RecipeCategories