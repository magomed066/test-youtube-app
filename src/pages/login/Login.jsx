import React, { useState } from 'react'
import { Button, TextField } from '../../components'
import classes from './login.module.scss'
import Logo from '../../assets/sibdev-logo.png'

const Login = () => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		login: '',
		password: '',
	})

	const { login, password } = formData

	const switchPass = () => setIsShowPassword((prev) => !prev)

	const changeHandler = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const submitHandler = (e) => {
		e.preventDefault()
	}

	return (
		<div className={classes['login']}>
			<div className={`${classes['login-card']} ${classes['card']}`}>
				<div className={classes['card-logo']}>
					<img src={Logo} alt="logo" className={classes['card-logo__item']} />
				</div>

				<h2 className={classes['card__title']}>Вход</h2>

				<form className={classes['card-form']} onSubmit={submitHandler}>
					<TextField
						label="Логин"
						placeholder="Введите"
						value={login}
						onChange={changeHandler}
						name="login"
					/>
					<TextField
						label="Пароль"
						type={isShowPassword ? 'text' : 'password'}
						placeholder="Введите"
						name="password"
						switchPass={switchPass}
						value={password}
						onChange={changeHandler}
					/>

					<Button
						type="submit"
						variant="primary"
						classNames={classes['card-form__btn']}
					>
						Войти
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Login
