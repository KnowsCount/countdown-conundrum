import React, { useEffect, useState } from 'react'
import { ClockContainer, Hand } from './Clock.style'

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
