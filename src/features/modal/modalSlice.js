import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isVisible: false,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open(state) {
			state.isVisible = true
		},
		close(state) {
			state.isVisible = false
		},
	},
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer
