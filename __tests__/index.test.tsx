import '@testing-library/jest-dom'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect';
import IndexPage from '../pages/index'

// Mocking the fetch API
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(['word1', 'word2', 'word3']),
	})
) as jest.Mock

describe('IndexPage', () => {
	it('renders without crashing', async () => {
		await act(async () => {
			render(<IndexPage />)
		})
	})

	it('fetches the word list on mount', async () => {
		render(<IndexPage />)
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'https://random-word-api.herokuapp.com/all'
			)
		})
	})

	it('renders the title', async () => {
		const { getByText } = render(<IndexPage />)
		await waitFor(() => {
			expect(getByText('Countdown Conundrum')).toBeInTheDocument()
		})
	})

	it('adds a vowel when the "Add Vowel" button is clicked', async () => {
		const { getByText } = render(<IndexPage />)
		const button = getByText('Add Vowel')
		await act(async () => {
			fireEvent.click(button)
		})
		// Check if the vowel has been added
		// Since we can't predict the exact vowel, we just check if the letters state has been updated
		await waitFor(() => {
			expect(getByText(/^[aeiou]$/)).toBeInTheDocument()
		})
	})

	it('adds a consonant when the "Add Consonant" button is clicked', async () => {
		const { getByText } = render(<IndexPage />)
		const button = getByText('Add Consonant')
		await act(async () => {
			fireEvent.click(button)
		})
		// Check if the consonant has been added
		// Since we can't predict the exact consonant, we just check if the letters state has been updated
		await waitFor(() => {
			expect(getByText(/^[bcdfghjklmnpqrstvwxyz]$/)).toBeInTheDocument()
		})
	})

	it('starts a new game when the "New Game" button is clicked', async () => {
		const { getByText } = render(<IndexPage />)
		const button = getByText('New Game')
		await act(async () => {
			fireEvent.click(button)
		})
		// Check if the game has been reset
		await waitFor(() => {
			expect(getByText('Time left: 30 seconds')).toBeInTheDocument()
		})
	})
})
