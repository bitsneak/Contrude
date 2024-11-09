import React from 'react'

const Sidebar = () => {
  return (
    <div className="bg-white h-screen w-1/7 p-4 border-r-2 border-black">
      {/* The image */}
      <img 
        className="mb-2 size-40" 
        src="/src/img/LogoSimple.png" 
        alt="Logo" 
      />
      
      {/* Sidebar content */}
      <div className="bg-white h-5/6">
        <p>Text</p>
      </div>
    </div>
  );
};

export default Sidebar;
