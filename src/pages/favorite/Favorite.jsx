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
			{list.length ? (
				<>
					{' '}
					<h1 className={classes['favorite__title']}>Избранное</h1>
					<div className={classes['favorite-content']}>
						<FavList items={list} />
					</div>
				</>
			) : (
				<h1 className={classes['favorite__title']}>Ничего нет</h1>
			)}
		</div>
	)
}

export default Favorite
