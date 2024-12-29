import React, { useState } from 'react';

const ShipButton = ({ ships, selectedShip, onShipChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (ship) => {
    onShipChange(ship); // Notify parent about the change
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button with the icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white w-14 h-9 border-2 border-black rounded-r-full flex justify-center items-center"
      >
        <img
          src="/src/icons/ShipIcon.svg"
          alt="Ship Icon"
          className="size-10"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 bg-white border border-black rounded-md w-40">
          {ships.map((ship) => (
            <li
              key={ship.id}
              onClick={() => handleSelect(ship)}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            >
              {ship.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShipButton;
