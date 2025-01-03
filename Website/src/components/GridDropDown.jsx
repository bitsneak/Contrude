import React, { useState } from "react";

const GridDropDown = ({ gridSize, setGridSize }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState(false); // State to track hover

  const gridOptions = [
    { label: "1x1", rows: 1, cols: 1 },
    { label: "2x2", rows: 2, cols: 2 },
    { label: "2x4", rows: 2, cols: 4 },
    { label: "3x4", rows: 3, cols: 4 },
    { label: "4x4", rows: 4, cols: 4 },
  ];

  const handleSelectGrid = (rows, cols) => {
    setGridSize({ rows, cols }); // Update grid size
    setShowDropdown(false);
  };

  return (
    <div className="flex space-x-1">
      <div
        className={`w-14 h-9 border-2 border-black rounded-l-full flex justify-center items-center transition-colors duration-300 group-hover:bg-black`}
        onClick={() => setShowDropdown(!showDropdown)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={hovered ? "/src/icons/ZoomIconInverted.svg" : "/src/icons/ZoomIcon.svg"}
          alt="Zoom-Icon"
          className="size-8"
        />
      </div>

      {showDropdown && (
        <ul className="absolute bg-white border border-black rounded mt-9 z-5">
          {gridOptions.map((option) => (
            <li
              key={option.label}
              onClick={() => handleSelectGrid(option.rows, option.cols)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <div className={`w-16 h-9 border-2 border-black rounded-r-full flex justify-center items-center group-hover:bg-black group-hover:text-white`}>
        <p className="group-hover:text-white group-hover:bg-black">
          {gridSize.rows}x{gridSize.cols}
        </p>
      </div>
    </div>
  );
};

export default GridDropDown;
