import styled from 'styled-components';
import Input from './Input';

// Source:
// https://stackoverflow.com/questions/56352294/hiding-input-spinner-using-styled-component
const InputNumber = styled(Input)`
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  width: 100px;
`;

export default InputNumber;
