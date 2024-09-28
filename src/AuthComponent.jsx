import React, { useState } from 'react';
import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user] = useAuthState(auth);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
          });
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }, { merge: true });
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
            });
        } catch (error) {
            console.error('Error signing up with email', error);
        }
    };

    const signInWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing in with email', error);
        }
    };

    if (user) {
        return (
            <div>
                <h2>Welcome, {user.displayName || user.email}!</h2>
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Sign Up / Login</h2>
            <form onSubmit={signUpWithEmail}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={signInWithEmail}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};

export default AuthComponent;