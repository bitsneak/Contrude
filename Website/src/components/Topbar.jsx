import React from "react";

const Topbar = ({ leftComponents = [], rightComponents = [] }) => {
  return (
    <div className='h-24 flex items-center justify-between pt-3 pb-3 pl-12 pr-12'>
      {/* Left */}
      <div className='flex items-center space-x-1'>
        {leftComponents.map((Component, index) => (
          <div key={index}>{Component}</div>
        ))}
      </div>

      {/* Right */}
      <div className='flex items-center space-x-1'>
        {rightComponents.map((Component, index) => (
          <div key={index}>{Component}</div>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
