import React, { useState, useEffect } from 'react';
import ContainerDistributer from '../util/ContainerDistributer';

const TestingPage = () => {
  const [containerDistribution, setContainerDistribution] = useState([]);

  useEffect(() => {
    // Container IDs (for example, [1, 2, 3, 4])
    const containerIds = [1, 2, 3, 4,];

    // Using ContainerDistributer to get the 2x2 grid distribution
    const distribution = ContainerDistributer(2, 2, containerIds.length);

    setContainerDistribution(distribution);
  }, []);

  const renderGrid = () => {
    if (containerDistribution.length === 0) {
      return <div>Loading...</div>; // Show loading until distribution is ready
    }

    const divs = [];
    for (let row = 0; row < containerDistribution.length; row++) {
      const rowDivs = [];
      for (let col = 0; col < containerDistribution[row].length; col++) {
        const containerId = containerDistribution[row][col];
        rowDivs.push(
          <div
            key={`${row}-${col}`}
            className="relative flex justify-center items-center p-10 border border-gray-300"
          >
            <div className="w-16 h-5 flex justify-center items-center">
              <p>{containerId || "Empty"}</p> {/* Display container ID or "Empty" */}
            </div>
          </div>
        );
      }
      divs.push(
        <div key={row} className="flex space-x-2">
          {rowDivs}
        </div>
      );
    }
    return divs;
  };

  return (
    <div className='flex-grow flex flex-col justify-center items-center p-5'>
      <h2>2x2 Grid with Containers</h2>
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
};

export default TestingPage;
