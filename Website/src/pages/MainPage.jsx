import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Workspace from '../components/Workspace';
import SearchBar from "../components/SearchBar";
import GridDropDown from "../components/GridDropDown";
import ShipButton from "../components/ShipButton";
import axiosInstance from "../api/AxiosInstance";

const MainPage = () => {
  const [gridSize, setGridSize] = useState({ rows: 1, cols: 1 });
  const [containerCount, setContainerCount] = useState(1);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const shipResponse = await axiosInstance.get(`PATH`); // PATH
        const fetchedShips = shipResponse.data || [];

        setShips(fetchedShips);

        if (fetchedShips.length > 0) {
          setSelectedShip(fetchedShips[0]);
        } else {
          setGridSize({ rows: 0, cols: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch ships:", error.message);
        setGridSize({ rows: 0, cols: 0 });
      }
    };

    fetchShips();

    // Cleanup for body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // Run only once on mount

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Topbar
          leftComponents={[
            <SearchBar key="searchbar" />,
            <ShipButton
              key="shipButton"
              ships={ships}
              selectedShip={selectedShip}
              onShipChange={setSelectedShip}
            />
          ]}
          rightComponents={[
            <GridDropDown key="gridDropdown" gridSize={gridSize} setGridSize={setGridSize} />
          ]}
        />
        <Workspace gridSize={gridSize} containerCount={containerCount} ship={selectedShip} />
      </div>
    </div>
  );
};

export default MainPage;
