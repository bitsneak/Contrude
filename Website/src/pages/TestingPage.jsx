import React, { useState } from "react";

const TestingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [gridSize, setGridSize] = useState(null);

  const gridOptions = [
    { label: "1x1", rows: 1, cols: 1 },
    { label: "2x2", rows: 2, cols: 2 },
    { label: "2x4", rows: 2, cols: 4 },
    { label: "3x4", rows: 3, cols: 4 },
    { label: "4x4", rows: 4, cols: 4 },
  ];

  const handleSelectGrid = (rows, cols) => {
    setGridSize({ rows, cols });
    setShowDropdown(false);
  };

  const getGridColsClass = (cols) => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Dropdown Button */}
      <div
        className="bg-white w-14 h-9 border-2 border-black rounded-l-full flex justify-center items-center cursor-pointer relative z-10"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src="/src/icons/ZoomIcon.svg" alt="Zoom Icon" className="w-8 h-8" />
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute bg-white border border-black rounded mt-1 w-20 z-5">
          {gridOptions.map((option) => (
            <div
              key={option.label}
              onClick={() => handleSelectGrid(option.rows, option.cols)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Display selected grid size */}
      {gridSize && (
        <div className="mt-4 text-center text-lg">
          Selected Grid: {gridSize.rows}x{gridSize.cols}
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid gap-2 mt-5">
        {gridSize &&
          Array.from({ length: gridSize.rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-2 ${getGridColsClass(gridSize.cols)}`}
            >
              {Array.from({ length: gridSize.cols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="p-5 border border-black text-center bg-gray-300"
                >
                  Div
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default TestingPage;
