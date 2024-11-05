import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="bg-blue-700 text-white p-2 m-2">
        Open Sidebar
      </button>
      
      {isOpen && (
        <div className="bg-blue-400 h-screen w-1/4 fixed top-0 left-0 p-4">
          <button onClick={toggleSidebar} className="bg-blue-700 text-white p-2 mb-2">
            Close Sidebar
          </button>
          
          {/* Add any sidebar content here */}
          <div className='bg-white h-5/6'>
            <p>Text</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
