"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token});
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Verify Your Email
        </h1>

        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500 rounded-lg w-full mb-6">
            <h2 className="text-lg font-semibold text-yellow-700 text-center">
              Token
            </h2>
            <p className="text-center text-yellow-800 mt-2 break-all">
              {token ? token : "No token found"}
            </p>
          </div>

          {verified && (
            <div className="w-full">
              <h2 className="mt-4 text-2xl text-center text-white bg-green-600 p-3 rounded-lg shadow-lg">
                Email Verified Successfully
              </h2>
              <Link
                href="/login"
                className="block mt-6 text-center text-white bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-all text-xl"
              >
                Go to Login
              </Link>
            </div>
          )}

          {error && (
            <div className="w-full">
              <h2 className="mt-4 text-2xl text-center text-white bg-red-600 p-3 rounded-lg shadow-lg">
                Error in Verification
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
