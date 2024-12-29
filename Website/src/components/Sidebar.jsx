import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-white h-screen w-40 border-r-2 border-black flex flex-col justify-center">
    
    <div className="h-[10%] border-b-2 border-black border-dashed flex justify-center items-center">
      <img className="mb-2 size-28" src="/src/img/LogoIconic.svg" alt="Logo" />
    </div>
    
    <div className="h-[3%] border-b-2 pl-2 border-black border-dashed flex items-center">
      <img className="size-7 mr-2" src="/src/icons/FavouriteActive.svg" alt="FV" />
      <p className='font-bold'>Favorites</p>
    </div>
    
    <div className="h-[47%] border-b-2 border-black border-dashed flex flex-col justify-center items-center">
      <p>Text</p>
    
    </div>
    
    <div className="h-[3%] border-b-2 pl-2 border-black border-dashed flex items-center">
      <img className="size-7 mr-2" src="/src/icons/Alarm.svg" alt="AL" />
      <p className='font-bold'>Alarm</p>
    
    </div>
    
    <div className="h-[32%] border-b-2 border-black border-dashed flex flex-col justify-center items-center">
      <p>Text</p>
    
    </div>
    
    <div className="h-[5%] flex justify-between items-center pl-3 pr-3 space-x-3">
      <div className='w-full h-full flex justify-center'>
        <img className="size-12" src="/src/icons/Settings.svg" alt="SE" />
      </div>
      <div className='w-full h-full flex justify-center'>
        <img className="size-12" src="/src/icons/User.svg" alt="US" />
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
