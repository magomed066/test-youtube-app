import React from 'react'
import classes from './card.module.scss'
import Preview from '../../assets/preview.png'

const Card = () => {
	return (
		<div className={classes['card']}>
			<img src={Preview} alt="preview" className={classes['card__img']} />

			<div className={classes['card-body']}>
				<h3 className={classes['card__title']}>
					Как накормить кошку натуралкой | Перечень полезных для кошек
					jaskdjaslkdjkasjdkl ajsljdla
				</h3>

				<p className={classes['card__subtitle']}>
					Ветеренария и Кормление соб dsakdjlksa
				</p>
				<p className={classes['card__subtitle']}>768 тыс. просмотров</p>
			</div>
		</div>
	)
}

export default Card
