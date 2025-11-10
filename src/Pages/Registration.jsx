import React, { use, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Registration = () => {
    const { user, signUp, signInWithGoogle } = use(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

    // State for password validation
    const [passError, setPassError] = useState([])
    const [isPassValid, setIsPassValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, from, navigate])

    // Password validation function
    const validPassword = (password) => {
        const errors = []

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long')
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter')
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter')
        }

        setPassError(errors)
        setIsPassValid(errors.length === 0)
        return errors.length === 0
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value
        validPassword(password)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        
        const name = e.target.name.value
        const email = e.target.email.value
        const image = e.target.image.value
        const password = e.target.password.value
        
        console.log({ name, email, image, password });

        // Validate password before proceeding
        if (!validPassword(password)) {
            toast.error('Please fix password errors before registering')
            return
        }

        setIsLoading(true)

        signUp(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success('Registration successful! Welcome to our platform.')
                console.log(user);
                
                // Navigate to home page on successful registration
                navigate('/', { replace: true })
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
            case 'auth/email-already-in-use':
                return 'This email is already registered. Please use a different email or sign in.'
            case 'auth/invalid-email':
                return 'Please enter a valid email address.'
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled. Please contact support.'
            case 'auth/weak-password':
                return 'Password is too weak. Please choose a stronger password.'
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection.'
            default:
                return 'Registration failed. Please try again.'
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

    return (
        <div className='min-h-screen flex justify-center items-center bg-base-100'>
            <div className='w-full max-w-xl my-10'>
                <form onSubmit={handleRegister} className='bg-base-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
                    <h1 className='text-center mb-8 text-2xl'>Register an account</h1>
                    
                    {/* Name */}
                    <div className='mb-4'>
                        <label className='block mb-2'>Full Name</label>
                        <input 
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                            type="text" 
                            name="name" 
                            placeholder='Enter your Name' 
                            required 
                        />
                    </div>
                    
                    {/* Email */}
                    <div className='mb-4'>
                        <label className='block mb-2'>Email Address</label>
                        <input 
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                            type="email" 
                            name="email" 
                            placeholder='Enter your email' 
                            required 
                        />
                    </div>
                    
                    {/* Photo URL */}
                    <div className='mb-4'>
                        <label className='block mb-2'>Photo URL</label>
                        <input 
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                            type='url' 
                            name="image" 
                            placeholder='Enter your image url' 
                        />
                    </div>
                    
                    {/* Password */}
                    <div className='mb-6'>
                        <label className='block mb-2'>Password</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                                passError.length > 0 ? 'border-red-500' : isPassValid ? 'border-green-500' : ''
                            }`}
                            type="password"
                            name="password"
                            placeholder='********'
                            onChange={handlePasswordChange}
                            required
                        />
                        
                        {/* Password validation errors */}
                        {passError.length > 0 && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-600 text-sm font-semibold mb-1">Password requirements:</p>
                                <ul className="text-red-500 text-sm list-disc list-inside">
                                    {passError.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Password validation success */}
                        {isPassValid && passError.length === 0 && (
                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                <p className="text-green-600 text-sm font-semibold">Password meets all requirements ✓</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Register Button - Kept as original */}
                    <button className='btn w-full'>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Registering...
                            </>
                        ) : (
                            'Register Now'
                        )}
                    </button>
                    
                    <div className='divider'>OR</div>
                    
                    {/* Google Sign In - Kept as original Link */}
                    <Link onClick={handleGoogle} className="btn border-[#e5e5e5] w-full">
                        <FcGoogle size={24} />Continue with Google
                    </Link>
                </form>
                
                <p className="text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link className="text-blue-600 hover:underline" to="/signin">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;