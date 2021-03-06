import { initializeApp } from 'firebase/app'
import {
	doc,
	collection,
	setDoc,
	getFirestore,
	getDoc,
	onSnapshot,
	getDocs,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore'
import {
	onAuthStateChanged,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export {
	app,
	onAuthStateChanged,
	auth,
	signInWithEmailAndPassword,
	doc,
	collection,
	db,
	setDoc,
	signOut,
	onSnapshot,
	getDoc,
	updateDoc,
	deleteDoc,
	getDocs,
}
