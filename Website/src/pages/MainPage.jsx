import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Workspace from '../components/Workspace';
import SearchBar from "../components/SearchBar";
import GridDropDown from "../components/GridDropDown";
import ShipButton from "../components/ShipButton";

const MainPage = () => {
  const [gridSize, setGridSize] = useState({ rows: 1, cols: 1 });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on the body
    return () => {
      document.body.style.overflow = ''; // Reset on cleanup
    };
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar />
      
      <div className='flex-grow flex flex-col'>
      <Topbar
      leftComponents={[<SearchBar key="searchbar" />, <ShipButton />]}
      rightComponents={[<GridDropDown key="gridDropdown" gridSize={gridSize} setGridSize={setGridSize} />]}
    />
        <Workspace gridSize={gridSize} /> {/* Pass gridSize as prop */}
      </div>
    </div>
  );
};

export default MainPage;
