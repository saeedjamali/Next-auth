import Link from 'next/link'
import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
function Sidebar() {
    return (
        <div className='flex flex-col items-start w-full  h-screen bg-gray-400 sticky'>
            <div className='w-full flex flex-col items-center justify-center h-24 bg-gray-400'>
                <span className='font-bold text-2xl'>SideBar</span>
            </div>
            <div className='flex-1 flex-col items-start gap-y-4'>
                <div style={{ height: ' 100px', overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}><path d="M-0.00,49.85 C150.00,149.60 271.37,-49.85 500.00,49.85 L500.00,0.00 L-0.00,0.00 Z" style={{ stroke: 'none', fill: '#9CA3AF ' }}></path></svg></div>
                <ul className='space-y-4 px-4'>
                    <li ><Link className='link-sidebar' href="/dashboard"><span><MdSpaceDashboard /></span><span>Dshboard</span></Link></li>
                    <li ><Link className='link-sidebar' href="/signin"><span><FaSignInAlt /></span><span>SingIn</span></Link></li>
                    <li ><Link className='link-sidebar' href="/signup"><span><FaSignInAlt /></span><span>SingUp</span></Link></li>
                    <li ><Link className='link-sidebar' href="/p-admin"><span><RiAdminFill /></span><span>Admin Panel</span></Link></li>
                    <li ><Link className='link-sidebar' href="/signout"><span><FaSignOutAlt /></span><span>Logout</span></Link></li>
                </ul>

            </div>
            <div>
                <div style={{ height: ' 100px', overflow: 'hidden' }} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}><path d="M-0.00,49.85 C150.00,149.60 349.20,-49.85 500.00,49.85 L500.00,149.60 L-0.00,149.60 Z" style={{ stroke: 'none', fill: '#9CA3AF ' }} ></path></svg></div>
            </div>
        </div>
    )
}

export default Sidebar