import React from 'react'
import './ContactUs.css'

function ContactUs() {
  return (
    <div className='contact-container'>
        <img src='https://images.unsplash.com/photo-1613929247034-983090f7699b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvb2tpbmclMjB1dGVuc2lsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' className='contact-img' />
        <div className='contact-info'>
            <h2>We'd love to hear from you!</h2>
            <form>
                <input type='text' placeholder='Enter your name' />
                <input type='email' placeholder='Enter your email' />
                <textarea placeholder='Enter your message' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ContactUs