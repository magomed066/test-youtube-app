import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Icon, SearchBar } from '../../components'
import Spinner from '../../components/spinner/Spinner'
import { reset, search } from '../../features/videos/videosSlice'
import youtubeService from '../../services/youtubeService'
import classes from './results.module.scss'

const Results = () => {
	const [value, setValue] = useState('')
	const { videos, searchValue, isLoading, message, isError, isSuccess } =
		useSelector((state) => state.results)
	const { isLoading: favLoading } = useSelector((state) => state.favorite)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		dispatch(reset())
	}, [videos, , dispatch, isSuccess, isError])

	useEffect(() => {
		if (!videos.length) {
			navigate('/main/search')
		}
	}, [videos])

	useEffect(() => {
		if (searchValue.length) {
			setValue(searchValue)
		}
	}, [searchValue])

	const changeHandler = (e) => {
		setValue(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()

		if (!value.length) {
			alert('Заполните поле!')
			return
		}

		dispatch(search(value))
	}

	return (
		<div className={classes['results']}>
			{(isLoading || favLoading) && <Spinner />}
			<div className="container">
				<div className={classes['results-wrap']}>
					<div className={classes['results-header']}>
						<h2 className={classes['results-header__title']}>Поиск видео</h2>
						<SearchBar
							icon={true}
							value={value}
							onChange={changeHandler}
							onSubmit={submitHandler}
						/>
					</div>

					<div className={`${classes['results-cards']} ${classes['cards']}`}>
						{videos.length ? (
							<>
								<div className={classes['cards-header']}>
									<p className={classes['cards-header__title']}>
										Видео по запросу <strong> «{searchValue}» </strong>
										<span>7230</span>
									</p>

									<div className={classes['cards-header-icons']}>
										<Icon
											width={24}
											height={24}
											icon="list"
											color="#1717194D"
										/>
										<Icon width={24} height={24} icon="grid" color="#272727" />
									</div>
								</div>

								<div className={classes['cards-container']}>
									{videos?.map((item) => (
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
							</>
						) : (
							<h2 className={classes['empty__msg']}>Видео не найдено</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Results
