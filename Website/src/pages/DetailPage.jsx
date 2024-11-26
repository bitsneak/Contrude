import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Workspace from '../components/Workspace';
import SearchBar from "../components/SearchBar";
import ShipButton from "../components/ShipButton";
import DetailControl from "../components/DetailControl";
import Detailspace from "../components/Detailspace";

const DetailPage = () => {

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
      <Detailspace />
      </div>
    </div>
  );
}

export default DetailPage