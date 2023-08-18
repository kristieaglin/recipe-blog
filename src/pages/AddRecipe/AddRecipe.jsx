import React, { useState } from 'react'
import './AddRecipe.css'
import { auth, db, storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { v4 } from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'
import { IoIosAlert } from "react-icons/io";
import { FaHandPointRight } from "react-icons/fa";
//FaHandPointRight

function AddRecipe() {

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const recipeCategoies = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Beverages']

    const [ingredientAlert, setIngredientAlert] = useState(false)
    const [instructionAlert, setInstructionAlert] = useState(false)

    const [formData, setFormData] = useState({
        title:'',
        summary:'',
        ingredients:'',
        instructions:'',
        category:'',
        image:''
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('submit')

        //create image reference
        const imageRef = ref(storage, `images/${formData.image.name + v4()}`)

        //upload image
        uploadBytes(imageRef, formData.image)
        .then(res=>{
            getDownloadURL(res.ref)
            .then(url=>{
                //create recipe reference
                const recipeRef = collection(db, 'recipes',)

                //use addDoc to add recipe collection
                addDoc(recipeRef, {
                    title:formData.title, 
                    summary:formData.summary,
                    ingredients:formData.ingredients.split('#'),
                    instructions:formData.instructions.split('#'),
                    category:formData.category,
                    imageURL:url,
                    createdBy:user.displayName,
                    userId:user.uid,
                    createdAt:Timestamp.now().toDate()
                })
            })
            .catch(err=>console.log(err))
        })
        .then(res=>{
            alert('Your recipe was added successfully!')
            setTimeout(()=>{
                navigate('/')
            },1000)
        })
        .catch(err=>console.log(err))

    }

  return (
    <div>
        <img src='https://images.unsplash.com/photo-1603185730021-ddc0c8097059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' className='add-recipe-img' />
        <div className='add-recipe-container'>
            <h2>Submit a new entry</h2>
            <form className='add-recipe-form' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text' 
                        id='title'
                        placeholder='Required'
                        required
                        maxLength='50'
                        onChange={(e)=>setFormData({...formData, title: e.target.value})}
                    />
                </div> 
                <div className='input-group'>
                    <label htmlFor='summary'>Summary</label>
                    <input
                        type='text'
                        id='summary'
                        placeholder='Required'
                        required
                        onChange={(e)=>setFormData({...formData, summary: e.target.value})}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='ingredients'>Ingredients <IoIosAlert className='alert-icon' onMouseOver={()=>setIngredientAlert(true)} onMouseOut={()=>setIngredientAlert(false)} /></label>
                    {
                        ingredientAlert && 
                        <div className='alert-text'>
                            <FaHandPointRight className='notice-icon' />
                            <div>
                                <p>Be sure to separate each item with a # symbol.</p>
                                <p><span>Example:</span> Item 1 # Item 2 # Item 3</p>
                            </div>
                        </div>
                    }
                    <input
                        type='text'
                        id='ingredients'
                        placeholder='Required'
                        required
                        onChange={(e)=>setFormData({...formData, ingredients: e.target.value})}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='instructions'>Instructions <IoIosAlert className='alert-icon' onMouseOver={()=>setInstructionAlert(true)} onMouseOut={()=>setInstructionAlert(false)} /></label>
                    {
                        instructionAlert && 
                        <div className='alert-text'>
                            <FaHandPointRight className='notice-icon' />
                            <div>
                                <p>Be sure to separate each step with a # symbol.</p>
                                <p><span>Example:</span> Step 1 # Step 2 # Step 3</p>
                            </div>
                        </div>
                    }
                    <input
                        type='text'
                        id='instructions'
                        placeholder='Required'
                        required
                        onChange={(e)=>setFormData({...formData, instructions: e.target.value})}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='category'>Category</label>
                    <select id='category' onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                        <option value=''>Select</option>
                        {
                            recipeCategoies.map((item,index)=><option key={index} value={item}>{item}</option>)
                        }
                    </select>
                </div>
                <div className='input-group'>
                    <label>Upload Image</label>
                    <input
                        type='file'
                        id='image'
                        accept='image/*'
                        required
                        onChange={(e)=>setFormData({...formData, image: e.target.files[0]})}
                    />
            </div>
            <button type='submit' className='submit-btn'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddRecipe