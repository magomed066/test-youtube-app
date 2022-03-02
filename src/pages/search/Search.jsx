import React from 'react'
import { SearchBar } from '../../components'
import classes from './search.module.scss'

const Search = () => {
	return (
		<div className={classes['search']}>
			<div className={classes['search-wrap']}>
				<h1 className={classes['search-wrap__title']}>Поиск видео</h1>
				<SearchBar />
			</div>
		</div>
	)
}

export default Search
