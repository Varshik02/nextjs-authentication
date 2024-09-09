"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if both passwords match and are of sufficient length
    if (
      user.password.length >= 5 &&
      user.confirmPassword.length >= 5 &&
      user.password === user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onResetPassword = async () => {
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      // Make API call to reset password (token should be passed to validate request)
      const response = await axios.post("/api/users/resetpassword", user);
      console.log("Password reset successful", response.data);
      toast.success("Password reset successfully!");

      // Redirect to login page after reset
      router.push("/login");
    } catch (error: any) {
      console.log("Error resetting password", error.message);
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            {loading ? "Processing..." : "Reset Your Password"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </div>
            <div>
                <br />
              <label htmlFor="confirm-password" className="sr-only">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={onResetPassword}
              className={`w-full py-3 mb-4 text-white font-bold rounded-lg transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Passwords Must Match" : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
