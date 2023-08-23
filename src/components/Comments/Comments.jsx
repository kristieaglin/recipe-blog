import React, { useEffect, useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import './Comments.css'
import { auth } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, Timestamp, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import Swal from 'sweetalert2'
import { IoTrashOutline } from "react-icons/io5";
//IoTrashOutline

function Comments({recipeId}) {

  const [user] = useAuthState(auth)

  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(()=>{
    //comments ref
    const commentsRef = collection(db, 'comments')
    
    //query to show the correct comments
    const q = query(commentsRef, where('recipeId', '==', recipeId))

    onSnapshot(q, (snapshot)=>{
      const comments = snapshot.docs.map(item =>{
        return {
          ...item.data(),
          id: item.id
        }
      })
      setComments(comments)
    })
  },[])

  const addNewComment = e =>{
    e.preventDefault()
    
    //comment collection ref
    const commentsRef = collection(db, 'comments')

    addDoc(commentsRef, {
      userId: user?.uid,
      recipeId: recipeId,
      content: newComment, 
      username: user?.displayName,
      createdAt: Timestamp.now().toDate()
    })
    .then(res=>{
      let timerInterval
      Swal.fire({
      title: 'Your comment was added successfully!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
      }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
          }
      })
    setNewComment('')
    })
    .catch(err=>console.log(err))
  }

  const deleteComment = id =>{
    deleteDoc(doc(db, 'comments', id))
    .then(res=>{
      let timerInterval
      Swal.fire({
      title: 'Your comment was deleted successfully!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
      }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
          }
      })
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
        {
          user ?
          <form className='comments-form' onSubmit={addNewComment}>
            <textarea
              placeholder='Enter your comment here'
              required
              onChange={e => setNewComment(e.target.value)}
              value={newComment}
              maxLength='105'
            />
            <button type='submit'>Submit</button>
          </form>
          :
          <p className='comment-p'>Please log in to leave a comment.</p>
        }
        {
          comments.map(item=>
            <div key={item.id} className='comment-container'>
              <CommentCard comments={item} />
              {
                user?.uid === item?.userId &&
                <IoTrashOutline onClick={()=>deleteComment(item.id)} className='trash-icon' />
              }
            </div>
          )
        }
        {
          comments.length === 0 &&
          <p className='comment-p'>Be the first to leave a comment!</p>
        }
    </div>
  )
}

export default Comments