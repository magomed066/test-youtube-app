import React from 'react'
import { Link } from 'react-router-dom'
import classes from './fav-popup.module.scss'

const FavPopup = () => {
	return (
		<div className={classes['popup']}>
			<div className={classes['popup-wrap']}>
				<p className={classes['popup__text']}>
					Поиск сохранен в разделе «Избранное»
				</p>
				<Link to="/main/favorite" className={classes['popup__link']}>
					Перейти в избранное
				</Link>
			</div>
		</div>
	)
}

export default FavPopup
