import React from 'react'

function Signup() {
    return (
        <div>
            <div className='w-full h-screen bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center'>
                <div className='w-[40%] bg-gray-500 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-3xl my-8'>SignUp Form</span>
                    <form className='w-[75%] space-y-4 my-8' >
                        <input type="text" placeholder='FirsName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input type="text" placeholder='LastName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input type="text" placeholder='UserName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input type="email" placeholder='Email' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input type="password" placeholder='Password' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <div>
                            <button className='w-full bg-blue-400 text-white rounded-md py-2 mt-8 '>SignUp</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup