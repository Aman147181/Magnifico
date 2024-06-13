"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../(notAdmin)/components/AdminSidebar";
import { User, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function AdminLayout({ children }) {
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (!response.ok) {
        toast.error("Failed to logout");
        throw new Error("Failed to logout");
       
      }
      toast.success("Logged out successfully");
      router.push("/")
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/profile'); // Adjust the endpoint as needed
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData)
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className=" grid grid-cols-5  w-full bg-slate-50 h-screen">
      <div className="col-span-1">
        <AdminSidebar />
      </div>
      <div className="col-span-4 relative">
        <div className="absolute  h-20 top-0 bg-white  justify-end flex w-full pr-16  ">
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
        <User
            name={user?.user.name}
            description={user?.user.email}
            avatarProps={{
              src: user?.user.image
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" >
           <Link href="/profile"><p >Profile</p></Link> 
            
          </DropdownItem>
          
          <DropdownItem key="logout" color="danger">
                <button onClick={handleLogout}>
                Log Out
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
         
        </div>
        {children}
      </div>
    </div>
  );
}
