import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classes from './modal.module.scss'
import { Select, TextField } from '../../components'
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../features/modal/modalSlice'
import { addToFav, clearItem, updateFav } from '../../features/favs/favsSlice'

const sortData = [
	{ id: 1, name: 'Дата', value: 'date' },
	{ id: 2, name: 'Рейтинг', value: 'rating' },
	{ id: 3, name: 'Кол-во просмотров', value: 'viewCount' },
	{ id: 4, name: 'Актуальные', value: 'relevance' },
	{ id: 5, name: 'Заголовки', value: 'title' },
	{ id: 6, name: 'Кол-во видео', value: 'videoCount' },
]

const ModalContent = () => {
	const [formData, setFormData] = useState({
		maxResults: 10,
		query: '',
		name: '',
		sort: '',
	})

	const { maxResults, query, name } = formData

	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)
	const { searchValue } = useSelector((state) => state.videos)
	const { isLoading, isSuccess, isError, message, updating, item, list } =
		useSelector((state) => state.favs)

	useEffect(() => {
		if (searchValue) {
			setFormData((prev) => ({
				...prev,
				query: searchValue,
			}))
		}
	}, [searchValue])

	useEffect(() => {
		if (updating && item) {
			console.log(item)
			setFormData((prev) => ({
				...prev,
				maxResults: item.maxResults,
				query: item.query ? item.query : searchValue,
				name: item.name,
				sort: item.sort,
			}))
		}

		// if (isSuccess) {
		// 	dispatch(close())
		// }
	}, [updating, item, isSuccess])

	useEffect(() => {
		if (isError) {
			alert(message)
		}

		if (isSuccess && !updating) {
			dispatch(close())
		}
	}, [dispatch, isError, message, isSuccess])

	const changeHandler = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const submitHandler = (e) => {
		e.preventDefault()

		const newQuery = {
			...formData,
			query: query ? query : searchValue,
			id: item.id ? item.id : null,
		}

		if (!newQuery.query || !newQuery.name) {
			alert('Заполните поля!')
			return
		}

		if (updating) {
			dispatch(updateFav({ uid: user.uid, item: newQuery }))
		} else {
			dispatch(addToFav({ uid: user.uid, item: newQuery }))
		}
	}

	const cancel = () => {
		const confirmed = window.confirm('Уверены?')

		if (!confirmed) return

		dispatch(close())
		dispatch(clearItem())
	}

	return (
		<div className={classes['modal']}>
			<div
				className={classes['modal-overflow']}
				onClick={() => {
					dispatch(close())
					dispatch(clearItem())
				}}
			></div>
			<div className={classes['modal-dialog']}>
				<h2 className={classes['modal-dialog__title']}>
					{updating ? 'Изменить запрос' : 'Сохранить запрос'}
				</h2>

				<form
					className={`${classes['modal-form']} ${classes['form']}`}
					onSubmit={submitHandler}
				>
					<TextField
						label={'Запрос'}
						className={`${classes['modal-form__input']}`}
						placeholder="Введите"
						onChange={changeHandler}
						name="query"
						value={query}
						disabled={updating ? false : true}
					/>
					<TextField
						label={'Название'}
						className={classes['modal-form__input']}
						placeholder="Введите"
						onChange={changeHandler}
						name="name"
						value={name}
					/>

					<Select
						label={'Сортировать по'}
						items={sortData}
						getData={(data) => {
							setFormData((prev) => ({ ...prev, sort: data.value }))
						}}
					/>

					<div className={classes['form-resizer']}>
						<input
							className={classes['form-resizer__item']}
							type="range"
							onChange={changeHandler}
							name="maxResults"
							value={maxResults}
							min={0}
							max={50}
						/>

						<div className={classes['form-resizer__total']}>{maxResults}</div>
					</div>

					<div className={classes['form-group']}>
						<Button variant="cancel" onClick={cancel}>
							{updating ? 'Не изменять' : 'Не сохранить'}
						</Button>
						<Button variant="primary" type="submit">
							{isLoading ? 'Загрузка...' : updating ? 'Изменить' : 'Сохранить'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

const Modal = () => {
	return ReactDOM.createPortal(
		<ModalContent />,
		document.getElementById('modal'),
	)
}

export default Modal
