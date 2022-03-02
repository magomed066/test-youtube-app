import { configureStore } from '@reduxjs/toolkit'
import { authReducer, favoriteReducer, resultsRedducer } from '../features'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		results: resultsRedducer,
		favorite: favoriteReducer,
	},
	devTools: process.env.NODE_ENV !== 'production' ? true : false,
})
