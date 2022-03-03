import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFav, reset, getItem } from '../../features/favs/favsSlice'
import { close, open } from '../../features/modal/modalSlice'
import { search } from '../../features/videos/videosSlice'
import Spinner from '../spinner/Spinner'
import classes from './fav-list.module.scss'

const FavList = ({ items = [] }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = useSelector((state) => state.auth)
	const { isLoading, item, updating } = useSelector((state) => state.favs)

	const {
		isLoading: videosLoading,
		isSuccess,
		message,
		isError,
	} = useSelector((state) => state.videos)

	useEffect(() => {
		if (item || updating) {
			dispatch(open())
		} else {
			dispatch(close())
		}
	}, [item, updating])

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		if (isSuccess) {
			navigate('/main/search')
		}
	}, [isSuccess, message, isError])

	const deleteItem = (item) => {
		const data = {
			uid: user.uid,
			item,
		}

		dispatch(deleteFav(data))
	}

	const getNeededElemet = (item) => {
		dispatch(getItem(item))
	}

	return (
		<ul className={classes['list']}>
			{(isLoading || videosLoading) && <Spinner />}
			{items?.map((item) => (
				<li key={item?.id} className={classes['list-item']}>
					<span className={classes['list-item__text']}>{item?.name}</span>
					<div className={classes['list-item-group']}>
						<button
							className={`${classes['list-item__btn']} ${classes['change']}`}
							onClick={() => {
								dispatch(
									search({
										query: item.query,
										maxResults: item.maxResults,
									}),
								)
							}}
						>
							Выполнить
						</button>
						<button
							className={`${classes['list-item__btn']} ${classes['change']}`}
							onClick={() => getNeededElemet(item)}
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
