import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFav, reset } from '../../features/favorite/favoriteSlice'
import Spinner from '../spinner/Spinner'
import classes from './fav-list.module.scss'

const FavList = ({ items = [] }) => {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	const { isLoading, isSuccess, message, isError } = useSelector(
		(state) => state.favorite,
	)

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		dispatch(reset())
	}, [isSuccess, message, isError, dispatch])

	const deleteItem = (item) => {
		const data = {
			uid: user.uid,
			item,
		}

		dispatch(deleteFav(data))
	}
	return (
		<ul className={classes['list']}>
			{isLoading && <Spinner />}
			{items?.map((item) => (
				<li key={item?.id} className={classes['list-item']}>
					<span className={classes['list-item__text']}>{item?.name}</span>
					<div className={classes['list-item-group']}>
						<button
							className={`${classes['list-item__btn']} ${classes['change']}`}
						>
							Изменить
						</button>
						<button
							className={`${classes['list-item__btn']} ${classes['delete']}`}
							onClick={() => deleteItem(item)}
						>
							Удалить
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default FavList
