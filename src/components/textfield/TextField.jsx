import React from 'react'
import Icon from '../icon/Icon'
import classes from './textfield.module.scss'

const TextField = ({
	label,
	type = 'text',
	onChange,
	id,
	name,
	value,
	placeholder,
	switchPass,
	className,
	disabled,
	required = false,
}) => {
	return (
		<div
			className={`${classes['textfield']} ${className} ${
				disabled ? classes['disabled'] : ''
			} }`}
		>
			{label && (
				<label
					htmlFor={id}
					className={`${required ? classes['required'] : ''}`}
				>
					{label}
				</label>
			)}

			<div className={classes['textfield-wrap']}>
				<input
					type={type}
					className={`${classes['textfield__item']} `}
					onChange={onChange}
					name={name}
					id={id}
					value={value}
					placeholder={placeholder}
					disabled={disabled}
				/>
				{name === 'password' ? (
					<Icon
						width={20}
						height={20}
						icon={type === 'text' ? 'eye-on' : 'eye-off'}
						onClick={switchPass}
					/>
				) : null}
			</div>
		</div>
	)
}

export default TextField
