import React from 'react'
import { MdClose } from 'react-icons/md'

const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 opacity-98 z-50 flex justify-center items-center'>
        <div className="bg-white rounded p-4 w-full max-w-md">
            <div className="flex items-center justify-between gap-3">
                <h1 className='font-semibold cursor-pointer'>Add Field</h1>
                <button onClick={close}>
                    <MdClose size={25}/>
                </button>
            </div>
            <input 
            className='bg-blue-50 my-3 p-2 border outline-none focus-within:bg-amber-400 w-full'
            placeholder='Enter field name' 
            type='text'
            value={value}
            onChange={onChange}
            />
            <button
            className='bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded mx-auto w-fit block'
            onClick={submit}>
                Submit
            </button>
        </div>
    </section>
  )
}

export default AddFieldComponent
