import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'

import classes from './main.module.scss'

const Main = () => {
	return (
		<div className={classes['main']}>
			<Header />

			<div className="container">
				<div className={classes['main-content']}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Main
