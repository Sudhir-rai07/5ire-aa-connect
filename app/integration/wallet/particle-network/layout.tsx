import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='max-w-[1300px] mx-auto min-h-screen'>
      {children}
    </div>
  )
}

export default layout
