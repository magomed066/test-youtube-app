import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FavList, Spinner } from '../../components'
import { getFavs } from '../../features/favorite/favoriteSlice'
import classes from './favorite.module.scss'

const Favorite = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	const { isLoading, list } = useSelector((state) => state.favorite)

	useEffect(() => {
		dispatch(getFavs(user.uid))
	}, [])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={classes['favorite']}>
			{/* {isLoading && <h1>Loading...</h1>} */}
			<h1 className={classes['favorite__title']}>Избранное</h1>

			<div className={classes['favorite-content']}>
				<FavList items={list} />
			</div>
		</div>
	)
}

export default Favorite
