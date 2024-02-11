import React, { useState } from 'react'
import { RulesModal } from '@/components/common/RulesModal'
import { FooterContainer, SocialLinks, RulesButton } from './Footer.style'


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
