import './App.css';
import Input from './Input';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OneWaySlab from './pages/OneWaySlab';
import TwoWaySlab from './pages/TwoWaySlab';
import { useState } from 'react';


function App() {
  const [length, setLength] = useState(0.0);
  const [breadth, setBreadth] = useState(0.0);
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Input length={length} breadth={breadth} setLength={setLength} setBreadth={setBreadth} />} />
      <Route exact path="/onewayslab" element={<OneWaySlab length={length} breadth={breadth} />} />
      <Route exact path="/twowayslab" element={<TwoWaySlab length={length} breadth={breadth} />} />
      </Routes>
    </Router>
    
  );
}

export default App;
