import React from 'react'
import {FaSearch} from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className='flex'>
        <div className='w-72 pl-3 h-9 bg-white flex justify-start items-center border-2 border-black rounded-l-full'>
            <FaSearch className='mr-2'/>
            <input className='border-none outline-none'  placeholder='Type to search...' />
        </div>
        
    </div>
  )
}

export default SearchBar;