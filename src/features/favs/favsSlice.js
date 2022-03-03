import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, collection, getDocs, setDoc, db, deleteDoc } from '../../firebase'
import favsService from './favsService'

const initialState = {
	list: [],
	item: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
	updating: false,
}

export const addToFav = createAsyncThunk(
	'favorites/add',
	async (data, thunkAPI) => {
		try {
			const { item, uid } = data

			await favsService.addToFavs(item, uid)
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

// export const getItem = createAsyncThunk('favorites/item', (data, thunkAPI) => {
// 	try {
// 		return data
// 	} catch (error) {
// 		const message =
// 			(error.response && error.response.data && error.response.data.message) ||
// 			error.message ||
// 			error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })

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
export const updateFav = createAsyncThunk(
	'favorites/update',
	async (data, thunkAPI) => {
		const { item, uid } = data
		try {
			await favsService.updateFav(item, uid)

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
			state.updating = false
		},

		getItem(state, action) {
			state.item = action.payload
			state.updating = true
		},

		clearItem(state) {
			state.item = null
			state.updating = ''
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
			.addCase(updateFav.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateFav.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.list = state.list.map((item) =>
					item.id === action.payload.id ? action.payload : item,
				)
				state.item = null
				state.updating = false
			})
			.addCase(updateFav.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset, getItem, clearItem } = favoriteSlice.actions

export default favoriteSlice.reducer
