import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	auth,
	signInWithEmailAndPassword,
	doc,
	onSnapshot,
	collection,
	getDoc,
	getDocs,
	setDoc,
	signOut,
	db,
	deleteDoc,
} from '../../firebase'

const initialState = {
	list: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
}

export const addToFav = createAsyncThunk(
	'favorites/add',
	async (data, thunkAPI) => {
		try {
			const { item, uid } = data

			const favQuery = doc(collection(db, `users/${uid}/queries`))

			setDoc(favQuery, {
				...item,
				id: favQuery.id,
			})
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const getFavs = createAsyncThunk(
	'favorites/list',
	async (uid, thunkAPI) => {
		try {
			const docRef = collection(db, `users/${uid}/queries`)

			const res = await getDocs(docRef)

			let d = []
			res.forEach((doc) => {
				d.push(doc.data())
			})

			return d
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

export const deleteFav = createAsyncThunk(
	'favorites/delete',
	async (data, thunkAPI) => {
		const { item, uid } = data
		try {
			await deleteDoc(doc(db, `users/${uid}/queries/${item.id}`))
			return item
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

const favoriteSlice = createSlice({
	name: 'favorite',
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
			.addCase(addToFav.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addToFav.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(addToFav.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getFavs.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getFavs.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.list = action.payload
			})
			.addCase(getFavs.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteFav.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(deleteFav.fulfilled, (state, action) => {
				console.log(action.payload)
				state.isLoading = false
				state.isSuccess = true
				state.list = state.list.filter((i) => i.id !== action.payload.id)
			})
			.addCase(deleteFav.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = favoriteSlice.actions

export default favoriteSlice.reducer
