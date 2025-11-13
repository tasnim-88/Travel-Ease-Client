import React, { use, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Signin = () => {
    const { user, signIn, signInWithGoogle } = use(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
            return
        }
    }, [user, navigate, from])

    const handleSignIn = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log({ email, password });

        setIsLoading(true)

        signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success('Successfully signed in! Welcome back.')
                navigate(from, { replace: true })
                console.log(user);
            })
            .catch(err => {
                const errorCode = err.code
                const errorMessage = getErrorMessage(errorCode)
                console.log(errorCode);
                toast.error(errorMessage)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // Helper function to convert Firebase error codes to user-friendly messages
    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No account found with this email. Please check your email or create a new account.'
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.'
            case 'auth/invalid-email':
                return 'Please enter a valid email address.'
            case 'auth/invalid-credential':
                return 'Invalid email or password. Please try again.'
            case 'auth/user-disabled':
                return 'This account has been disabled. Please contact support.'
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later.'
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection.'
            default:
                return 'Sign in failed. Please try again.'
        }
    }

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Successfully signed in with Google!')
                navigate(from, { replace: true })
            })
            .catch(err => {
                const errorMessage = getGoogleErrorMessage(err.code)
                toast.error(errorMessage)
            })
    }

    // Helper function for Google sign-in errors
    const getGoogleErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/popup-closed-by-user':
                return 'Sign in was cancelled. Please try again.'
            case 'auth/popup-blocked':
                return 'Popup was blocked. Please allow popups for this site.'
            case 'auth/unauthorized-domain':
                return 'This domain is not authorized for Google sign-in.'
            default:
                return 'Google sign-in failed. Please try again.'
        }
    }
    const handleToggleShow = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)

    }

    const handleForgotPassword = () => {
        navigate('/forgotPassword', { state: { email } })
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-base-100 '>
            <div className='w-full max-w-xl my-10'>
                <form onSubmit={handleSignIn} className='bg-base-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
                    <h1 className='text-center mb-8 text-2xl'>Sign in to your account</h1>
                    <div className='mb-4'>
                        <label className='block mb-2'>Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block mb-2'>Password</label>
                        <div className='relative'>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder='********'
                                required
                            />
                            <button onClick={handleToggleShow} className=" absolute top-3 right-7 z-10">{showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}</button>
                        </div>
                        {/* <div className='mt-4'>
                            <Link>Forgot Password</Link>
                        </div> */}
                        <div onClick={handleForgotPassword} className='mt-2'><a className="link link-hover font-semibold">Forgot password?</a></div>
                    </div>
                    <button className='btn w-full'>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                    <div className='divider'>OR</div>
                    <Link onClick={handleGoogle} className="btn border-[#e5e5e5] w-full">
                        <FcGoogle size={24} />Continue with Google
                    </Link>
                </form>
                <p className="text-center text-gray-600 text-sm">
                    Don’t have an account?{' '}
                    <Link className="text-blue-600 hover:underline" to="/registration">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;