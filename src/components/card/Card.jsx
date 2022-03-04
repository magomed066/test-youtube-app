import React from 'react'
import classes from './card.module.scss'
import Preview from '../../assets/preview.png'

const Card = ({ item, isGrid }) => {
	const { description, thumbnails, title } = item?.snippet || {}
	return (
		<div className={`${classes['card']} ${!isGrid ? classes['grid'] : ''}`}>
			<img
				src={thumbnails?.high?.url || Preview}
				alt="preview"
				className={classes['card__img']}
			/>

			<div className={classes['card-body']}>
				<h3 className={classes['card__title']}>{title || 'empty'}</h3>

				<p className={classes['card__subtitle']}>
					{description || 'no description'}
				</p>
				<p className={classes['card__subtitle']}>768 тыс. просмотров</p>
			</div>
		</div>
	)
}

export default Card
