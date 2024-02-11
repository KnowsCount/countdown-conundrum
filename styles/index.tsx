import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    height: 100vh;
`;

export const LetterBoxes = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const LetterBox = styled.div`
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

export const ButtonWrapper = styled.div`
    margin: 5px;
`

export const Button = styled.button`    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
    border-radius: 6px;
    color: #3D3D3D;
    background: #fff;
    border: none;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    :focus {
        box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
        outline: 0;
    }
`