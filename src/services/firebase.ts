// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

type SignInWithCredentialOptions = {
  onCompleted?: (user: User) => void
  onError?: (user: unknown) => void
}
const signInWithCredential = async (
  email: string,
  password: string,
  options?: SignInWithCredentialOptions
) => {
  let credentials = null
  try {
    credentials = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password
    )
    options?.onCompleted?.(credentials.user)
  } catch (error) {
    options?.onError?.(error)
  }
}

type SignOutOptions = {
  onCompleted?: (session: unknown) => void
  onError?: (error: unknown) => void
}

const signOut = async (options?: SignOutOptions) => {
  try {
    const result = await firebaseSignOut(auth)
    options?.onCompleted?.(result)
  } catch (error) {
    options?.onError?.(error)
  }
}

const onAuthStateChanged = (callback: (user: User | null) => void) => {
  firebaseOnAuthStateChanged(auth, callback)
}

const uploadRawFile = async (file: File, filePath: string) => {
  const storage = getStorage(firebase) // get default bucket
  const storageRef = ref(storage, filePath) // second parameter is key, use this name in bucket

  await uploadBytes(storageRef, file)
}

const db = getFirestore('note-genius')

export type { User }
export {
  auth,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  uploadRawFile,
  db,
}
export default firebase
