import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	auth,
	signInWithEmailAndPassword,
	doc,
	onSnapshot,
	collection,
	getDoc,
	setDoc,
	signOut,
	db,
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
			const { query, uid } = data

			const favQuery = doc(collection(db, `users/${uid}/queries`))

			setDoc(favQuery, {
				query: query,
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

export const getFavs = createAsyncThunk('favorites/list', (uid, thunkAPI) => {
	try {
		onSnapshot(collection(db, `users/${uid}/queries`), (sn) => {
			sn.docs.map((doc) => {
				return thunkAPI.dispatch({
					type: 'favorites/list/fulfilled',
					payload: [doc.data()],
				})
			})
		})
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

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
			.addCase(addToFav.fulfilled, (state) => {
				state.isSuccess = true
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
	},
})

export const { reset } = favoriteSlice.actions

export default favoriteSlice.reducer
