import React, { useEffect, useState } from 'react'
import classes from './searchbar.module.scss'
import { Icon } from '../'
// import FavPopup from '../favorites-popup/FavPopup'
import { useDispatch, useSelector } from 'react-redux'
import { open } from '../../features/modal/modalSlice'

const SearchBar = ({
	icon,
	onChange = () => {},
	onSubmit = () => {},
	value,
}) => {
	const [isActivePopup] = useState(false)
	const dispatch = useDispatch()
	const [isSaved, setIsSaved] = useState(false)

	const { isSuccess } = useSelector((state) => state.favs)

	useEffect(() => {
		if (isSuccess) {
			setIsSaved(true)
		}
	}, [isSuccess])

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
						fill={isSaved ? '#C5E4F9' : ''}
						onClick={() => {
							dispatch(open())
						}}
					/>
				)}
				{/* {isActivePopup && <FavPopup />} */}
			</div>
			<button type="submit" className={classes['searchbar__btn']}>
				Найти
			</button>
		</form>
	)
}

export default SearchBar
