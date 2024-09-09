"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function forgotPasswordPage(){
    const router = useRouter()
    const [user, setUser] = useState({email: ""})
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if(user.email.length > 0) {
           setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    }, [user])

    const onForgotPassword = async () => {
       try {
            setLoading(true)
            const response = await axios.post('/api/users/forgotpassword', user)
            console.log('User Found successfully', response.data);
            router.push('/resetpassword')
            
       } catch (error: any) {
            console.log("User Not Found", error.message);
            toast.error(error.message)
       }finally{
            setLoading(false);
       }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
                        {loading ? "Processing..." : "Forgot your Password ?"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">No worries, we'll send you a reset link.</p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={onForgotPassword}
                            type="submit"
                            className={`w-full py-3 mb-4 text-white font-bold rounded-lg transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                buttonDisabled
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-indigo-600 hover:bg-indigo-700"
                              }`}>
                              {buttonDisabled ? "No Submit" : "Submit"}        
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div>
        </div>
    )
}