import React, { useEffect, useState } from 'react'
import classes from './searchbar.module.scss'
import { Icon } from '../'
import FavPopup from '../favorites-popup/FavPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addToFav } from '../../features/favorite/favoriteSlice'

const SearchBar = ({
	icon,
	onChange = () => {},
	onSubmit = () => {},
	value,
}) => {
	const [isActivePopup, setIsActivePopup] = useState(false)
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	// useEffect(() => {
	// 	if (isActivePopup) {
	// 		setTimeout(() => setIsActivePopup(false), 4000)
	// 	}

	//   return () => {

	//   }
	// }, [isActivePopup])

	const addQueryToFav = (q) => {
		setIsActivePopup((prev) => !prev)

		const data = {
			query: q,
			uid: user.uid,
		}

		if (q.length) {
			dispatch(addToFav(data))
		}
	}

	return (
		<form className={classes['searchbar']} onSubmit={onSubmit}>
			<div className={classes['searchbar-wrap']}>
				<input
					type="text"
					className={classes['searchbar__input']}
					placeholder="Что хотите посмотреть?"
					onChange={onChange}
					value={value || ''}
				/>
				{icon && (
					<Icon
						width={20}
						height={20}
						icon="heart"
						color="#1390E5"
						onClick={() => {
							addQueryToFav(value)
						}}
					/>
				)}
				{isActivePopup && <FavPopup />}
			</div>
			<button type="submit" className={classes['searchbar__btn']}>
				Найти
			</button>
		</form>
	)
}

export default SearchBar
