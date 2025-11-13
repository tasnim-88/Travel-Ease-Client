import React, { use, useState } from 'react';
import { Link, useLocation, } from 'react-router';
import { FiMail } from "react-icons/fi";
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';

const ForgetPassword = () => {
    const { reset } = use(AuthContext)

    const location = useLocation();
    const prefilledEmail = location.state?.email || "";
    const [email, setEmail] = useState(prefilledEmail);
    const [loading, setLoading] = useState(false);

    const handleReset = (e) => {
        e.preventDefault()
        setLoading(true);

        reset(email).then(() => {
            toast.success("✅ Password reset link sent! Redirecting to Gmail...");
            window.location.href = "https://mail.google.com";
        })
            .catch((error) => {
                toast.error("❌ Error: " + error.message);
            })
            .finally(() => {
                setLoading(false)
            })

    }
    return (
        <div>
            <title>Reset Password</title>
            <div className="min-h-screen flex items-center justify-center px-4 bg-base-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-4">
                        <img className='w-[60px] h-[60px] rounded-full bg-transparent' src="https://i.ibb.co.com/CsSDPqbC/Travel-Ease.png" alt="logo" />
                        <h1 className="text-2xl font-semibold text-gray-800">TRAVELEASE</h1>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Oops! Need a new password?
                    </h2>
                    <p className="text-gray-500 mb-6">
                        No problem! Just enter your email address below, and we’ll send you a
                        reset link.
                    </p>

                    <form onSubmit={handleReset}>
                        <div className="text-left mb-4">
                            <label className="text-sm font-medium text-gray-700">
                                Your Email Address
                            </label>
                            <div className="flex items-center border rounded-lg mt-2 px-3 py-2">
                                <FiMail className="text-gray-400 text-lg mr-2" />
                                <input
                                    type="email"
                                    required
                                    placeholder="e.g., parent@email.com"
                                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF8A00] hover:bg-[#FF7300] text-white font-medium py-3 rounded-lg transition-all duration-200"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-5">
                        I remember it now!{" "}
                        <Link to="/signin" className="text-[#FF8A00] font-medium hover:underline">
                            Back to Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;