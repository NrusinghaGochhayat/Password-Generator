import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white flex justify-between items-center h-12 px-5'>
        <div className="logo font-bold text-2xl">
        <span className='text-green-700'>&lt;</span>
        Pass
        <span className='text-green-700 font-bold'>Op</span>
        <span className='text-red-900'>/</span>
        <span className='text-green-700'>&gt;</span>
        </div>
      <ul>
        <button className='relative right-60 flex justify-center item-center text-sm gap-2'>
          <img className=' w-6 invert pl-1' src="src/github-logo.png" alt="Github logo" />
          <h1>Github</h1>
          
        </button>
        
      </ul>
    </nav>
  )
}

export default Navbar
