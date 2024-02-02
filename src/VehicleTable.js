import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './Console/Dashboard';

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/owner/vehicle/all');
      setVehicles(response.data.data); // Adjust the path based on your actual API response structure
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleUnparkClick = async (vehicleNumber) => {
    try {
      const response = await axios.delete(`http://localhost:8080/owner/exit/${vehicleNumber}`);
   
      if (response.status === 200) {

        setPopupMessage(`Vehicle ${vehicleNumber} unparked successfully.
        Total Time Parked: ${response.data.data.billing.parkedTime}
        Bill: Rs. ${JSON.stringify(response.data.data.billing.amount)}`);
        setPopupVisible(true);
      } else {
        setPopupMessage(`Error unparking vehicle ${vehicleNumber}. Response: ${JSON.stringify(response.data)}`);
        setPopupVisible(true);
      }
    } catch (error) {
      console.error('Error unparking vehicle:', error);
    }
  };

  const closePopup = () => {
    fetchData();
    setPopupVisible(false);
    setPopupMessage('');
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleback=()=>{
    navigate("/");
  }

  return (
    <>
    <Dashboard></Dashboard>
        <ParkingLotContainer>
      <input
        type="text"
        placeholder="Search by Vehicle Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
       <h2>Vehicle List</h2>
        </ParkingLotContainer>
       

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Vehicle Number</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>Floor No</th>
            <th style={tableHeaderStyle}>Slot No</th>
            <th style={tableHeaderStyle}>In Time</th>
            <th style={tableHeaderStyle}>Billing Amount</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle.vehicleNumber}>
              <td style={tableCellStyle}>{vehicle.vehicleNumber}</td>
              <td style={tableCellStyle}>{vehicle.type}</td>
              <td style={tableCellStyle}>{vehicle.parkingLot.floorNo}</td>
              <td style={tableCellStyle}>{vehicle.parkingLot.slotNo}</td>
              <td style={tableCellStyle}>{vehicle.billing.inTimeString}</td>
              <td style={tableCellStyle}>{vehicle.billing.amount}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleUnparkClick(vehicle.vehicleNumber)}>
                  Unpark Vehicle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupVisible && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <span>{popupMessage}</span>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

// Styles remain the same

export default VehicleTable;

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };
  
  const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ddd',
  };
  
  const tableCellStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };
  
  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };
  
  const popupContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

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

const ParkingLotContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;
