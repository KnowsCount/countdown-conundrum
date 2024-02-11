import React from 'react'
import { LetterBoxes, LetterBox, ButtonWrapper, Button } from '@/styles'

const WordsGame: React.FC<{
	timeLeft: number
	letters: string
	inputWord: string
	setInputWord: (word: string) => void
	checkWord: () => void
	addLetter: (type: string) => void
}> = ({ timeLeft, letters, inputWord, setInputWord, checkWord, addLetter }) => {
	return (
		<>
			<LetterBoxes>
				{Array(9)
					.fill('')
					.map((_, i) => (
						<LetterBox key={i}>{letters[i] || ''}</LetterBox>
					))}
			</LetterBoxes>
			<ButtonWrapper>
				<Button onClick={() => addLetter('vowel')}>Add Vowel</Button>
			</ButtonWrapper>
			<ButtonWrapper>
				<Button onClick={() => addLetter('consonant')}>
					Add Consonant
				</Button>
			</ButtonWrapper>
			<input
				type="text"
				value={inputWord}
				onChange={(e) => setInputWord(e.target.value)}
				placeholder="Enter your word here"
			/>
			<ButtonWrapper>
				<Button onClick={checkWord} disabled={letters.length < 9}>
					Submit
				</Button>
			</ButtonWrapper>
		</>
	)
}

export default WordsGame
