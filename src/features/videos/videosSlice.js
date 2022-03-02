import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import youtubeService from '../../services/youtubeService'

const initialState = {
	videos: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
	searchValue: '',
}

export const search = createAsyncThunk(
	'result/search',
	async (query, thunkAPI) => {
		try {
			const data = await youtubeService.search(query)

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

const resultsSlice = createSlice({
	name: 'results',
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

export const { reset } = resultsSlice.actions

export default resultsSlice.reducer
