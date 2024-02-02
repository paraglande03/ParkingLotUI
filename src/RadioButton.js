import React from 'react';
import styled from 'styled-components';

const RadioButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButtonInput = styled.input`
  margin-right: 10px;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #3498db;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background-color: #3498db;
  }

  &:hover {
    border-color: #2980b9;
  }
`;

const RadioButtonLabel = styled.span`
  font-size: 16px;
`;

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <RadioButtonWrapper>
      <RadioButtonInput type="radio" value={value} checked={checked} onChange={onChange} />
      <RadioButtonLabel>{label}</RadioButtonLabel>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
