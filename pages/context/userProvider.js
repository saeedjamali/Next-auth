import axios from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';



const UserContext = createContext();
function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState("");
    const router = useRouter();


    const handleSignOut = async () => {
        try {
            const response = await axios.get("/api/auth/signout");
            console.log(response)
            if (response.status == 200) {
                toast.success(response.data.message);
                router.push("/")
                setIsAdmin(false);
                setIsLoggedIn(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.response?.data.message);
        }


    }
    useEffect(() => {
        const userAuth = async () => {

            try {
                const response = await axios.get("/api/auth/me")
                if (response.status == 200) {
                    setIsLoggedIn(true)

                    if (response.data.data.rule == "ADMIN") {
                        console.log("Plz gice me :", response.data.data);
                        console.log("When i run Provider IsAdmis...");
                        setIsAdmin(true);
                    }
                } else {
                    console.log(response.data.message);
                }

            } catch (error) {
                console.log(error.response?.data.message || "This page is not define!!");
            }
        }
        userAuth();
    }, []);


    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, user, setUser, handleSignOut }}>{children}</UserContext.Provider>
    )
}

export default UserProvider;

export function useUser() {
    return useContext(UserContext)
}

