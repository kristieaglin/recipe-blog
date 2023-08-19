import React from 'react'
import CommentCard from '../CommentCard/CommentCard'
import './Comments.css'

function Comments() {
  return (
    <div>
        <form className='comments-form'>
            <textarea placeholder='Enter your comment here' required />
            <button type='submit'>Submit</button>
        </form>
        <CommentCard />
    </div>
  )
}

export default Comments