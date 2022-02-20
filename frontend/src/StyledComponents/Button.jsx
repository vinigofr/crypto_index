import styled from 'styled-components';

const Button = styled.button`
  transition: background-color 0.2s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  background-color: gray;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: #f2671d;
    color: black;
  }
`;

export default Button;
