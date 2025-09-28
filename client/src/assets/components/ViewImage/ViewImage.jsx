import React from 'react'
import { IoMdClose } from 'react-icons/io'

const ViewImage = ({url, close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 opacity-98 flex justify-center items-center z-80 '>
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white">
        <button className='w-fit ml-auto block' onClick={close}>
            <IoMdClose size={25} />
        </button>
        <img 
        src={url}
        alt= 'full screen'
        className='w-full h-full object-scale-down'
        />
      </div>
    </div>
  )
}

export default ViewImage
