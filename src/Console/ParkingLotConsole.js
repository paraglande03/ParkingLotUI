import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RadioButton from '../RadioButton';
import Dashboard from './Dashboard';

const ParkingLotConsole = () => {
  const [vehicleNumber, setLicensePlate] = useState('');
  const [type, setType] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
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
  

  const handleAddEntry = () => {

    fetch('http://localhost:8080/owner/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicleNumber,type,ownerName,ownerNumber }),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };

  const handleMarkExit = () => {

    fetch(`http://localhost:8080/owner/exit/${vehicleNumber}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
    <Dashboard></Dashboard>
    <ParkingLotContainer>
      <h2>Parking Lot Console</h2>
      <label>
        Vehicle Plate:
        <input type="text" value={vehicleNumber} onChange={e => setLicensePlate(e.target.value)} />
      </label>
      <br />
      {selectedOption=="addEntry"&&<>
     
      <label>
        Vehicle Type:
        <input type="text" value={type} onChange={e => setType(e.target.value)} />
      </label>
      <br />
      <label>
        Owner Name:
        <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
      </label>
      <br />
      <label>
        Mobile Number:
        <input type="text" value={ownerNumber} onChange={e => setOwnerNumber(e.target.value)} />
      </label>
      </>
      }
      
      <br />
      
      <div>
      <RadioButton label="Add Entry" value="addEntry" checked={selectedOption === 'addEntry'} onChange={handleRadioChange} />
      <RadioButton label="Mark Exit" value="markExit" checked={selectedOption === 'markExit'} onChange={handleRadioChange} />
    </div>

     
      <br />
      <Button onClick={action === 'addEntry' ? handleAddEntry : handleMarkExit}>
        {action === 'addEntry' ? 'Add Entry' : 'Mark Exit'}
      </Button>
      <br />
      <Button onClick={handleback}>Back</Button>
      <div>
        <strong>Response:</strong> {message}
      </div>
    </ParkingLotContainer>
    </>
  );
};

export default ParkingLotConsole;


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