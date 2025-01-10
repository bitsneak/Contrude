import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ selectedShip, onSearchSubmit}) => {
  const [inputValue, setInputValue] = useState("");
  const handleEventEnter = (event) => {
    if(event.key === "Enter"){
      onSearchSubmit(inputValue);
    }
  }
  return (
    <div className="flex items-center border-2 h-9 border-black rounded-l-full px-3 bg-white">
      <div className="flex items-center">
        <FaSearch className="mr-2" />
        <input 
        className="border-none outline-none flex-shrink-0 w-[108px]" 
        placeholder="Serial Number" 
        maxLength="11"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleEventEnter}
        />  
      </div>

      <div className="flex items-center flex-grow ml-2 truncate">
        <p className="flex-shrink-0">of container on ship </p>
        <p className="font-bold ml-1 truncate">{selectedShip?.name || "-"}</p>
      </div>
    </div>
  );
};

export default SearchBar;
