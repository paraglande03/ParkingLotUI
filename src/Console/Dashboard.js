import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';




const Dashboard = () => {

    const navigate = useNavigate();

    const handleNavigateToParkingConsole = () => {
      navigate('/parking-console');
    };
  
    const handleNavigateToAddConsole = () => {
      navigate('/add-console');
    };

    const handleNavigateToReports = () => {
        navigate('/reports');
      };

      const handleNavigateToAllParkingLots = () => {
        navigate('/ParkingTable');
      };


  return (
    <DashboardContainer>
      
      <Button  onClick={handleNavigateToParkingConsole}>
        Parking Console
      </Button>
     
      <Button onClick={handleNavigateToAddConsole}>
        Add Parking Space
       </Button>
      
      <Button onClick={handleNavigateToReports}>
        Get All Vehicles
      </Button>
      
      <Button onClick={handleNavigateToAllParkingLots}>
        Get All Spaces Available
      </Button>
   
    </DashboardContainer>

  );
};



export default Dashboard;
const DashboardContainer = styled.div`
  max-width: 800px;
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