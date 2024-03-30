
import { verifyToken } from '@/utils/auth';
import connectToDB from '@/utils/db';
import React from 'react'
import userModel from "@/models/user"




export default function Home({ user }) {

  
  return (
    <div>Home Page (welcome {user?.firstname} - {user?.lastname})</div>
  )
}


export async function getServerSideProps(context) {
  console.log("HomePage Get Server Side")
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
    const user = await userModel.findOne({ email }, "firstname lastname -_id");
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
