import React, { useState } from "react";
import SearchBar from './SearchBar';

const Topbar = ({ gridSize, setGridSize }) => {  // Receive gridSize and setGridSize as props
  const [showDropdown, setShowDropdown] = useState(false);

  const gridOptions = [
    { label: "1x1", rows: 1, cols: 1 },
    { label: "2x2", rows: 2, cols: 2 },
    { label: "2x4", rows: 2, cols: 4 },
    { label: "3x4", rows: 3, cols: 4 },
    { label: "4x4", rows: 4, cols: 4 },
  ];

  const handleSelectGrid = (rows, cols) => {
    setGridSize({ rows, cols });  // Update grid size
    setShowDropdown(false);
  };

  return (
    <div className='h-24 flex items-center justify-between pt-3 pb-3 pl-12 pr-12'>
      {/* Left */}
      <div className='flex items-center space-x-1'>
        <SearchBar />
        <div className='bg-white w-14 h-9 border-2 border-black rounded-r-full flex justify-center items-center'>
          <img src="/src/icons/ShipIcon.svg" alt="Ship Icon" className='size-10'/>
        </div>
      </div>

      {/* Right */}
      <div className='flex space-x-1'>
        <div className='bg-white w-14 h-9 border-2 border-black rounded-l-full flex justify-center items-center' onClick={() => setShowDropdown(!showDropdown)}>
          <img src="/src/icons/ZoomIcon.svg" alt="Zoom-Icon" className='size-8'/>
        </div>

        {showDropdown && (
          <div className="absolute bg-white border border-black rounded mt-9 z-5">
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

        <div className='bg-white w-16 h-9 border-2 border-black rounded-r-full flex justify-center items-center'>
          <p>{gridSize.rows}x{gridSize.cols}</p> {/* Display the current grid size */}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
