import styled from "styled-components";

const Input = styled.input`
    width: 250px;
    border-radius: 20px;
    padding: 10px 7px;
    border: 1px solid #eee;
    transition: .3s;
    background-color: #eee;
    color: #5f5f5f;
    &:focus{
        outline: none;
        width: 270px;

    }
`

export default Input;
