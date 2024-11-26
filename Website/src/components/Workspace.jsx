import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Workspace = ({ gridSize }) => {
  const navigate = useNavigate();
  const [hoveredDiv, setHoveredDiv] = useState(null); 
  
  const renderGrid = () => {
    if (!gridSize) return null;
  
    const divs = [];
    for (let row = 0; row < gridSize.rows; row++) {
      const rowDivs = [];
      for (let col = 0; col < gridSize.cols; col++) {
        const key = `${row}-${col}`; // Unique key for each div
        rowDivs.push(
          <div
            key={key}
            className="relative flex justify-center items-center pl-10 pr-10"
            onClick={() => navigate('/detail')}
            onMouseEnter={() => setHoveredDiv(key)}
            onMouseLeave={() => setHoveredDiv(null)}
          >
            <img className="size-52" src="/src/img/Container.svg" alt="Container" />
            <div className="w-16 h-5 absolute flex justify-center items-center">
              <p className={`${hoveredDiv === key ? 'font-bold' : 'font-sans'}`}>0-10</p>
            </div>
          </div>
        );
      }
      divs.push(
        <div key={row} className="flex space-x-2"> {/* space-x-2 for horizontal spacing */}
          {rowDivs}
        </div>
      );
    }
    return divs;
  };

  return (
    <div className='flex-grow flex flex-col justify-center items-center p-5'>
      {renderGrid()}
    </div>
  )
}

export default Workspace;
