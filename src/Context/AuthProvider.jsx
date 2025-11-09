import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()

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

    // Side effect/Observer
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])

    const signout = () => {
        return signOut(auth)
    }


    const authInfo = {
        user, signUp, loading, signIn, signout, signInWithGoogle
    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;