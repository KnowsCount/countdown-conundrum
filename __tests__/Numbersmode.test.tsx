import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import NumbersGame from '@/components/modes/numbers/Numbersmode'

jest.mock('mathjs', () => ({
	evaluate: jest.fn(),
}))

describe('NumbersGame', () => {
	const startCountdown = jest.fn()
	const timeLeft = 30

	it('renders without crashing', () => {
		const { getByText } = render(
			<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />
		)
		expect(getByText('Generate Large Number')).toBeInTheDocument()
		expect(getByText('Generate Small Number')).toBeInTheDocument()
		expect(getByText('Reveal Solution')).toBeInTheDocument()
	})

	it('generates large number when "Generate Large Number" button is clicked', () => {
		const { getByText } = render(
			<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />
		)
		act(() => {
			fireEvent.click(getByText('Generate Large Number'))
		})
		expect(getByText(/25|50|75|100/)).toBeInTheDocument()
	})

	it('generates small number when "Generate Small Number" button is clicked', () => {
		const { getByText } = render(
			<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />
		)
		act(() => {
			fireEvent.click(getByText('Generate Small Number'))
		})
		expect(getByText(/[1-9]|10/)).toBeInTheDocument()
	})

	it('displays target number when 6 numbers are generated', async () => {
		const { getByText } = render(
			<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />
		)
		for (let i = 0; i < 6; i++) {
			act(() => {
				fireEvent.click(getByText('Generate Small Number'))
			})
		}
		expect(getByText(/Target Number: \d+/)).toBeInTheDocument()
	})

	// This apparently takes up forever to load: the backtrack is taking forever. I'll try something newer later.
	/* it('reveals solution when "Reveal Solution" button is clicked', () => {
		const { getByText, getByPlaceholderText } = render(<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />);
		const solution = '5+3';
		NumbersGame.prototype.backtrack = jest.fn(() => solution);
		act(() => {
			fireEvent.click(getByText('Reveal Solution'));
		});
		expect(getByPlaceholderText('Solution displayed here')).toHaveValue(solution);
	}); */
})
