import React from 'react';
import { RiArrowGoBackFill } from "react-icons/ri";
import { GoAlert } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { TiPlus } from "react-icons/ti";

const DetailControl = ({ onGoAlertClick }) => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-full'>
      <div
        className="bg-white w-14 h-9 border-t-2 border-r-2 border-l-2 border-b-2 border-black rounded-l-full flex justify-center items-center"
        onClick={onGoAlertClick} // Trigger dialog on click
      >
        <GoAlert />
      </div>
      <div className="bg-white w-14 h-9 mr-1 border-t-2 border-r-2 border-b-2 border-black flex justify-center items-center">
        <TiPlus />
      </div>
      <div
        className='bg-white w-14 h-9 border-2 border-black flex justify-center items-center'
        onClick={() => navigate('/main')}
      >
        <RiArrowGoBackFill />
      </div>
      <div className="bg-white w-14 h-9 border-t-2 border-r-2 border-b-2 border-black rounded-r-full flex justify-center items-center">
        <img className="size-6 mr-2" src="/src/icons/FavouritePassive.svg" alt="FV" />
      </div>
    </div>
  );
};

export default DetailControl;
