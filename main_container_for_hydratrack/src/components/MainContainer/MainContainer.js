import React, { useState } from 'react';
import './MainContainer.css';

/**
 * Main Container component for HydraTrack
 * Serves as the primary wrapper for the application's components,
 * providing structure and state management for hydration tracking.
 */
const MainContainer = () => {
  // State for tracking daily water intake in ml
  const [waterIntake, setWaterIntake] = useState(0);
  // Daily goal in ml (default 2000ml - 2 liters)
  const [dailyGoal, setDailyGoal] = useState(2000);
  // History of water intake entries
  const [intakeHistory, setIntakeHistory] = useState([]);

  /**
   * Add water intake to the daily total
   * @param {number} amount - Amount of water in ml
   */
  const addWaterIntake = (amount) => {
    const newTotal = waterIntake + amount;
    setWaterIntake(newTotal);
    
    // Add to history
    const newEntry = {
      id: Date.now(),
      amount: amount,
      timestamp: new Date().toISOString(),
      total: newTotal
    };
    setIntakeHistory([...intakeHistory, newEntry]);
  };

  /**
   * Reset daily water intake counter
   */
  const resetWaterIntake = () => {
    setWaterIntake(0);
    // Keep history but mark as reset
    const resetEntry = {
      id: Date.now(),
      amount: -waterIntake,
      timestamp: new Date().toISOString(),
      total: 0,
      reset: true
    };
    setIntakeHistory([...intakeHistory, resetEntry]);
  };

  /**
   * Update the daily goal
   * @param {number} goal - New goal in ml
   */
  const updateDailyGoal = (goal) => {
    setDailyGoal(goal);
  };

  // Calculate progress percentage
  const progressPercentage = Math.min((waterIntake / dailyGoal) * 100, 100);

  return (
    <div className="hydra-container">
      <header className="hydra-header">
        <div className="hydra-logo">
          <span className="logo-symbol">💧</span> HydraTrack
        </div>
        <div className="hydra-header-controls">
          <button className="hydra-btn">Settings</button>
        </div>
      </header>

      <div className="hydra-main-content">
        <div className="hydra-dashboard">
          <div className="hydra-progress-section">
            <h2>Today's Hydration</h2>
            
            <div className="hydra-progress-container">
              <div className="hydra-progress-bar">
                <div 
                  className="hydra-progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="hydra-progress-labels">
                <span>{waterIntake} ml</span>
                <span>Goal: {dailyGoal} ml</span>
              </div>
            </div>
            
            {progressPercentage >= 100 && (
              <div className="hydra-goal-reached">🎉 Daily goal reached!</div>
            )}
          </div>
          
          <div className="hydra-quick-add-section">
            <h3>Quick Add</h3>
            <div className="hydra-quick-add-buttons">
              <button 
                className="hydra-btn hydra-btn-add" 
                onClick={() => addWaterIntake(250)}
              >
                + 250ml
              </button>
              <button 
                className="hydra-btn hydra-btn-add" 
                onClick={() => addWaterIntake(500)}
              >
                + 500ml
              </button>
              <button 
                className="hydra-btn hydra-btn-custom"
                onClick={() => addWaterIntake(330)}
              >
                + 330ml
              </button>
            </div>
            <button 
              className="hydra-btn hydra-btn-reset" 
              onClick={resetWaterIntake}
            >
              Reset Today
            </button>
          </div>
          
          {intakeHistory.length > 0 && (
            <div className="hydra-history-section">
              <h3>Today's Entries</h3>
              <div className="hydra-history-list">
                {intakeHistory.map(entry => (
                  <div key={entry.id} className="hydra-history-item">
                    <div className="hydra-history-time">
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="hydra-history-amount">
                      {entry.reset 
                        ? 'Reset' 
                        : `${entry.amount > 0 ? '+' : ''}${entry.amount} ml`}
                    </div>
                    <div className="hydra-history-total">
                      Total: {entry.total} ml
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="hydra-footer">
        <div className="hydra-tip">
          💡 Tip: Consistent hydration throughout the day is better than drinking large amounts at once.
        </div>
      </footer>
    </div>
  );
};

export default MainContainer;
