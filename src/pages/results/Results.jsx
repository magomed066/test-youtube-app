import React from 'react'
import { Card, Icon, SearchBar } from '../../components'
import classes from './results.module.scss'

const Results = () => {
	return (
		<div className={classes['results']}>
			<div className="container">
				<div className={classes['results-wrap']}>
					<div className={classes['results-header']}>
						<h2 className={classes['results-header__title']}>Поиск видео</h2>
						<SearchBar icon={true} />
					</div>

					<div className={`${classes['results-cards']} ${classes['cards']}`}>
						<div className={classes['cards-header']}>
							<p className={classes['cards-header__title']}>
								Видео по запросу <strong> «Одиннадцать минут» </strong>
								<span>7230</span>
							</p>

							<div className={classes['cards-header-icons']}>
								<Icon width={24} height={24} icon="list" color="#1717194D" />
								<Icon width={24} height={24} icon="grid" color="#272727" />
							</div>
						</div>

						<div className={classes['cards-container']}>
							<Card />
							<Card />
							<Card />
							<Card />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Results
