import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	auth,
	signInWithEmailAndPassword,
	doc,
	collection,
	setDoc,
	signOut,
	db,
} from '../../firebase'

const user = JSON.parse(localStorage.getItem('user'))

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
	const { email, password } = data
	try {
		const res = await signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				const user = res.user

				return user
			})
			.then((user) => {
				const addUser = doc(collection(db, 'users'), user.uid)
				setDoc(addUser, {
					uid: user.uid,
				})
				const data = {
					email: user.email,
					uid: user.uid,
				}
				localStorage.setItem('user', JSON.stringify(data))
				return user
			})

		return {
			uid: res.auth.currentUser.uid,
			email: res.auth.currentUser.email,
		}
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	signOut(auth).then(() => {
		localStorage.clear()
	})
})

const initialState = {
	user: user ? user : null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset(state) {
			state.isError = false
			state.isLoading = false
			state.isSuccess = false
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	},
})

export const { reset } = authSlice.actions

export default authSlice.reducer
