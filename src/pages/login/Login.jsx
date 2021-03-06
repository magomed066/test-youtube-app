import React, { useEffect, useState } from 'react'
import { Button, TextField } from '../../components'
import classes from './login.module.scss'
import Logo from '../../assets/sibdev-logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'

const Login = () => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth,
	)

	const { email, password } = formData

	useEffect(() => {
		if (isError) {
			alert(message)
		}
		if (user || isSuccess) {
			navigate('/main/search')
		}

		dispatch(reset())
	}, [user, isSuccess, isError, message, navigate, dispatch])

	const switchPass = () => setIsShowPassword((prev) => !prev)

	const changeHandler = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		dispatch(login({ email, password }))
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
						value={email}
						onChange={changeHandler}
						name="email"
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
						{isLoading ? 'Загурзка...' : 'Войти'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Login
