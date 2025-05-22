import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

/**
 * Main Application Component for HydraTrack
 * HydraTrack is a web application designed to help users track and maintain 
 * their daily water intake, promoting better hydration habits and overall health.
 */
function App() {
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;