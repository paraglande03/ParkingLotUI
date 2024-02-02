// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routers from './routers';

const App = () => {
  return (
    <div className='style'>
    <Router>
      <div>
        <Routes>
          {routers.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;
