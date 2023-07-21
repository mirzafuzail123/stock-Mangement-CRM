import React from 'react'
import Lottie from 'lottie-react'
import LoaderLogo from '../assets/Loading.json'
export default function Loader() {
    return (
        <>
            <div className='flex items-center justify-center h-[50vh]'>
                <Lottie animationData={LoaderLogo} className='mx-auto w-52 h-52  ' />
            </div>

        </>
    )
}
