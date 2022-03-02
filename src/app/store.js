import { configureStore } from '@reduxjs/toolkit'
import { authReducer, resultsRedducer } from '../features'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		results: resultsRedducer,
	},
	devTools: process.env.NODE_ENV !== 'production' ? true : false,
})
