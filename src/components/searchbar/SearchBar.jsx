import React from 'react'
import classes from './searchbar.module.scss'
import { Icon } from '../'

const SearchBar = ({ icon }) => {
	return (
		<form className={classes['searchbar']}>
			<div className={classes['searchbar-wrap']}>
				<input
					type="text"
					className={classes['searchbar__input']}
					placeholder="Что хотите посмотреть?"
				/>
				{icon && <Icon width={20} height={20} icon="heart" color="#1390E5" />}
			</div>
			<button type="submit" className={classes['searchbar__btn']}>
				Найти
			</button>
		</form>
	)
}

export default SearchBar
