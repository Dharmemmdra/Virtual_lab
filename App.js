// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Circuit from './Circuit.js';
import AM_demodulation from './AM_demodulation';
import FM from './FM';
import PM from './PM';
import YourComponent from './YourComponent';


function App() {
  return (
    <>
  <Router>
    <div>
      <Sidebar />
      
        <Routes>
          <Route path="/AM_demodulation" element={<Circuit/>} />
          <Route path="/FM" element={<FM />} />

		  <Route path="/AM_demodulation" element={<AM_demodulation/>} />
        </Routes>
     
    </div>
	</Router>
  {/* <Circuit/> */}
  {/* <AM_demodulation/> */}
  {/* <FM/> */}
  {/* <PM/> */}
  {/* <div className="App1">
    <YourComponent />
  </div> */}
  </>
  );
}

export default App;



