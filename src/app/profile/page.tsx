"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/user");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
          Profile
        </h1>
        <hr className="mb-6" />
        
        <p className="text-center text-white bg-orange-500 text-lg mb-6 rounded-lg p-2">Profile Page</p>
        
        <h2 className={`p-2 mb-6 rounded-lg text-center ${data === 'nothing' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {data === 'nothing' ? "Nothing" : 
          <Link href={`/profile/${data}`}>
            <span className="underline hover:text-gray-200 transition">{data}</span>
          </Link>}
        </h2>
        
        <button
          onClick={logout}
          className="w-full py-3 mb-4 text-white font-bold rounded-lg transition duration-300 bg-blue-600 hover:bg-blue-700"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="w-full py-3 text-white font-bold rounded-lg transition duration-300 bg-green-500 hover:bg-green-600"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
