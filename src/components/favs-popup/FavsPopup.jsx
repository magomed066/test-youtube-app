import React from 'react'
import { Link } from 'react-router-dom'
import classes from './favs-popup.module.scss'

const FavsPopup = () => {
	return (
		<div className={classes['tooltip']}>
			<div className={classes['tooltip-wrap']}>
				<span className={classes['tooltip__text']}>
					Поиск сохранен в «Избранное»
				</span>
				<Link to="/main/favorite" className={classes['tooltip__link']}>
					Перейти в избранное
				</Link>
			</div>
		</div>
	)
}

export default FavsPopup
