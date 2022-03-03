import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	favoriteReducer,
	modalReducer,
	resultsRedducer,
} from '../features'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		results: resultsRedducer,
		favorite: favoriteReducer,
		modal: modalReducer,
	},
	devTools: process.env.NODE_ENV !== 'production' ? true : false,
})
