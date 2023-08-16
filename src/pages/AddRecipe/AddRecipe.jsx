import React from 'react'
import './AddRecipe.css'

function AddRecipe() {

    const recipeCategoies = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Beverages']

  return (
    <div>
        <img src='https://images.unsplash.com/photo-1603185730021-ddc0c8097059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' className='add-recipe-img' />
        <div className='add-recipe-container'>
            <h2>Submit a new entry</h2>
            <form className='add-recipe-form'>
                <div className='input-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text' 
                        id='title'
                        placeholder='Required'
                        required
                        maxLength='50'
                    />
                </div> 
                <div className='input-group'>
                    <label htmlFor='summary'>Summary</label>
                    <input
                        type='text'
                        id='summary'
                        placeholder='Required'
                        required
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='ingredients'>Ingredients</label>
                    <input
                        type='text'
                        id='ingredients'
                        placeholder='Required'
                        required
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='instructions'>Instructions</label>
                    <input
                        type='text'
                        id='instructions'
                        placeholder='Required'
                        required
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='category'>Category</label>
                    <select id='category'>
                        <option value=''>Select</option>
                        {
                            recipeCategoies.map((item,index)=><option key={index} value={item}>{item}</option>)
                        }
                    </select>
                </div>
                <div className='input-group'>
                    <label>Upload Image</label>
                    <input type='file' id='image' accept='image/*' />
            </div>
            </form>
        </div>
    </div>
  )
}

export default AddRecipe