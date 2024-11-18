import React from 'react';
import meterRing from '../assets/Subtract.png'; // Adjust path as needed
import pointer from '../assets/cursor.png'; 
import '../styles/RiskAnalysisDisplay.css'; // CSS for styling

const RiskAnalysisDisplay = ({ data }) => {
  if (!data) {
    return <div>Loading risk analysis...</div>;
  }

  const { risk_score, risk_percentage, type } = data;

  // Calculate rotation angle for the pointer
  // 0% -> -90deg (Left - Green), 50% -> 0deg (Middle - Yellow), 100% -> 90deg (Right - Red)
  const rotationAngle = -90 + (risk_percentage / 100) * 180;

  return (
    <div className="risk-analysis-container">
      <h2>Risk Analysis</h2>
      <div className="gauge-wrapper">
        <img src={meterRing} alt="Meter Ring" className="meter-ring" />
        <div
          className="pointer"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
          }}
        >
          <img src={pointer} alt="Pointer" className="pointer-image" />
        </div>
      </div>

      <div className="score-details">
        <h3>Your Risk Score: {risk_score}</h3>
        <p>Risk Percentage: {risk_percentage}%</p>
        <p>Risk Type: {type}</p>
      </div>
    </div>
  );
};

export default RiskAnalysisDisplay;
