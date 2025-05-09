import React from "react";

interface Props {
  energyLevel: number; // 0–100
}

const EnergyStatus: React.FC<Props> = ({ energyLevel }) => {
  const getStatus = () => {
    if (energyLevel >= 80) return "High Energy 💪";
    if (energyLevel >= 50) return "Moderate Energy 🙂";
    return "Low Energy 😴";
  };

  return (
    <div className="bg-[#f4f4f4] p-5 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.1)] max-w-[300px] mt-5">
      <div className="text-2xl font-medium mb-3">Your Energy Level</div>
      <p className="text-xl mb-2">{energyLevel}%</p>
      <p>{getStatus()}</p>
    </div>
  );
};

export default EnergyStatus;
