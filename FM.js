import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Circuit.css';

const FM = () => {
  const [messageFrequency, setMessageFrequency] = useState(1);
  const [carrierFrequency, setCarrierFrequency] = useState(1);
  const [result, setResult] = useState(null);
   const [sinWaveData0, setSinWaveData0] = useState(null);
  const [sinWaveDataFM, setSinWaveDataFM] = useState(null);
    const [demodulation_fm, setdemodulation_fm] = useState(null);

  const handleMessageFrequencyChange = (event) => {
    setMessageFrequency(Number(event.target.value));
  };

  const handleCarrierFrequencyChange = (event) => {
    setCarrierFrequency(Number(event.target.value));
  };


const handleClick0 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_0?frequency=${messageFrequency}`
      );
      setSinWaveData0(response.data.sinWaveData0);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_fm?frequency=${messageFrequency}&amplitude=${carrierFrequency}`
      );
      setSinWaveDataFM(response.data.sinWaveDataFM);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  const handleClick1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/demodulation_fm?frequency=${messageFrequency}&amplitude=${carrierFrequency}`
      );
      setdemodulation_fm(response.data.demodulation_fm);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  return (
            <>
        <div>
        <div className="VariableDC">
        <div className="node2">
            <div className="text2">+5V</div>
            </div>
            <div className="node3">
            <div className="text2">DC</div>
            </div>
            <div className="node4">
            <div className="text2">GND</div>
            </div>
            <div className="text1">
                Variable DC
            </div>
        </div>
        <div className="Multiplier">
        <div className="node4">
            <div className="text2">kXY</div>
            </div>
            <div className="node5">
            <div className="text2">X</div>
            </div>
            <div className="node3 node3-3">
            <div className="text2">TTL</div>
            </div>
            	            
            <div className="node6">
            <button className="btn btn-1" onClick={handleClick}>Generate</button>
            <div className="text2">Y</div>
            </div>


           <div className="text1">
                Multiplier
            </div>
          </div>
          <div className="oscillator">
            <div className="text1">
            AUDIO OSCILLATOR

            </div>
			
            {/* <div className="wire">Goku</div> */}
            {/* <div className="roller1"><div className="roller2"></div></div> */}
            <div className="node1">
                <div className="text2">SYNC</div>
            </div>
            <div className="node2">
            <div className="text2">cos(wt)</div>
            </div>
			<br/>
			<div className="cont" align="center">
              <label>
			  <br/><br/>
        Message Frequency:<br/>
        <input
          type="range"
          min="1"
          max="10000"
		  style={{ width: '140px' }}
          value={messageFrequency}
          onChange={handleMessageFrequencyChange}
        />
        {messageFrequency}
        <br />
      </label>
	          <button className="btn" onClick={handleClick0}>Generate</button>
            </div>
            {/* <div className="node3">
            <div className="text2">TTL</div>
            </div> */}
            <div className="node4">
            <div className="text2">sin(wt)</div>
            </div>

            <div className="node6">
            <div className="text2">Y</div>
            </div>
            
        </div>
          <div className="FMsignal">
			      <label>
              <h4>Message Signal (Audio Oscillator O/P)</h4>
                <button className="btn" onClick={handleClick0}>Generate</button>
                  {sinWaveData0 && (
                  <div>
                    <h3></h3>
                      <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: sinWaveData0.x,
                    y: sinWaveData0.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
<label>
          <h4>FM Signal</h4>
          <button className="btn" onClick={handleClick}>Generate</button>
          {sinWaveDataFM && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: sinWaveDataFM.x,
                    y: sinWaveDataFM.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
		  <label>
          <h4>Demodulation</h4>
          <button className="btn" onClick={handleClick1}>Generate</button>
          {demodulation_fm && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: demodulation_fm.x,
                    y: demodulation_fm.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
        </div>
</div>
</>
  );
};

export default FM;
