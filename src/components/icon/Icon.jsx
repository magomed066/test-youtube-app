import React from 'react'
import Icons from '../../assets/icons.svg'

const Icon = ({ icon, color, width, height, onClick }) => {
	return (
		<svg
			className="icon"
			width={width}
			height={height}
			style={{ fill: 'none', stroke: color }}
			onClick={onClick}
		>
			<use xlinkHref={`${Icons}#${icon}`}></use>
		</svg>
	)
}

export default Icon
