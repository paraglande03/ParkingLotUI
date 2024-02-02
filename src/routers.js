import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Console/Dashboard';
import ParkingConsole from './Console/ParkingLotConsole';
import AddParkingLot from './Console/AddParkingLot';
import VehicleTable from './VehicleTable';
import ParkingTable from './Console/ParkingTable';
// import AddConsole from './AddConsole';

const routers = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/parking-console',
    component: ParkingConsole,
  },
  {
    path: '/add-console',
    component: AddParkingLot,
  },

  {
    path: '/reports',
    component: VehicleTable,
  },

  {
    path: '/ParkingTable',
    component: ParkingTable,
  },
];

export default routers;
