import styled from 'styled-components'

export const ClockContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	border: 1px solid black;
	border-radius: 50%;
`

export const Hand = styled.div`
	position: absolute;
	bottom: 50%;
	left: 50%;
	width: 2px;
	height: 50%;
	background: black;
	transform-origin: center bottom;
	transition: all 1s linear;
`
