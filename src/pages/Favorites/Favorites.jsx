import React, { useEffect, useState } from 'react'
import './Favorites.css'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebaseConfig'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

function Favorites() {

  const [favorites, setFavorites] = useState([])
  const [recipeId, setRecipeId] = useState([])

  const [user] = useAuthState(auth)

  useEffect(()=>{
    //reference to collection
    const likesRef = collection(db, 'likes')
    const recipeRef = collection(db, 'recipes')

    if(user){
      const q = query(likesRef, where('userId', '==', user?.uid))

      const q2 = query(recipeRef, orderBy('createdAt', 'desc'), where('id', '==', recipeId))

      //get liked recipes
      getDocs(q, likesRef)
      .then(res=>{
        // console.log(res.docs[0].data())
        const favRecipeId = res.docs.map(item=>item.data().recipeId)
        console.log(favRecipeId)
        setRecipeId(favRecipeId)
      })
      .then(res=>{

      })
      .catch(err=>console.log(err))
    }
    
  }, [])

  return (
    <div>
      <RecipeCard recipe={favorites} />
    </div>
  )
}

export default Favorites