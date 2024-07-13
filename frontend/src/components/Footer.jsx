import React from 'react'

const Footer = () => {
  return (
    <div className=''>
      <div className="logo font-bold text-1xl flex items-center justify-center bg-slate-700 h-12 px-5 text-white">
        <span className='text-green-700'>&lt;</span>
        Pass
        <span className='text-green-700 font-bold'>Op</span>
        <span className='text-red-900'>/</span>
        <span className='text-green-700'>&gt;</span>
      
        <div className='flex font-serif font-normal items-center'> Created with  <img className='w-4 h-4' src="src/heart.png" alt="no img" /> by Mahesh</div>
                </div>
    </div>
  )
}

export default Footer
