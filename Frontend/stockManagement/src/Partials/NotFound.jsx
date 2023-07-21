import React from 'react'
import Lottie from 'lottie-react'
import NotFoundLogo from '../assets/NotFoundLogo.json'

export default function NotFound() {
  return (
    <div className='w-60 mx-auto flex justify-center h-[70vh]  '>
      <Lottie animationData={NotFoundLogo}></Lottie>
    </div>
  )
}
