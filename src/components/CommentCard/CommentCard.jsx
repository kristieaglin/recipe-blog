import React from 'react'
import './CommentCard.css'
import Avatar from 'react-avatar'

function CommentCard({comments}) {

    console.log(comments)


  return (
    <div className='comment-card-container'>
        <Avatar
            name={comments?.username?.charAt(0)}
            size='70'
            round={true}
            color='sienna'
        />
        <div className='comment'>
            <h3>{comments?.username}</h3>
            <p>{comments?.content}</p>
            <p>{comments?.createdAt?.toDate().toDateString()}</p>
        </div>
    </div>

  )
}

export default CommentCard