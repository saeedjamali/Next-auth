import { verifyToken } from '@/utils/auth';
import connectToDB from '@/utils/db';
import React, { useEffect } from 'react'
import userModel from "@/models/user"
import { useUser } from '../context/userProvider';
import Todolist from '@/components/template/Todolist';

function Dashboard({ user }) {

  const { setIsLoggedIn, setIsAdmin } = useUser();
  useEffect(() => {
    if (user.rule == "ADMIN") setIsAdmin(true);

  }, [user]);
  return (
    <div><Todolist user={user} /></div>
  )
}

export default Dashboard

//SSR Route Protection
export async function getServerSideProps(context) {
  const { params, query, res, req } = context;
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const payloadToken = verifyToken(token);
  if (!payloadToken) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const { email } = payloadToken;
  const { isConnected } = await connectToDB();
  if (isConnected) {
    const user = await userModel.findOne({ email }, "rule firstname lastname _id").populate("todo")
      .lean();
    if (!user) {
      return {
        redirect: {
          destination: "/signin"
        }
      }
    }
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    }
  }
  return {
    redirect: {
      destination: "/signin"
    }
  }




}