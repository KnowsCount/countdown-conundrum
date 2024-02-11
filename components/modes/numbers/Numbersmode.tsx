import React, { useState, useEffect } from 'react'
import { LetterBoxes, LetterBox, ButtonWrapper, Button } from '@/styles'

interface NumbersGameProps {
	startCountdown: () => void
	timeLeft: number
}

const NumbersGame: React.FC<NumbersGameProps> = ({
	startCountdown,
	timeLeft,
}) => {
	const [numbers, setNumbers] = useState<number[]>([])
	const [targetNumber, setTargetNumber] = useState<number>(0)
	const [playerSolution, setPlayerSolution] = useState<string>('')
	const [solution, setSolution] = useState<string>('')
	const [gameStarted, setGameStarted] = useState<boolean>(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlayerSolution(e.target.value)
	}

	const generateNumbers = (isLarge: boolean) => {
		if (numbers.length >= 6) {
			return
		}

		const largeNumbers = [25, 50, 75, 100]
		const smallNumbers = Array.from({ length: 10 }, (_, i) => i + 1)
		const newNumber = isLarge
			? largeNumbers[Math.floor(Math.random() * largeNumbers.length)]
			: smallNumbers[Math.floor(Math.random() * smallNumbers.length)]

		if (isLarge) {
			setNumbers([newNumber, ...numbers])
		} else {
			setNumbers([...numbers, newNumber])
		}

		setTargetNumber(Math.floor(Math.random() * 100) + 100)
		// Here you should implement the logic to calculate the solution
		setSolution('Placeholder solution')
		setGameStarted(true) // game starts when all numbers are generated

		const newNumbers = isLarge
			? [newNumber, ...numbers]
			: [...numbers, newNumber]
		const newNumbersLength = newNumbers.length

		if (newNumbersLength === 6) {
			startCountdown()
		}
	}

	const revealSolution = () => {
		setPlayerSolution(solution)
	}

	return (
		<>
			<LetterBoxes>
				{numbers.map((number, i) => (
					<LetterBox key={i}>{number}</LetterBox>
				))}
			</LetterBoxes>
			<p>Target Number: {targetNumber}</p>
			<ButtonWrapper>
				<Button onClick={() => generateNumbers(true)}>
					Generate Large Number
				</Button>
				<Button onClick={() => generateNumbers(false)}>
					Generate Small Number
				</Button>
			</ButtonWrapper>
			<input
				type="text"
				value={playerSolution}
				onChange={handleInputChange}
				placeholder="Enter your solution here"
			/>
			<ButtonWrapper>
				<Button onClick={revealSolution}>Reveal Solution</Button>
			</ButtonWrapper>
		</>
	)
}

export default NumbersGame
