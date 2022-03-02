import React, { useEffect, useState } from 'react'
import classes from './searchbar.module.scss'
import { Icon } from '../'
import FavPopup from '../favorites-popup/FavPopup'

const SearchBar = ({
	icon,
	onChange = () => {},
	onSubmit = () => {},
	value,
}) => {
	const [isActivePopup, setIsActivePopup] = useState(false)

	useEffect(() => {
		if (isActivePopup) {
			setTimeout(() => setIsActivePopup(false), 4000)
		}
	}, [isActivePopup])

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
						onClick={() => setIsActivePopup((prev) => !prev)}
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
