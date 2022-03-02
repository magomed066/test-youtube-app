import React from 'react'
import classes from './header.module.scss'
import Logo from '../../assets/sibdev-logo.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<div className={classes['header']}>
			<div className="container">
				<div className={classes['header-wrap']}>
					<div className={classes['header-logo']}>
						<img
							src={Logo}
							alt="logo"
							className={classes['header-logo__item']}
						/>
					</div>
					<ul className={classes['header-list']}>
						<li className={classes['header-list__item']}>
							<NavLink
								to="/main/search"
								className={(props) => {
									return `${props.isActive ? classes['active'] : ''} ${
										classes['header-list__link']
									}`
								}}
							>
								Поиск
							</NavLink>
						</li>
						<li className={classes['header-list__item']}>
							<NavLink
								to="/main/favorite"
								className={(props) => {
									return `${props.isActive ? classes['active'] : ''} ${
										classes['header-list__link']
									}`
								}}
							>
								Избранное
							</NavLink>
						</li>
					</ul>
					<div className={classes['header__logout']}>Выход</div>
				</div>
			</div>
		</div>
	)
}

export default Header
