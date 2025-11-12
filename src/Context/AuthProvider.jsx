import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    provider.addScope("profile")
    provider.addScope("email")

    // Sign up new user
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Sign in
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

   

    // Update Profile
    const updateUser = async(name, image) => {
        await updateProfile(auth.currentUser, {
            displayName:name,
            photoURL:image
        }).then(()=>{
            setUser({ ...auth.currentUser });
        })
    }

    const signout = () => {
        return signOut(auth)
    }

     // Side effect/Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>unsubscribe()

    }, [])

    const authInfo = {
        user, signUp, loading, setLoading, signIn, signout, signInWithGoogle, updateUser
    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;