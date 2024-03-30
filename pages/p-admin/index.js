import { verifyToken } from '@/utils/auth';
import connectToDB from '@/utils/db';
import React from 'react'
import userModel from "@/models/user"

function AdminPage({ user }) {
  return (
    <div>Admin Panel  (welcome {user?.firstname} - {user?.lastname})</div>
  )
}

export default AdminPage



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
    const user = await userModel.findOne({ email }, "firstname lastname rule -_id");
    if (!user) {
      return {
        redirect: {
          destination: "/signin"
        }
      }
    }
    if (user.rule != "ADMIN") {
      return {
        redirect: {
          destination: "/dashboard"
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