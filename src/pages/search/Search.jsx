import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Icon, SearchBar } from '../../components'
import Spinner from '../../components/spinner/Spinner'
import { close } from '../../features/modal/modalSlice'
import { reset, search } from '../../features/videos/videosSlice'
import classes from './search.module.scss'

const Search = () => {
	const [value, setValue] = useState('')
	const [showContent, setShowContent] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		isSuccess,
		isError,
		message,
		isLoading,
		videos,
		maxResults,
		searchValue,
	} = useSelector((state) => state.videos)

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		if (isSuccess && videos.length) {
			setShowContent(true)
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

		const data = {
			query: value,
			maxResults,
		}

		dispatch(search(data))
	}

	return (
		<div
			className={`${classes['search']} ${!showContent ? classes['flex'] : ''}`}
		>
			{isLoading && <Spinner />}
			{!showContent && (
				<div className={classes['search-wrap']}>
					<SearchBlock
						classNames="search-wrap__title"
						onChange={changeHandler}
						onSubmit={submitHandler}
						value={value}
					/>
				</div>
			)}

			{showContent && (
				<div className={classes['search-content']}>
					<div className={classes['search-header']}>
						<SearchBlock
							classNames="search-header__title"
							onChange={changeHandler}
							onSubmit={submitHandler}
							value={value || searchValue}
							icon={true}
						/>
					</div>

					<div className={classes['search-info']}>
						<p className={classes['search-info__title']}>
							Видео по запросу <strong> «{searchValue}» </strong>
							<span>{videos.length}</span>
						</p>

						<div className={classes['search-info-icons']}>
							<Icon width={24} height={24} icon="list" color="#1717194D" />
							<Icon width={24} height={24} icon="grid" color="#272727" />
						</div>
					</div>

					<div className={classes['search-list']}>
						{videos.map((item) => (
							<Card
								key={
									item?.id?.videoId ||
									item?.id?.playlistId ||
									item?.id?.channelId
								}
								item={item}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const SearchBlock = ({
	classNames,
	onChange,
	onSubmit,
	value,
	icon = false,
}) => {
	return (
		<>
			<h1 className={classes[classNames]}>Поиск видео</h1>
			<SearchBar
				onChange={onChange}
				onSubmit={onSubmit}
				value={value}
				icon={icon}
			/>
		</>
	)
}

export default Search
