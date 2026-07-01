import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider)

export const logOut = () => signOut(auth)
