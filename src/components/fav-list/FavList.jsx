import React from 'react'
import classes from './fav-list.module.scss'

const FavList = ({ items }) => {
	return (
		<ul className={classes['list']}>
			{items?.map((item) => (
				<li key={item?.id} className={classes['list-item']}>
					<span className={classes['list-item__text']}>{item?.query}</span>
					<div className={classes['list-item-group']}>
						<button
							className={`${classes['list-item__btn']} ${classes['change']}`}
						>
							Изменить
						</button>
						<button
							className={`${classes['list-item__btn']} ${classes['delete']}`}
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
