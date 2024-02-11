import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Clock from '@/components/Clock';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    height: 100vh;
`;

const LetterBoxes = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const LetterBox = styled.div`
    width: 30px;
    height: 30px;
    margin: 0 5px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border: 1px solid transparent;
`;

const IndexPage: React.FC = () => {
    const [wordList, setWordList] = useState<string[]>([]);
    const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [letters, setLetters] = useState<string>('');
    const [inputWord, setInputWord] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetch('https://random-word-api.herokuapp.com/all')
            .then(response => response.json())
            .then(data => {
                setWordList(data);
            });
    }, []);

    useEffect(() => {
      if (timeLeft > 0 && countdownInterval) {
          const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
          return () => clearTimeout(id);
      } else if (timeLeft <= 0 && countdownInterval) {
          clearInterval(countdownInterval);
          setCountdownInterval(null);
          setMessage('Time is up!');
          setInputWord('');
      }
  }, [timeLeft]);
  

    const generateRandomVowel = () => {
        const vowels = 'aeiou';
        return vowels[Math.floor(Math.random() * vowels.length)];
    }

    const generateRandomConsonant = () => {
        const consonants = 'bcdfghjklmnpqrstvwxyz';
        return consonants[Math.floor(Math.random() * consonants.length)];
    }

    useEffect(() => {
      if (letters.length === 9) {
          startCountdown();
      }
  }, [letters]);
  
  const addLetter = (type: string) => {
      if (letters.length >= 9) {
          setMessage('You already have 9 letters.');
          return;
      }
  
      let newLetter;
      if (type === 'vowel') {
          newLetter = generateRandomVowel();
      } else {
          newLetter = generateRandomConsonant();
      }
      setLetters(letters + newLetter);
    }

    const playGame = () => {
      setLetters('');
      setInputWord('');
      setMessage('');
      setTimeLeft(30); 
      if (countdownInterval) {
          clearInterval(countdownInterval);
          setCountdownInterval(null);
      }
    }

    const startCountdown = () => {
        setTimeLeft(30);
        const interval = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
        setCountdownInterval(interval);
    }

    const canFormWordFromLetters = (word: string, letters: string) => {
        let letterCounts: { [key: string]: number } = {};
        for (let letter of letters) {
            if (letter in letterCounts) {
                letterCounts[letter]++;
            } else {
                letterCounts[letter] = 1;
            }
        }
        for (let letter of word) {
            if (!(letter in letterCounts) || letterCounts[letter] == 0) {
                return false;
            } else {
                letterCounts[letter]--;
            }
        }
        return true;
    }

    const findLongestWord = (letters: string) => {
        let longestWord = '';
        for (let word of wordList) {
            if (word.length > longestWord.length && canFormWordFromLetters(word, letters)) {
                longestWord = word;
            }
        }
        return longestWord;
    }

    const checkWord = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
        const longestWord = findLongestWord(letters);
        if (inputWord.length > letters.length) {
            setMessage('Your word is too long.');
        } else if (!canFormWordFromLetters(inputWord, letters)) {
            setMessage('Your word contains letters not in the given set.');
        } else if (!wordList.includes(inputWord)) {
            setMessage(`Sorry, ${inputWord} is not a valid word.`);
        } else {
            if (inputWord.length === longestWord.length) {
                setMessage(`Well done! Your word was: ${inputWord}. That's the longest word possible!`);
            } else {
                setMessage(`Well done! Your word was: ${inputWord}. But you could have done better. The longest word possible is: ${longestWord}`);
            }
        }
    }

    return (
      <MainContainer>
        <Clock timeLeft={timeLeft} />
        <p>Time left: {timeLeft} seconds</p>
        <h1>Countdown Conundrum Game</h1>
        <LetterBoxes>
            {Array(9).fill('').map((_, i) => (
                <LetterBox key={i}>
                    {letters[i] || ''}
                </LetterBox>
            ))}
        </LetterBoxes>
        <button onClick={() => addLetter('vowel')}>Add Vowel</button>
        <button onClick={() => addLetter('consonant')}>Add Consonant</button>
        <input type="text" value={inputWord} onChange={e => setInputWord(e.target.value)} placeholder="Enter your word here" />
        <button onClick={checkWord} disabled={letters.length < 9}>Submit</button>
        <button onClick={playGame}>New Game</button>
        <p>{message}</p>
      </MainContainer>
    );
};

export default IndexPage;