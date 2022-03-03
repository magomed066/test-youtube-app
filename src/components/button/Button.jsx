import React from 'react'
import classes from './button.module.scss'

const Button = ({
	type = 'button',
	children,
	variant,
	classNames,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className={`${classes['btn']} ${classes[`btn-${variant}`]} ${classNames}`}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
