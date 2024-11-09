import React from 'react';
import SearchBar from './SearchBar';

const Topbar = () => {
  return (
    <div className='h-24 bg-blue-200 flex items-center justify-between pt-3 pb-3 pl-12 pr-12'>
      
      {/*Left*/}
      <div className='flex items-center space-x-1'>
        <SearchBar />
        <div className='bg-white w-14 h-9 border-2 border-black rounded-r-full flex justify-center items-center'>
          <img src="/src/icons/ShipIcon.svg" alt="Ship Icon" className='size-10'/>
        </div>
      </div>

      {/*Right*/}
      <div className='flex space-x-1'>
        <div className='bg-white w-14 h-9 border-2 border-black rounded-l-full flex justify-center items-center'>
          <img src="/src/icons/ZoomIcon.svg" alt="Ship-Icon" className='size-8'/>
        </div>
          
        <div className='bg-white w-16 h-9 border-2 border-black rounded-r-full flex justify-center items-center'>
          <p>2  x  2</p>
        </div>
      </div>

    </div>
  )
}

export default Topbar;
