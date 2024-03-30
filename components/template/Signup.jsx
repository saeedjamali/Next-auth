import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Signup() {
    const router = useRouter();
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            firstname,
            lastname,
            username,
            email,
            password
        }
        try {
            const response = await axios.post('/api/auth/signup', newUser);
    
            if (response.status == 201) {
                toast.success(response.data.message);
                setFirstName("");
                setLastName("");
                setUserName("");
                setEmail("");
                setPassword("");
                router.push('/signin');

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return (
        <div>
            <div className='w-full h-screen bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center'>
                <div className='w-[40%] bg-gray-500 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-3xl my-8'>SignUp Form</span>
                    <form className='w-[75%] space-y-4 my-8' method='post' >
                        <input value={firstname} onChange={(event => setFirstName(event.target.value))} type="text" placeholder='FirstName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input value={lastname} onChange={(event => setLastName(event.target.value))} type="text" placeholder='LastName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input value={username} onChange={(event => setUserName(event.target.value))} type="text" placeholder='UserName' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input value={email} onChange={(event => setEmail(event.target.value))} type="email" placeholder='Email' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <input value={password} onChange={(event => setPassword(event.target.value))} type="password" placeholder='Password' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' />
                        <div>
                            <button className='w-full bg-blue-400 text-white rounded-md py-2 mt-8 ' onClick={(e) => handleSignUp(e)}>SignUp</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup