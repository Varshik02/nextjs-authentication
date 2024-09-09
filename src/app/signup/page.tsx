"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data);
            router.push("/login")
            
            
        } catch (error:any) {
            console.log("Signup Failed", error.message);
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                {loading ? "Processing..." : "Signup"}
              </h1>
              <hr className="mb-6" />
              
              <label htmlFor="username" className="block text-gray-700 font-medium">
                Username
              </label>
              <input
                className="py-3 px-4 mb-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Enter your username"
              />
              
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                className="py-3 px-4 mb-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
              
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                className="py-3 px-4 mb-6 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
              />
              
              <button
                onClick={onSignup}
                className={`w-full py-3 mb-4 text-white font-bold rounded-lg transition duration-300 ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}>
                {buttonDisabled ? "No signup" : "Signup"}
              </button>
              
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login">
                  <span className="text-indigo-600 hover:underline">Visit login page</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
      
}