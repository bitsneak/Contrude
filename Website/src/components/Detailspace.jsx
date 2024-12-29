import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';

const Detailspace = ({container}) => {
  const tableData = [
    { environment: "Temperature", value: "°C", level: "", problem: "" },
    { environment: "Pressure", value: "Pa", level: "Critical", problem: "High Pressure" },
    { environment: "Humidity", value: "%", level: "", problem: "" },
    { environment: "Vibration", value: "m/s2", level: "", problem: "" },
    { environment: "Altitude", value: "m", level: "", problem: "" },
    { environment: "Latitude", value: "DD", level: "", problem: "" },
    { environment: "Longitude", value: "DD", level: "", problem: "" },
  ];
  const { id } = useParams();

  return (
    <div className="flex-grow flex justify-center items-center pt-5 pb-5 pl-24 pr-24 gap-10">
      <div className="h-5/6 w-3/4 p-10">
        <h1 className="text-2xl font-bold border-2 border-black p-1 mb-2">Container {id}</h1>
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Environment Data</th>
              <th className="border border-black px-4 py-2">Value</th>
              <th className="border border-black px-4 py-2">Level</th>
              <th className="border border-black px-4 py-2">Problem</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{row.environment}</td>
                <td className="border border-black px-4 py-2">{row.value}</td>
                <td className="border border-black px-4 py-2">{row.level}</td>
                <td className="border border-black px-4 py-2">{row.problem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Notes block*/}
      <div className="h-5/6 w-1/4 pt-10 pr-10">
        <textarea className="resize-none overflow-auto text-base w-full border-2 border-dashed border-gray-400 bg-gray-100 h-[385px] p-2" name="notes" id="notes" placeholder="Notes..."></textarea>
      </div>
    </div>
  );
};

/*VALUES ('Air Pressure', 'Pa'),
('Humidity', '%'),
('Temperature', '°C'),
('Vibration', 'm/s²'),
('Altitude', 'm'),
('Latitude', 'DD'),
('Longitude', 'DD');*/

export default Detailspace;
