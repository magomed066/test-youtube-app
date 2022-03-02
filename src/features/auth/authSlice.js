import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

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
})

export const { reset } = authSlice.actions

export default authSlice.reducer
