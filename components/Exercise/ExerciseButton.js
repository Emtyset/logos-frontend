import Image from "next/image";
import styled from "styled-components"

const Button = styled.button`
    border: none;
    display: block;
    margin: auto;
    background-color: transparent;
    width: 100px;
    height: 100px;
    background-color: #1FAB89;;
    border-radius: 50%;
    font-size: 50px;
`

export default function ExerciseButton({text = "", onClick = () => {}}) {
    return <>
        <Button onClick={onClick}>
            {text}
        </Button>
    </>
}