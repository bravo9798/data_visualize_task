import React from 'react';
import './App.css';
import FlavanoidsStats from './components/Flavanoids';
import GammaStats from './components/Gamma';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FlavanoidsStats/>  {/* Flavanoid table */}       
        <GammaStats/>  {/* Gamma Table */}
      </header>
    </div>
  );
}

export default App;
