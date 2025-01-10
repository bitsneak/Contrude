import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Workspace from '../components/Workspace';
import SearchBar from "../components/SearchBar";
import GridDropDown from "../components/GridDropDown";
import ShipSelect from "../components/ShipSelect";
import axiosInstance from "../api/AxiosInstance";
import ContainerChooser from "../dialogs/ContainerChooser";

const MainPage = () => {
  const [gridSize, setGridSize] = useState({ rows: 1, cols: 1 });
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState([]);
  const navigate = useNavigate();
  

  const handleSearchSubmit = (search) => {
    setSearchTerm(search);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSearchTerm("");
  }

  const handleSelect = (value) => {
    setDialogOpen(false);
    navigate(`/detail/${selectedShip.id}/${value}`);
  };

  // fetchIdOfSerialNumber
  useEffect(() => {
    const fetchIdOfSerialNumber = async () => {
      try{
        const containerSerialNumberResponse = await axiosInstance.get(`/rest/container/by-serial-number/${searchTerm}`);
        const fetchedId = containerSerialNumberResponse.data?.container || "";
        if(fetchedId){
          setDialogValues([fetchedId]);
          setDialogOpen(true);
        }
      }catch(error){
        console.error("Failed to fetch Id of container by serial number:", error.message);
      }
    }
    if(searchTerm){
      fetchIdOfSerialNumber();
    }
  }, [searchTerm])

  //get ships
  useEffect(() => {
    const fetchShips = async () => {
      try {
        const shipResponse = await axiosInstance.get(`/rest/ship`);
  
        const fetchedShips = shipResponse.data?.ships || []; 
  
        if (!Array.isArray(fetchedShips)) {
          console.error("Fetched data is not an array:", fetchedShips);
          setGridSize({ rows: 0, cols: 0 });
          return;
        }
  
        setShips(fetchedShips);
        if (fetchedShips.length > 0) {
          setSelectedShip(fetchedShips[0]);
          //console.log("Selected Ship:", selectedShip);
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
      <Sidebar selectedShip={selectedShip}/>
  
      <div className="flex-grow flex flex-col">
        <Topbar
          leftComponents={[
            <SearchBar key="searchbar" selectedShip={selectedShip} onSearchSubmit={handleSearchSubmit}/>,
            <ShipSelect
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

         {/* Conditionally render the dialog based on isDialogOpen */}
         <ContainerChooser
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSelect={handleSelect}
          values={dialogValues.map(value => value.id || value)}
        />
      </div>
    </div>
  );
};

export default MainPage;
