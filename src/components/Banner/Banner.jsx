import React, { useEffect, useState } from 'react'
import './Banner.css'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Banner() {

    const navigate = useNavigate()

    const [mainRecipe, setMainRecipe] = useState({})
    const [otherRecipes, setOtherRecipes] = useState([])

    useEffect(()=>{
        //reference to recipes collection
        const recipesRef = collection(db, 'recipes')

        //query to filter responses
        //sort and get first 4 recipes
        const q = query(recipesRef, orderBy('createdAt', 'desc'), limit(4))

        //get recipes from database
        getDocs(q, recipesRef)
        .then(res=>{
            // console.log(res.docs[0].data())
            const recipes = res.docs.map(item=>{
                return {
                    ...item.data(),
                    id: item.id
                }
            })
            console.log(recipes)
            setMainRecipe(recipes[0])
            setOtherRecipes(recipes.slice(1))
        })
        .catch(err=>console.log(err))

    },[])

  return (
    <div className='banner-container'>
        <div className='main-recipe-container'>
            <img src={mainRecipe?.imageURL} className='main-recipe-img' onClick={()=>navigate(`details/${mainRecipe?.id}`)} />
            <div className='main-recipe-info' onClick={()=>navigate(`details/${mainRecipe?.id}`)}>
                <h2>{mainRecipe?.title}</h2>
                <p className='main-date'>{mainRecipe?.createdAt?.toDate().toDateString()}</p>
                <p>{mainRecipe?.summary}</p>
            </div>
        </div>
        <div className='other-recipes-container'>
            {
                otherRecipes.map(item=><div key={item.id} className='other-recipe'>
                    <img src={item?.imageURL} className='other-recipes-img' onClick={()=>navigate(`details/${item?.id}`)} />
                    <div className='other-recipe-info'>
                        <h2 onClick={()=>navigate(`details/${item?.id}`)}>{item?.title}</h2>
                        <p onClick={()=>navigate(`details/${item?.id}`)}>{item?.createdAt?.toDate().toDateString()}</p>
                    </div>
                </div>)
            }
        </div>
    </div>
  )
}

export default Banner