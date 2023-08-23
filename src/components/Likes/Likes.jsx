import React, { useEffect, useState } from 'react'
import './Likes.css'
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs"
import { auth, db } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

function Likes({recipeId}) {

    const [user] = useAuthState(auth)

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(()=>{
        const likesRef = collection(db, 'likes')

        if(user){
            const q = query(likesRef, where('recipeId', '==', recipeId), where('userId', '==', user?.uid))

            getDocs(q, likesRef)
            .then(res=>{
                if(res.size > 0){
                    setIsLiked(true)
                }
            })
            .catch(err=>console.log(err))
        }
    },[user])

    useEffect(()=>{
        const likesRef = collection(db, 'likes')

        const q = query(likesRef, where('recipeId', '==', recipeId))

        getDocs(q, likesRef)
        .then(res=>setLikeCount(res.size))
        .catch(err=>console.log(err))

    },[isLiked])

    const handleLikes = e =>{
        if(user){
            const likesRef = collection(db, 'likes')

            addDoc(likesRef,{
                userId:user?.uid,
                recipeId:recipeId
            })
            .then(res=>setIsLiked(true))
            .catch(err=>console.log(err))
        }
    }

    const handleUnlikes = e =>{
        if(user){
            const likesRef = collection(db, 'likes')

            const q = query(likesRef, where('recipeId', '==', recipeId), where('userId', '==', user?.uid))

            getDocs(q, likesRef)
            .then(res=>{
                const likesId = res.docs[0].id
                deleteDoc(doc(db, 'likes', likesId))
                .then(res=>setIsLiked(false))
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }
    }

  return (
    <div>
        {
        isLiked ?
            <div className='like-container'>
                <BsSuitHeartFill className='like-icon' onClick={handleUnlikes} />
                <p>{likeCount}</p>
            </div>
            :
            <div className='like-container'>
                <BsSuitHeart className='like-icon' onClick={handleLikes} />
                <p>{likeCount}</p>
            </div>
        }
    </div>
  )
}

export default Likes