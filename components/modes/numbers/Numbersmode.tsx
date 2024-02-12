import React, { useState, useEffect } from 'react'
import { LetterBoxes, LetterBox, ButtonWrapper, Button } from '@/styles'
import { evaluate } from 'mathjs'

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

	const operators = ['+', '*', '-', '/']

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

		const newNumbers = isLarge
			? [newNumber, ...numbers]
			: [...numbers, newNumber]

		if (newNumbers.length === 6) {
			const target = Math.floor(Math.random() * 100) + 100
			setTargetNumber(target)

			const solution = backtrack(newNumbers.map(String), target)
			setSolution(solution)

			setGameStarted(true) // game starts when all numbers are generated
			startCountdown()
		}
	}

	const backtrack = (formulae: string[], target: number) => {
		let bestSoFar = '0'

		const formulate = (formulae: string[]): string | undefined => {
			const closest = closestTo(target, formulae)
			if (evaluate(closest) === target) {
				return closest
			}
			bestSoFar = closestTo(target, [bestSoFar, closest])
			for (const newFormulae of possibleFormulae(formulae)) {
				const answer = formulate(newFormulae)
				if (answer) {
					return answer
				}
			}
		}

		return formulate(formulae) || bestSoFar
	}

	const closestTo = (target: number, formulae: string[]) => {
		return formulae.reduce((a, b) =>
			distanceTo(target, a) < distanceTo(target, b) ? a : b
		)
	}

	const distanceTo = (target: number, formula: string) => {
		return Math.abs(target - evaluate(formula))
	}

	const possibleFormulae = (formulae: string[]) => {
		let result: string[][] = []
		for (let i1 = 0; i1 < formulae.length; i1++) {
			for (let i2 = 0; i2 < formulae.length; i2++) {
				if (i1 === i2) {
					continue
				}
				for (const op of operators) {
					const f1 = formulae[i1]
					const f2 = formulae[i2]
					const f1Value = evaluate(f1)
					const f2Value = evaluate(f2)
					if (
						op === '+' &&
						(i1 > i2 || f1Value === 0 || f2Value === 0)
					) {
						continue
					}
					if (op === '-' && f2Value === 0) {
						continue
					}
					if (
						op === '*' &&
						(i1 > i2 || f1Value === 1 || f2Value === 1)
					) {
						continue
					}
					if (
						op === '/' &&
						(f2Value === 1 || !divisible(f1Value, f2Value))
					) {
						continue
					}
					result.push(combine(op, formulae, i1, i2))
				}
			}
		}
		return result
	}

	const combine = (
		op: string,
		formulae: string[],
		index1: number,
		index2: number
	) => {
		const combined = formulae.filter((_, i) => i !== index1 && i !== index2)
		combined.push(`(${formulae[index1]} ${op} ${formulae[index2]})`)
		return combined
	}

	const divisible = (numerator: number, denominator: number) => {
		return denominator !== 0 && numerator % denominator === 0
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
			{numbers.length === 6 && <p>Target Number: {targetNumber}</p>}
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
				placeholder="Solution displayed here"
				disabled
			/>
			<ButtonWrapper>
				<Button onClick={revealSolution}>Reveal Solution</Button>
			</ButtonWrapper>
		</>
	)
}

export default NumbersGame
