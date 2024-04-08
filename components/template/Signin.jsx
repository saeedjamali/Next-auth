import { useUser } from '@/pages/context/userProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import toast from 'react-hot-toast';

function Signin() {


    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isVerify, setIsVerify] = useState(false);
    const [isSendCode, setIsSendCode] = useState(true);
    const [phone, setPhone] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(false);
    const { setIsLoggedIn, setIsAdmin, setUser } = useUser();



    useEffect(() => {
        const getMe = async () => {
            try {
                const response = await axios.get("/api/auth/me");

                if (response.status == 200) {
                    if (response.data.data.rule == "ADMIN") {
                        setIsAdmin(true);
                        setUser(response.data.data);
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
            return toast.error("Signin form is not Completed!!")
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
                setUser(response.data.data)

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!phone) {
            toast.error("phone number is not valid")
            return false
        }
        try {
            const res = await axios.post("/api/sms/send", { phone });

            if (res.status == 201) {

                toast.success(res.data.message);
                setIsVerify(true);
                setIsSendCode(false);
                setTimer(true)
            } else {
                toast.error("Unknown Error in send verification code!!")
            }

        } catch (error) {
            console.log("handleSendOtp :", error);
        }
        setIsLoading(false);
    }

    const handleVerifyCode = async (e) => {
        if (!verifyCode) {
            toast.error("code number is not valid")
            return false;
        }
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post("/api/sms/verify", { phone, code: verifyCode });
            // console.log("Response :", response);
            if (response.status == 201) {
                toast.success(response.data.message);
                setTimer(false)
                // Route to other pages
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("handleVerifyCodeError :", error);
        }
        setIsLoading(false)
    }

    const finishTimer = () => {
        setIsSendCode(true);
        setIsVerify(false);
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

                    <span className='font-bold text-3xl my-8'>Signin with Sms</span>
                    {
                        isSendCode && <form className='w-[75%] space-y-4 my-8 ease-in-out duration-300 transition-all' >

                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder='MobileNumber' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md ' required />

                            <div>
                                <button className='w-full bg-blue-400 text-white rounded-md py-2  ' onClick={(e) => handleSendOtp(e)}>
                                    {isLoading && <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>}
                                    SendCode</button>

                            </div>
                        </form>
                    }
                    {
                        isVerify && <form className='w-[75%] space-y-4 my-8 ease-in-out duration-300 transition-all' >

                            <input value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} type="text" placeholder='Code' className='w-full px-4 py-2 outline-none bg-gray-200 rounded-md ' required />

                            <div className='flex items-center justify-between'>
                                {timer && <div className='mr-4'>


                                    <CountdownCircleTimer
                                        size={32}
                                        strokeWidth={4}
                                        isPlaying
                                        duration={120}

                                        colors={["#0066FF", "#9000ff", "#A30000"]}
                                        colorsTime={[120, 60, 0]}
                                        onComplete={finishTimer}
                                    >
                                        {({ remainingTime }) => remainingTime}
                                    </CountdownCircleTimer>

                                </div>}

                                <button className='w-full bg-blue-400 text-white rounded-md py-2  ' onClick={(e) => handleVerifyCode(e)}>
                                    {isLoading && <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    }


                                    VerifyCode</button>
                            </div>

                        </form>
                    }


                </div>
            </div>
        </div>
    )
}

export default Signin