import React, { useState } from 'react'
import styled from 'styled-components'
import RulesModal from './RulesModal'

const FooterContainer = styled.footer`
	background-color: #f8f9fa;
	color: #212529;
	text-align: center;
	padding-top: 20px;
	padding-bottom: 20px;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
`

const SocialLinks = styled.div`
	a {
		margin: 0 10px;
		color: black;
		text-decoration: none;

		&:hover {
			color: grey;
		}
	}
`

const RulesButton = styled.button`
	margin-top: 10px;
	background-color: black;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;

	&:hover {
		background-color: grey;
	}
`

const Footer: React.FC = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	return (
		<FooterContainer>
			<SocialLinks>
				<a
					href="https://github.com/knowscount"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
			</SocialLinks>
			<RulesButton onClick={openModal}>Rules</RulesButton>
			<RulesModal isOpen={modalIsOpen} onRequestClose={closeModal} />
		</FooterContainer>
	)
}

export default Footer
