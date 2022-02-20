import styled from 'styled-components';

const Select = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }
`;

export default Select;
