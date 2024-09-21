import React, { useState } from "react";
import { useWASM } from './hooks/useWASM';
import './App.css';

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState(null);
  const { callWASMFunction } = useWASM('wasm/build/main.wasm');

  const calculateBMI = () => {
    const bmiResult = callWASMFunction('calculateBMI', [
      parseFloat(height),
      parseFloat(weight),
      parseInt(age),
      gender
    ]);
    setResult(bmiResult);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Framework Logo" />
        </div>
        
      </header>

      <div className="bmi-box">
      <header className="header"><h1>BMI Calculator Demo</h1></header>
        <div className="input-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />
        </div>

        <div className="input-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>

        <div className="input-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>

        <div className="input-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button onClick={calculateBMI} className="calculate-button">Calculate BMI</button>

        {result && (
          <div className="result-box">
            <h2>Your BMI: {result.bmi.toFixed(2)}</h2>
            <p className="bmi-category">{result.category}</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          <a href="https://github.com/kushanshamika/wasmify-react" target="_blank" rel="noopener noreferrer">
            View the project on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
