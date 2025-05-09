import React from "react";

interface Props {
  energyLevel: number; // 0–100
  setEnergyLevel: React.Dispatch<React.SetStateAction<number>>; // 0–100
}

const EnergyInput: React.FC<Props> = ({ energyLevel, setEnergyLevel }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnergyLevel(Number(event.target.value));
  };

  return (
    <div className="text-center mb-4">
      <label htmlFor="energy-slider" className="text-2xl">
        Set Your Energy Level
      </label>
      <input
        type="range"
        id="energy-slider"
        min="0"
        max="100"
        value={energyLevel}
        onChange={handleChange}
        className="w-full my-4"
      />
      <p className="mt-2 text-center">Current Energy Level: {energyLevel}%</p>
    </div>
  );
};

export default EnergyInput;
