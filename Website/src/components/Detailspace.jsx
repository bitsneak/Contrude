import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';
import checkConditions from "../util/ConditionsChecker";

const Detailspace = ({thresholdSentences}) => {
  
  const {shipId, containerId} = useParams();

  const [container, setContainer] = useState(null);
  const [combinedSerialNumber, setCombinedSerialNumber] = useState("Loading...");
  const [notes, setNotes] = useState("");
  
  const [saved, setSaved] = useState(false);
  const [notSaved, setNotSaved] = useState(false); // If the save fails this is used

  const [tableData, setTableData] = useState([
    { environment: "Temperature", value: "-", unit: "°C", alert: "" },
    { environment: "Pressure", value: "-", unit: "Pa", alert: "" },
    { environment: "Humidity", value: "-", unit: "%", alert: "" },
    { environment: "Vibration", value: "-", unit: "m/s2", alert: "" },
    { environment: "Altitude", value: "-", unit: "m", alert: "" },
    { environment: "Latitude", value: "-", unit: "DD", alert: "" },
    { environment: "Longitude", value: "-", unit: "DD", alert: "" },
  ]);

  //ChatGPT editiert
  const updateTableData = (newValue, sensor) => {
    setTableData((prevData) =>
      prevData.map(item => {
        switch(sensor) {
          case "temperature":
            if (item.environment === "Temperature") {
              return { ...item, value: newValue };
            }
            break;
          case "pressure":
            if (item.environment === "Pressure") {
              return { ...item, value: newValue };
            }
            break;
          case "humidity":
            if (item.environment === "Humidity") {
              return { ...item, value: newValue };
            }
            break;
          case "vibration":
            if (item.environment === "Vibration") {
              return { ...item, value: newValue };
            }
            break;
          case "altitude":
            if (item.environment === "Altitude") {
              return { ...item, value: newValue };
            }
            break;
          case "latitude":
            if (item.environment === "Latitude") {
              return { ...item, value: newValue };
            }
            break;
          case "longitude":
            if (item.environment === "Longitude") {
              return { ...item, value: newValue };
            }
            break;
          default:
            return item;
        }
        return item;  // Return the item unchanged if no conditions match
      })
    );
  };


  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleBlur = async () => {
    if (!container) return;

    try {
      const updatedContainer = { ...container, notes };

      const updateResponse = await axiosInstance.put(`/rest/container/${containerId}`, updatedContainer);

      if (updateResponse.status === 204) {
        setSaved(true);
        setTimeout(() => { setSaved(false); }, 2000);
      } else {
        setNotSaved(true);
        setTimeout(() => { setNotSaved(false); }, 2000);
      }

    } catch (error) {
      console.error("Failed to save notes:", error.message);
    }
  };

  // Fetch Data when containerId or shipId changes
  useEffect(() => {
    const fetchContainerEnvironmentData = async () => {
      try {
        const environmentDataResponse = await axiosInstance.get(`/rest/sensor/${shipId}/${containerId}`);
        const temperatureValue = environmentDataResponse.data.sensor_data.temperature[0].value;
        const temperatureSensor = environmentDataResponse.data.sensor_data.temperature[0].sensor;
        updateTableData(temperatureValue, temperatureSensor);

        const pressureValue = environmentDataResponse.data.sensor_data.air_pressure[0].value;
        const pressureSensor = environmentDataResponse.data.sensor_data.air_pressure[0].sensor;
        updateTableData(pressureValue, pressureSensor);

        const humidityValue = environmentDataResponse.data.sensor_data.humidity[0].value;
        const humiditySensor = environmentDataResponse.data.sensor_data.humidity[0].sensor;
        updateTableData(humidityValue, humiditySensor);

        const vibrationValue = environmentDataResponse.data.sensor_data.vibration[0].value;
        const vibrationSensor = environmentDataResponse.data.sensor_data.vibration[0].sensor;
        updateTableData(vibrationValue, vibrationSensor);

        const altitudeValue = environmentDataResponse.data.sensor_data.altitude[0].value;
        const altitudeSensor = environmentDataResponse.data.sensor_data.altitude[0].sensor;
        updateTableData(altitudeValue, altitudeSensor);

        const latitudeValue = environmentDataResponse.data.sensor_data.latitude[0].value;
        const latitudeSensor = environmentDataResponse.data.sensor_data.latitude[0].sensor;
        updateTableData(latitudeValue, latitudeSensor);

        const longitudeValue = environmentDataResponse.data.sensor_data.longitude[0].value;
        const longitudeSensor = environmentDataResponse.data.sensor_data.longitude[0].sensor;
        updateTableData(longitudeValue, longitudeSensor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchContainerEnvironmentData();
  }, [containerId, shipId])

  useEffect(() => {
    const validValues = Array.isArray(thresholdSentences) ? thresholdSentences : []
    if(validValues.length > 0){
        const tableNew = checkConditions(tableData, thresholdSentences);
        setTableData(tableNew);

      }
  }, [thresholdSentences])

  // Fetch combined Container Serial Number when id changes
  useEffect(() => {
    const fetchSerialNumberOfContainer = async () => {
      try {
        const containerSerialNumberResponse = await axiosInstance.get(`/rest/container/${containerId}/serial-number`);
        const fetchedSerialNumber = containerSerialNumberResponse.data.serial_number;
        setCombinedSerialNumber(fetchedSerialNumber);
      } catch (error) {
        console.error("Failed to fetch Serial Numbers of containers:", error.message);
      }
    };
    fetchSerialNumberOfContainer();
  }, [containerId])
  
  // Fetch entire Container by ID when the id changes
  useEffect(() => {
    const fetchContainerData = async () => {
      try {      
        const containerResponse = await axiosInstance.get(`/rest/container/${containerId}`);
        const fetchedContainer = containerResponse.data.container[0];
        setContainer(fetchedContainer);
        setNotes(fetchedContainer.notes);

      } catch (error) {
        console.error('Failed to fetch container data:', error.message);
      }
    };

    fetchContainerData();
  }, [containerId]); 

  return (
    <div className="flex-grow flex justify-center items-center pt-5 pb-5 pl-24 pr-24 gap-10">
      <div className="h-5/6 w-3/4 p-10">
        <h1 className="text-2xl font-bold border-2 border-black p-1 mb-2">Container {combinedSerialNumber}</h1>
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 w-2/12">Environment Data</th>
              <th className="border border-black px-4 py-2 w-5/12">Value</th>
              <th className="border border-black px-4 py-2 w-1/12">Unit</th>
              <th className="border border-black px-4 py-2 w-4/12">Alert</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2 w-2/12">{row.environment}</td>
                <td className="border border-black px-4 py-2 w-5/12">{row.value}</td>
                <td className="border border-black px-4 py-2 w-1/12">{row.unit}</td>
                <td className="border border-black px-4 py-2 w-4/12">{row.alert}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <button className="border border-black px-2 mt-2"type="button" onClick={() => window.open(`/graphs/${shipId}.html?highlight=${combinedSerialNumber}`, '_blank')}>
          Show Position Diagram
        </button>

      </div>
      <div className="h-5/6 w-1/4 pt-10 pr-10">
        <textarea className="resize-none overflow-auto text-base w-full border-2 border-dashed border-gray-400 bg-gray-100 text-gray-700 h-[385px] p-2" 
        name="notes" 
        id="notes" 
        placeholder="Notes..."
        value={notes || ""}
        onChange={handleNotesChange}
        onBlur={handleBlur}
        ></textarea>
        {saved && (
          <div className="text-green-400 mt-1">Notes saved!</div>
        )}
        {notSaved && (
          <div className="text-red-400 mt-1">Failed to save notes!</div>
        )}
      </div>
    </div>
  );
};
export default Detailspace;
