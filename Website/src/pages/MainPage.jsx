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
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const shipResponse = await axiosInstance.get(`/rest/ship`, {
          headers: { 
            'authorization': `Bearer ${accessToken}`
          },
        });
  
        const fetchedShips = shipResponse.data?.ships || []; 
  
        if (!Array.isArray(fetchedShips)) {
          console.error("Fetched data is not an array:", fetchedShips);
          setGridSize({ rows: 0, cols: 0 });
          return;
        }
  
        setShips(fetchedShips);
        if (fetchedShips.length > 0) {
          setSelectedShip(fetchedShips[0]);
          console.log("Selected Ship:", selectedShip);
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
  }, []);
  


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
            />,
          ]}
          rightComponents={[
            <GridDropDown key="gridDropdown" gridSize={gridSize} setGridSize={setGridSize} />,
          ]}
        />
        
        {selectedShip && <Workspace gridSize={gridSize} ship={selectedShip} />}
      </div>
    </div>
  );
};

export default MainPage;
