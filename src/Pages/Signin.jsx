import React, { use, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Signin = () => {
    const { user, signIn } = use(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

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

        signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                navigate(from)
                console.log(user);

            }).catch(err => {
                const errorCode = err.code
                console.log(errorCode);

            })

    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-base-100 '>
            <div className='w-full max-w-xl'>
                <form onSubmit={handleSignIn} className='bg-base-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
                    <h1 className='text-center mb-8 text-2xl'>Sign in to your account</h1>
                    <div className='mb-4'>
                        <label className='block mb-2'>Email Address</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' type="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className='mb-6'>
                        <label className='block mb-2'>Password</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' type="password" name="password" placeholder='********' required />
                        <div className='mt-4'>
                            <Link>Forgot Password</Link>
                        </div>
                    </div>
                    <button className='btn w-full'>Sign in</button>
                    <div className='divider'>OR</div>
                    <Link className="btn border-[#e5e5e5] w-full">
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