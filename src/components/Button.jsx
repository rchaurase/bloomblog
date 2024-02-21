import React from 'react'

function Button({
  children,
  type='button',
  bgColor='bg-blue-600',
  textColor='white',
  className='',
  ...props

}) {
  return (
    <button className={` hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ${bgColor} ${className} ${textColor} {...props}`}
    >
      {children}
    </button>
  )
}

export default Button
