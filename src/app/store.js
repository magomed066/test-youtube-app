import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	favsReducer,
	modalReducer,
	videosReducer,
} from '../features'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		videos: videosReducer,
		modal: modalReducer,
		favs: favsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production' ? true : false,
})
