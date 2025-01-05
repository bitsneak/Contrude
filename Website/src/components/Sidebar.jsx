import React, { useState, useEffect } from "react";
import UserProfile from "../dialogs/UserProfile";
import Settings from "../dialogs/Settings";
import axiosInstance from '../api/AxiosInstance';

const Sidebar = ({selectedShip}) => {
  const [isUserProfileDialogOpen, setUserProfileDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const [favoritesSerialNumbers, setFavoritesSerialNumbers] = useState([]);

  const handleCloseDialog = () => {
    setUserProfileDialogOpen(false); // Close the dialog
  };

  const handleOpenUserProfileDialog = () => {
    setUserProfileDialogOpen(true); // Open the dialog
  };

  const handleOpenSettingsDialog = () => {
    setSettingsDialogOpen(true); // Open the dialog
  };

  useEffect(() => {
    const fetchFavoritesById = async() => {
      try {
        const userId = localStorage.getItem("userId"); 
        const favoritesResponse = await axiosInstance.get(`/auth/user/${userId}/favorites`);

        const fetchedFavorites = favoritesResponse.data?.favorites || [];

        const getSerialNumbers = await Promise.all(fetchedFavorites.map(async (favorite) => {
          const containerId = favorite.container;
          const serialNumberResponse = await axiosInstance.get(`/rest/container/${containerId}/serial-number`);
          return serialNumberResponse.data.serial_number;

        }))
        setFavoritesSerialNumbers(getSerialNumbers);
        
      }catch(error){
        console.error("Error fetching container details:", error);
      }
    }
    fetchFavoritesById();
  }, [selectedShip])

  return (
    <div className="bg-white h-screen w-40 border-r-2 border-black flex flex-col justify-center">
    
      <div className="h-[10%] border-b-2 border-black border-dashed flex justify-center items-center">
        <img className="mb-2 size-28" src="/src/img/LogoIconic.svg" alt="Logo" />
      </div>
      
      <div className="h-[3%] border-b-2 pl-2 border-black border-dashed flex items-center">
        <img className="size-7 mr-2" src="/src/icons/FavouriteActive.svg" alt="FV" />
        <p className='font-bold'>Favorites</p>
      </div>
      
      <div className="h-[47%] border-b-2 border-black border-dashed flex flex-col justify-center items-center overflow-y-auto">
        <ul>
          {favoritesSerialNumbers.map((favoriteSN) => (<li key = {favoriteSN}>{favoriteSN}</li>))}
        </ul>
      </div>
      
      <div className="h-[3%] border-b-2 pl-2 border-black border-dashed flex items-center">
        <img className="size-7 mr-2" src="/src/icons/Alarm.svg" alt="AL" />
        <p className='font-bold'>Alarm</p>
      </div>
      
      <div className="h-[32%] border-b-2 border-black border-dashed flex flex-col justify-center items-center">
        <p>Text</p>
      </div>
      
      <div className="h-[5%] flex justify-between items-center pl-3 pr-3 space-x-3">
        <div 
          className='w-full h-full flex justify-center hover:bg-gray-300'
          onClick={handleOpenSettingsDialog}>
          
          <img className="size-12" src="/src/icons/Settings.svg" alt="SE" />
        </div>
        {isSettingsDialogOpen && (
          <Settings
            open={isSettingsDialogOpen}
            onClose={handleCloseDialog}
          />
        )}

        <div 
          className='w-full h-full flex justify-center hover:bg-gray-300'
          onClick={handleOpenUserProfileDialog}
        >
          <img className="size-12" src="/src/icons/User.svg" alt="US" />
        </div>
        
        {isUserProfileDialogOpen && (
          <UserProfile
            open={isUserProfileDialogOpen}
            onClose={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
