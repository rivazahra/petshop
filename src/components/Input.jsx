import React, { useMemo, useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'

const Input = ({ label, id, type, ...props }) => {
const [showPass, setShowPass] = useState(false)

const inputType = useMemo(() => {
if (type === 'password') {
return showPass ? 'text' : 'password';
}
return type
}, [type, showPass])
return (

<div className='w-full'>
    <label htmlFor="">{label}</label>
    <div className='w-full  relative space-y-1.5'>
        <input type={inputType} id={id} name={id} 
            className='w-full px-3  py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...props} />
        {type === 'password' && (
        <button type='button' onClick={()=> setShowPass((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPass ?
            <RiEyeFill /> :
            <RiEyeOffFill />}
        </button>
        )}
    </div>
</div>

)
}

export default Input
