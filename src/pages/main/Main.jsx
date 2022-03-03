import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header, Modal } from '../../components'

import classes from './main.module.scss'

const Main = () => {
	const { isVisible } = useSelector((state) => state.modal)
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
