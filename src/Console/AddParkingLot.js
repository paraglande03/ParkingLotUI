import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RadioButton from '../RadioButton';
import Dashboard from './Dashboard';

const AddParkingLot = () => {
  const [floorNumber, setFloorNumber] = useState('');
  const [slotNumber, setSlotNumber] = useState('');
  const [action, setAction] = useState('addEntry');
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('addEntry');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setAction(event.target.value)
  };

  const navigate = useNavigate();


  const handleback=()=>{
    navigate("/");
  }
  

  const handleAddSlot= () => {

    fetch('http://localhost:8080/owner/parkinglot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ floorNo:floorNumber,
      slotNo:slotNumber,
      isEmpty: true}),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };


  return (<>
 
    <Dashboard></Dashboard>
    <ParkingLotContainer>
      <h2>Add Parking Spaces</h2>
      <label>
        Floor Number : 
        <input type="text" value={floorNumber} onChange={e => setFloorNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Slot Number :  
        <input type="text" value={slotNumber} onChange={e => setSlotNumber(e.target.value)} />
      </label>
      <br />

<Button onClick={handleAddSlot}>Add Slot</Button>

      <Button onClick={handleback}>Back</Button>
      <div>
        <strong>Response:</strong> {message}
      </div>
    </ParkingLotContainer>
    </>
  );
};

export default AddParkingLot;


const ParkingLotContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

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