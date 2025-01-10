import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ContainerChooser from '../dialogs/ContainerChooser';
import axiosInstance from '../api/AxiosInstance';
import ContainerDistributer from '../util/ContainerDistributer';

const Workspace = ({ gridSize, ship }) => {
  const navigate = useNavigate();
  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [containerDistribution, setContainerDistribution] = useState([]);
  const [containerIds, setContainerIds] = useState([]);
  const [containerMap, setContainerMap] = useState(new Map());
  const [dialogValues, setDialogValues] = useState([]); // State to store values for the dialog

  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenDialog = (row, col) => {
    const key = `${row}-${col}`;
    const values = containerMap.get(key) || []; // Get values from the map or an empty array if none exist
    setDialogValues(values); // Update the dialog values
    setDialogOpen(true); // Open the dialog
  };

  useEffect(() => {
    const fetchContainerIdsOfShip = async () => {
      try {
        const shipId = ship.id;
        const containerIdsResponse = await axiosInstance.get(`/rest/ship/${shipId}/containers`);

        const fetchedIds = containerIdsResponse.data?.containers || [];
        if (!Array.isArray(fetchedIds)) {
          console.error("Fetched data is not an array:", fetchedIds);
          return;
        }
        setContainerIds(fetchedIds);

        if (fetchedIds.length > 0) {
          setContainerDistribution(ContainerDistributer(gridSize.rows, gridSize.cols, fetchedIds.length));
        }
      } catch (error) {
        console.error("Failed to fetch containers of ship:", error.message);
      }
    };

    fetchContainerIdsOfShip();

    // Cleanup for body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ship, gridSize]);

  useEffect(() => {
    if (containerDistribution.length > 0) {
      const newMap = new Map();
      let containerIdCounter = 0;

      for (let row = 0; row < containerDistribution.length; row++) {
        for (let col = 0; col < containerDistribution[row].length; col++) {
          const containerCount = containerDistribution[row][col] > 0 ? containerDistribution[row][col] : 0;
          const idsPerKey = [];

          for (let i = 0; i < containerCount; i++) {
            idsPerKey.push(containerIds[i + containerIdCounter]);
          }

          containerIdCounter += containerCount;
          newMap.set(`${row}-${col}`, idsPerKey);
        }
      }

      setContainerMap(newMap);
    }
  }, [containerDistribution, containerIds]);

  const handleSelect = (value) => {
    setSelectedId(value);
    setDialogOpen(false);
    navigate(`/detail/${ship.id}/${value}`);
  };

  const renderGrid = () => {
    if (containerDistribution.length === 0) {
      return <div>Loading...</div>;
    }

    const divs = [];
    for (let row = 0; row < containerDistribution.length; row++) {
      const rowDivs = [];
      for (let col = 0; col < containerDistribution[row].length; col++) {
        const containerCount = containerDistribution[row][col] > 0 ? containerDistribution[row][col] : 0;

        rowDivs.push(
          <div
            key={`${row}-${col}`}
            className="relative flex justify-center items-center pl-10 pr-10"
            onClick={() => handleOpenDialog(row, col)} // Pass row and col to the handler
            onMouseEnter={() => setHoveredDiv(`${row}-${col}`)}
            onMouseLeave={() => setHoveredDiv(null)}
          >
            <img className="size-52" src="/src/img/Container.svg" alt="Container" />
            <div className="w-16 h-5 absolute flex justify-center items-center">
              <p className={`${hoveredDiv === `${row}-${col}` ? 'font-bold' : 'font-sans'}`}>
                {containerCount > 0 ? containerCount : "Empty"}
              </p>
            </div>
          </div>
        );
      }

      divs.push(
        <div key={row} className="flex space-x-2">
          {rowDivs}
        </div>
      );
    }
    return divs;
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center p-5">
      {renderGrid()}
      <ContainerChooser
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSelect={handleSelect}
        values={dialogValues.map(value => value.id || value)} // Map objects to their `id` property or use the value directly
      />
    </div>
  );
};

export default Workspace;
