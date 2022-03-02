import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../../components'
import Spinner from '../../components/spinner/Spinner'
import { reset, search } from '../../features/videos/videosSlice'
import classes from './search.module.scss'

const Search = () => {
	const [value, setValue] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { isSuccess, isError, message, isLoading, videos } = useSelector(
		(state) => state.results,
	)

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		if (isSuccess && videos.length) {
			navigate('/main/search/results', { replace: true })
		}

		dispatch(reset())
	}, [dispatch, navigate, isSuccess, isError, message, videos])

	const changeHandler = (e) => {
		setValue(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()

		if (!value) {
			alert('Заполните поле!')
			return
		}

		dispatch(search(value))
	}

	return (
		<div className={classes['search']}>
			{isLoading && <Spinner />}
			<div className={classes['search-wrap']}>
				<h1 className={classes['search-wrap__title']}>Поиск видео</h1>
				<SearchBar
					onChange={changeHandler}
					onSubmit={submitHandler}
					value={value}
				/>
			</div>
		</div>
	)
}

export default Search
