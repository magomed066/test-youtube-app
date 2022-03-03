import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header, Modal } from '../../components'

import classes from './main.module.scss'

const Main = () => {
	const { isVisible } = useSelector((state) => state.modal)

	useEffect(() => {
		if (isVisible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [isVisible])

	return (
		<div className={classes['main']}>
			<Header />

			<div className="container">
				<div className={classes['main-content']}>
					<Outlet />
				</div>
			</div>

			{isVisible && <Modal />}
		</div>
	)
}

export default Main
