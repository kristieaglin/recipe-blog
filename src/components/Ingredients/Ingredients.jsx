import React, { useState, useEffect } from 'react'
import './Ingredients.css'
import { BsArrowRightShort } from "react-icons/bs";

function Ingredients({ingredients}) {
    
  return (
    <div>
        {
            ingredients &&
            ingredients.map((item, index)=><div key={index} className='ingredients'>
                    <BsArrowRightShort className='ingredient-icon' />
                    <p>{item}</p>
                </div>)
        }
    </div>
  )
}

export default Ingredients