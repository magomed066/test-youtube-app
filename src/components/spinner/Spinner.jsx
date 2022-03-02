import React from 'react'
import classes from './spinner.module.scss'

const Spinner = () => {
	return (
		<div className={classes['spinner']}>
			<div className={classes['loader']}>Loading...</div>
		</div>
	)
}

export default Spinner
