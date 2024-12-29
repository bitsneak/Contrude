import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import ContainerChooser from '../dialogs/ContainerChooser';

const Workspace = ({ gridSize, containerCount, ship }) => {
  const navigate = useNavigate();
  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  //needs to be changed
  const handleSelect = (value) => {
    setSelectedValue(value);
    setDialogOpen(false);
    navigate(`/detail/${value}`);
  };

  const renderGrid = () => {
    if (gridSize.rows === 0 || gridSize.cols === 0) {
      return null;
    }

    const divs = [];
    for (let row = 0; row < gridSize.rows; row++) {
      const rowDivs = [];
      for (let col = 0; col < gridSize.cols; col++) {
        const key = `${row}-${col}`; // Unique key for each div
        rowDivs.push(
          <div
            key={key}
            className="relative flex justify-center items-center pl-10 pr-10"
            onClick={() => setDialogOpen(true)}
            onMouseEnter={() => setHoveredDiv(key)}
            onMouseLeave={() => setHoveredDiv(null)}
          >
            <img className="size-52" src="/src/img/Container.svg" alt="Container" />
            <div className="w-16 h-5 absolute flex justify-center items-center">
              <p className={`${hoveredDiv === key ? 'font-bold' : 'font-sans'}`}>0-10</p> {/*0-10 is still hardcoded*/}
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
      <ContainerChooser
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSelect={handleSelect}
        values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} //temporary!!!
      />
    </div>
  );
};

export default Workspace;
