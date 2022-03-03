import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import videosService from './videosService'

const initialState = {
	videos: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
	searchValue: '',
	maxResults: 12,
}

export const search = createAsyncThunk(
	'videos/search',
	async ({ query, maxResults }, thunkAPI) => {
		try {
			const data = await videosService.search(query, maxResults)

			console.log(data)

			return { query, data: data?.items }
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

const videosSlice = createSlice({
	name: 'videos',
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
			.addCase(search.pending, (state) => {
				state.isLoading = true
			})
			.addCase(search.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.searchValue = action.payload.query
				state.videos = action.payload.data
			})
			.addCase(search.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = videosSlice.actions

export default videosSlice.reducer
