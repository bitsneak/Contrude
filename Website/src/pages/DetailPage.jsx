import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SearchBar from "../components/SearchBar";
import ShipSelect from "../components/ShipSelect";
import DetailControl from "../components/DetailControl";
import Detailspace from "../components/Detailspace";
import ThresholdViewer from "../dialogs/ThresholdViewer";
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const [thresholdViewerOpen, setThresholdViewerOpen] = useState(true);
  const [thresholdSentences, setThresholdSentences] = useState([]);
  const {shipId, containerId} = useParams();
  const pageType = "detail";

  const handleThresholdSentencesUpdate = (sentences) => {
    setThresholdSentences(sentences);
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleThresholdViewerToggle = () => {
    setThresholdViewerOpen(!thresholdViewerOpen);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar selectedShip={shipId} page={pageType}/>
      
      <div className='flex-grow flex flex-col'>
        <Topbar
          leftComponents={[]}
          rightComponents={[
            <DetailControl
              onGoAlertClick={handleThresholdViewerToggle}
            />
          ]}
        />
        <Detailspace thresholdSentences={thresholdSentences}/>
      </div>

      {thresholdViewerOpen && (
        <ThresholdViewer
          open={thresholdViewerOpen}
          onClose={handleThresholdViewerToggle}
          onSentencesUpdate={handleThresholdSentencesUpdate}
        />
      )}
    </div>
  );
};

export default DetailPage;
