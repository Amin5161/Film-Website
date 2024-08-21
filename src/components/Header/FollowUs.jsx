import React from 'react'
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

export default function FollowUs() {
  return (
    <section className='container flex justify-end mt-4'>
        <div className='flex items-center text-sm text-slate-300'>
            <h3>FollowUs</h3>
            <ul className='flex ml-4 gap-2 '>
                <li className='hover:text-red-500'><a href="#"><CiYoutube/></a></li>
                <li className='hover:text-red-500'><a href="#"><FaInstagram/></a></li>
                <li className='hover:text-red-500'><a href="#"><CiFacebook/></a></li>
                <li className='hover:text-red-500'><a href="#"><CiTwitter/></a></li>
            </ul>
        </div>
    </section>
  )
}
