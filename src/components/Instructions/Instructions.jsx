import React from 'react'
import './Instructions.css'

function Instructions({instructions}) {
  return (
    <div>
        {
            instructions &&
            instructions.map((item, index)=><div key={index} className='instructions'>
                    <h3>Step {index+1}</h3>
                    <p>{item}</p>
                </div>)
        }
    </div>
  )
}

export default Instructions