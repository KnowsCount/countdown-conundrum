import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ClockContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	border: 1px solid black;
	border-radius: 50%;
`

const Hand = styled.div`
	position: absolute;
	bottom: 50%;
	left: 50%;
	width: 2px;
	height: 50%;
	background: black;
	transform-origin: center bottom;
	transition: all 1s linear;
`

interface ClockProps {
	timeLeft: number
}

const Clock: React.FC<ClockProps> = ({ timeLeft }) => {
	const [degrees, setDegrees] = useState(0)

	useEffect(() => {
		// Map the time left (30 to 0 seconds) to degrees (0 to 180 degrees)
		const newDegrees = mapRange(timeLeft, 30, 0, 0, 180)
		setDegrees(newDegrees)
	}, [timeLeft])

	function mapRange(
		value: number,
		a: number,
		b: number,
		c: number,
		d: number
	) {
		return ((value - a) * (d - c)) / (b - a) + c
	}

	return (
		<ClockContainer>
			<Hand style={{ transform: `rotate(${degrees}deg)` }} />
		</ClockContainer>
	)
}

export default Clock
