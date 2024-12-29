import React from 'react';

const ShipButton = ({ ships, selectedShip, onShipChange }) => {
  const handleSelect = (event) => {
    const selected = ships.find(ship => ship.name === event.target.value);
    onShipChange(selected); // Notify parent about the change
  };

  return (
    <div className="relative">
      <select
        className="bg-white border-2 border-black rounded-r-full p-2 w-40"
        value={selectedShip?.name || ""}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Select a ship
        </option>
        {ships.map((ship) => (
          <option key={ship.id} value={ship.name}>
            {ship.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShipButton;
