import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

const ModalContent = styled.div`
	font-family: sans-serif;
	text-align: center;
	margin: auto;
	width: 50%;
	padding: 10px;
`

interface RulesModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onRequestClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Game Rules"
		>
			<ModalContent>
				<h2>Game Rules</h2>
				<h3>Word Game</h3>
				<p>
					The nine slots are for random letters; the player may select
					whether they want a vowel or a consonant for each slot.
					After the nine slots are filled, a 30 second countdown
					starts and the player have to try to come up with the
					longest existing word possible using the nine randomly
					generated letters.
				</p>
				<h3>Numbers Game</h3>
				<p>
					The player may select 6 numbers and whether each of them are
					large numbers (one of 25, 50, 75, 100) or small numbers (any
					number between 1-10). The system does a random calculation
					with the six numbers using addition, subtraction,
					multiplicaiton, and division, and presents the final result.
					The player is given a 30 second countdown in which they are
					supposed to work out the calculation to the final result.
				</p>
				<hr />
				<p>
					The two games are derived from the hilarious panel show 8
					Out of 10 Cats Does Countdown. Give it a watch. Good luck
					with the game.
				</p>
				<button onClick={onRequestClose}>Close</button>
			</ModalContent>
		</Modal>
	)
}

export default RulesModal
