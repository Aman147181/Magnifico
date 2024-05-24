"use client"
import React, { useState } from 'react'
import MobileSidebar from './MobileNavbar';
import { EB_Garamond, Montserrat } from 'next/font/google'
import { GiHamburgerMenu } from "react-icons/gi";
export const garamond = EB_Garamond({
    subsets: ['latin'],
    display: 'swap',
})
export const mont = Montserrat({
    subsets: ['latin'],
    display: 'swap',
})
  
const Header = () => {
  const [showmobilemenu, setshowmobilemenu] = useState(false);
  return (
    <div className={`flex ${mont.className}  fixed bg-white z-10 text-[#2F4137] top-0 w-full items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 h-20`}>
       <MobileSidebar
        isOpen={showmobilemenu}
        onClose={() => setshowmobilemenu(false)}
      />
          <button onClick={()=>setshowmobilemenu(el=>!el)} className='hover:text-[#D39364] uppercase flex items-center'><GiHamburgerMenu/><span className='pl-2'>menu</span></button>
          <h1 className={`${garamond.className} uppercase text-2xl sm:text-3xl lg:text-4xl`} >magnifiqo</h1>
          <h1 className='hidden md:block hover:text-[#D39364]'>make a reservation</h1>
    </div>
  )
}

export default Header