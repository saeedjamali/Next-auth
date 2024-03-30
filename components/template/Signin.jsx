import { useUser } from '@/pages/context/userProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Signin() {


    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { setIsLoggedIn, setIsAdmin } = useUser();



    useEffect(() => {
        const getMe = async () => {
            try {
                const response = await axios.get("/api/auth/me");

                if (response.status == 200) {
                    if (response.data.data.rule == "ADMIN") {
                        setIsAdmin(true);
                    }
                    router.push("/dashboard");
                    toast.success(response.data.message);
                }

            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        getMe();
    }, []);

    const handleSignin = async (e) => {
        e.preventDefault();

        if (!identifier.trim() || !password.trim()) {
            return toast.error("Plz Form is Completed!!")
        }

        const signinUser = { identifier, password };
        try {
            const response = await axios.post('api/auth/signin', signinUser);
            if (response.status == 200) {
                toast.success(response.data.message);
                setIsLoggedIn(true);
                router.push('/dashboard');
                setIdentifier("");
                setPassword("");
               
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <div className='w-full h-screen bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center'>
                <div className='w-[40%] bg-gray-500 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-3xl my-8'>Signin Form</span>
                    <form className='w-[75%] space-y-4 my-8' >

                        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} type="text" placeholder='Email \ Username' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md' required autoComplete='off' />
                        <div>
                            <button className='w-full bg-blue-400 text-white rounded-md py-2 mt-8 ' onClick={(e) => handleSignin(e)}>SignIn</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signin