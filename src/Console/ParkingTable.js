import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './Dashboard';

const ParkingTable = () => {
  const [vehicles, setVehicles] = useState([]);

  const [showVehicleNumber, setShowVehicleNumber] = useState(false);
  const [numberToShow, setNumberToShow] = useState(""); 
  const [parkId, setParkId] = useState(""); 

  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/owner/parkingLots');
      setVehicles(response.data.data); // Adjust the path based on your actual API response structure
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const handleGetVehicle = async (lotId) => {
    try {
      const response = await axios.get(`http://localhost:8080/owner/getVehicleByParkingLot/${lotId}`);
   
      if (response.status === 200) {
            setParkId(response.data.data.parkingLot.id);
            setShowVehicleNumber(true);
            setNumberToShow(response.data.data.type+"-"+response.data.data.vehicleNumber);
      } else {
       
      }
    } catch (error) {
      console.error('Error unparking vehicle:', error);
    }
  };
  


  const handleback=()=>{
    navigate("/");
  }

  const getEmptySpaceCount=(vehicles)=>{
   return vehicles.filter(obj => obj.isEmpty===true).length
  }

  return (

    <>
        <Dashboard></Dashboard>
  
        <ParkingLotContainer>
      
       <h2>Parking Spots Available: {getEmptySpaceCount(vehicles)}</h2>
        </ParkingLotContainer>
       

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Floor No</th>
            <th style={tableHeaderStyle}>Slot No</th>
            <th style={tableHeaderStyle}>Is Empty</th>
            <th style={tableHeaderStyle}>Actions</th>
            <th style={tableHeaderStyle}>Vehicle Parked</th>

          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td style={tableCellStyle}>{vehicle.id}</td>
              <td style={tableCellStyle}>{vehicle.floorNo}</td>
              <td style={tableCellStyle}>{vehicle.slotNo}</td>
              <td style={tableCellStyle}>{vehicle.isEmpty===true?"YES":"NO"}</td>
              <td style={tableCellStyle}>{
                vehicle.isEmpty===false?
                <Button1          
                onClick={()=>{
                    handleGetVehicle(vehicle.id);
                } 
                }
                >
                  Check Vehicle Parked
                </Button1>:""
                }
                </td>
              {parkId==vehicle.id&&
              <td style={tableCellStyle}>{
                numberToShow
                }
                </td>
              }  
         
            </tr>
          ))}
        </tbody>
      </table>
   
    </>
  );
};


export default ParkingTable;

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

const Button1 = styled.button`
background-color: #4caf50;
color: white;
padding: 10px 10px;
margin: 10px;
font-size: 16px;
cursor: pointer;
border: none;
border-radius: 15px;

&:hover {
  background-color: red;
}
`;

const ParkingLotContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;
