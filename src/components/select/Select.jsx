import React, { useEffect, useRef, useState } from 'react'
import Icon from '../icon/Icon'
import classes from './select.module.scss'

const Select = ({ label, items = [], getData = () => {} }) => {
	const [isActive, setIsActive] = useState(false)
	const [title, setTitle] = useState('')
	const ref = useRef(null)

	useEffect(() => {
		const close = (e) => {
			if (!e.path.includes(ref.current)) {
				setIsActive(false)
			}
		}

		if (isActive) window.addEventListener('click', close)

		return () => window.removeEventListener('click', close)
	}, [isActive])

	return (
		<div
			className={`${classes['select-wrap']} ${
				isActive ? classes['active'] : ''
			}`}
		>
			{label && <label>{label}</label>}
			<div
				className={classes['select-content']}
				onClick={() => setIsActive((prev) => !prev)}
			>
				<h2
					className={`${classes['select-content__title']} ${
						title ? classes['active'] : ''
					}`}
				>
					{title || 'Выберите'}
				</h2>
				<Icon width={10} height={10} icon="arrow-down" />
			</div>

			<ul className={classes['select-list']} ref={ref}>
				{items.length ? (
					items.map((item) => (
						<li
							key={item?.id}
							className={classes['select-list__item']}
							onClick={() => {
								getData(item)
								setTitle(item.name)
								setIsActive(false)
							}}
						>
							{item.name}
						</li>
					))
				) : (
					<li className={classes['select-list__empty']}>Пусто</li>
				)}
			</ul>
		</div>
	)
}

export default Select
