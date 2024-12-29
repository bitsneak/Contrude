import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SearchBar from "../components/SearchBar";
import ShipButton from "../components/ShipButton";
import DetailControl from "../components/DetailControl";
import Detailspace from "../components/Detailspace";

const DetailPage = ({container}) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar />
      
      <div className='flex-grow flex flex-col'>
      <Topbar
      leftComponents={[<SearchBar key="searchbar" />, <ShipButton />]}
      rightComponents={[<DetailControl />]}
      />
      <Detailspace container={container}/>
      </div>
    </div>
  );
}

export default DetailPage