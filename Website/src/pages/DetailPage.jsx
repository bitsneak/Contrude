import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SearchBar from "../components/SearchBar";
import ShipSelect from "../components/ShipSelect";
import DetailControl from "../components/DetailControl";
import Detailspace from "../components/Detailspace";
import ThresholdViewer from "../dialogs/ThresholdViewer";

const DetailPage = () => {
  const [thresholdViewerOpen, setThresholdViewerOpen] = useState(true);
  const [thresholdSentences, setThresholdSentences] = useState([]);


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
      <Sidebar />,
      
      <div className='flex-grow flex flex-col'>
        <Topbar
          leftComponents={[<SearchBar key="searchbar" />]}
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
