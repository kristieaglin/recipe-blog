import React from 'react'
import './Footer.css'
import { BsFillSuitHeartFill } from "react-icons/bs"
import { TiSocialFacebook, TiSocialInstagram, TiSocialPinterest } from "react-icons/ti"



function Footer() {
  return (
    <div className='footer-container'>
      <div className='contact-us'>
        <p>Contact us</p>
        <BsFillSuitHeartFill className='footer-heart' />
      </div>
      <div className='socials-container'>
        <TiSocialFacebook className='footer-icon' />
        <TiSocialInstagram className='footer-icon' />
        <TiSocialPinterest className='footer-icon' />
      </div>
    </div>
  )
}

export default Footer