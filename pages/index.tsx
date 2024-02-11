import React, { useState, useEffect } from 'react'
import {
	MainContainer,
	ButtonWrapper,
	Button,
} from '@/styles'
import { Clock } from '@/components/common/Clock'
import { Footer } from '@/components/common/Footer'
import WordsGame from '@/components/modes/word/Wordmode'
import NumbersGame from '@/components/modes/numbers/Numbersmode'

const IndexPage: React.FC = () => {
    const [wordList, setWordList] = useState<string[]>([])
	const [countdownInterval, setCountdownInterval] =
		useState<NodeJS.Timeout | null>(null)
	const [timeLeft, setTimeLeft] = useState<number>(30)
	const [letters, setLetters] = useState<string>('')
	const [inputWord, setInputWord] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const [gameMode, setGameMode] = useState<string>('word')

	const switchGameMode = () => {
		setGameMode(gameMode === 'word' ? 'numbers' : 'word')
	}

	useEffect(() => {
		fetch('https://random-word-api.herokuapp.com/all')
			.then((response) => response.json())
			.then((data) => {
				setWordList(data)
			})
	}, [])

	useEffect(() => {
		if (timeLeft > 0 && countdownInterval) {
			const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
			return () => clearTimeout(id)
		} else if (timeLeft <= 0 && countdownInterval) {
			clearInterval(countdownInterval)
			setCountdownInterval(null)
			setMessage('Time is up!')
			setInputWord('')
			if (audio) {
				audio.pause()
				setAudio(null)
			}
		}
	}, [timeLeft])

	const generateRandomVowel = () => {
		const vowels = 'aeiou'
		return vowels[Math.floor(Math.random() * vowels.length)]
	}

	const generateRandomConsonant = () => {
		const consonants = 'bcdfghjklmnpqrstvwxyz'
		return consonants[Math.floor(Math.random() * consonants.length)]
	}

	useEffect(() => {
		if (letters.length === 9) {
			startCountdown()
		}
	}, [letters])

	const addLetter = (type: string) => {
		if (letters.length >= 9) {
			setMessage('You already have 9 letters.')
			return
		}

		let newLetter
		if (type === 'vowel') {
			newLetter = generateRandomVowel()
		} else {
			newLetter = generateRandomConsonant()
		}
		setLetters(letters + newLetter)
	}

	const playGame = () => {
		setLetters('')
		setInputWord('')
		setMessage('')
		setTimeLeft(30)
		if (countdownInterval) {
			clearInterval(countdownInterval)
			setCountdownInterval(null)
		}
		if (audio) {
			audio.pause()
			setAudio(null)
		}
	}

	const startCountdown = () => {
		if (!countdownInterval) {
			setTimeLeft(30)
			const interval = setInterval(() => {
				setTimeLeft((timeLeft) => timeLeft - 1)
			}, 1000)
			setCountdownInterval(interval)
	
			// play the audio!
			const audio = new Audio('/clockonly.mp3')
			audio.play()
			setAudio(audio)
		}
	}
	
	const canFormWordFromLetters = (word: string, letters: string) => {
		let letterCounts: { [key: string]: number } = {}
		for (let letter of letters) {
			if (letter in letterCounts) {
				letterCounts[letter]++
			} else {
				letterCounts[letter] = 1
			}
		}
		for (let letter of word) {
			if (!(letter in letterCounts) || letterCounts[letter] == 0) {
				return false
			} else {
				letterCounts[letter]--
			}
		}
		return true
	}

	const findLongestWord = (letters: string) => {
		let longestWord = ''
		for (let word of wordList) {
			if (
				word.length > longestWord.length &&
				canFormWordFromLetters(word, letters)
			) {
				longestWord = word
			}
		}
		return longestWord
	}

	const checkWord = () => {
		if (countdownInterval) {
			clearInterval(countdownInterval)
			setCountdownInterval(null)
		}
		if (audio) {
			audio.pause()
			setAudio(null)
		}
		const longestWord = findLongestWord(letters)
		if (inputWord.length > letters.length) {
			setMessage('Your word is too long.')
		} else if (!canFormWordFromLetters(inputWord, letters)) {
			setMessage('Your word contains letters not in the given set.')
		} else if (!wordList.includes(inputWord)) {
			setMessage(`Sorry, ${inputWord} is not a valid word.`)
		} else {
			if (inputWord.length === longestWord.length) {
				setMessage(
					`Well done! Your word was: ${inputWord}. That's the longest word possible!`
				)
			} else {
				setMessage(
					`Well done! Your word was: ${inputWord}. But you could have done better. The longest word possible is: ${longestWord}`
				)
			}
		}
	}

    return (
        <MainContainer>
            <Clock timeLeft={timeLeft} />
            <p>Time left: {timeLeft} seconds</p>
            <h1>Countdown Conundrum</h1>
            {gameMode === 'word' ? (
                <WordsGame
                    timeLeft={timeLeft}
                    letters={letters}
                    inputWord={inputWord}
                    setInputWord={setInputWord}
                    checkWord={checkWord}
                    addLetter={addLetter}
                />
            ) : (
				<NumbersGame startCountdown={startCountdown} timeLeft={timeLeft} />
            )}
            <ButtonWrapper>
                <Button onClick={playGame}>New Game</Button>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button onClick={switchGameMode}>
                    Switch to {gameMode === 'word' ? 'Numbers' : 'Word'} Mode
                </Button>
            </ButtonWrapper>
            <p>{message}</p>
            <Footer />
        </MainContainer>
    )
}

export default IndexPage
