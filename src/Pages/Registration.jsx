import React, { use, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Registration = () => {

    const { user, signUp, signInWithGoogle } = use(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, from, navigate])

    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log({ name, email, password });

        signUp(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                navigate(from)
                console.log(user);

            }).catch(err => {
                const errorCode = err.code
                console.log(errorCode);

            })
    }

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Successfully signed in', result.user)
                navigate(from)
            })
            .catch(err => {
                toast.error(err.code)
            })
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-base-100'>
            <div className='w-full max-w-xl'>
                <form onSubmit={handleRegister} className='bg-base-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
                    <h1 className='text-center mb-8 text-2xl'>Register an account</h1>
                    <div className='mb-4'>
                        <label className='block mb-2'>Full Name</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' type="text" name="name" placeholder='Enter your Name' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>Email Address</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' type="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className='mb-6'>
                        <label className='block mb-2'>Password</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' type="password" name="password" placeholder='********' required />
                    </div>
                    <button className='btn w-full'>Register Now</button>
                    <div className='divider'>OR</div>
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