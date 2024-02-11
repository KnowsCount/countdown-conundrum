import styled from 'styled-components'

export const FooterContainer = styled.footer`
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

export const SocialLinks = styled.div`
	a {
		margin: 0 10px;
		color: black;
		text-decoration: none;

		&:hover {
			color: grey;
		}
	}
`

export const RulesButton = styled.button`
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
