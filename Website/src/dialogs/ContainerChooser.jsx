import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";

const ContainerChooser = ({ open, onClose, values = [], onSelect }) => {
  const [serialNumbers, setSerialNumbers] = useState([]);
  const validValues = Array.isArray(values) ? values : []

  useEffect(() => {
    if(values != null){
      const fetchSerialNumbersOfContainers = async () => {
        try {
          const fetchedSerialNumbers = [];
          for (let i = 0; i < validValues.length; i++) {
            const accessToken = localStorage.getItem("accessToken");
            const id = validValues[i];
            const containerSerialNumberResponse = await axiosInstance.get(`/rest/container/${id}/serial-number`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
  
            const fetchedSerialNumber = containerSerialNumberResponse.data;
            fetchedSerialNumbers.push(fetchedSerialNumber);
          }
          setSerialNumbers(fetchedSerialNumbers);
        } catch (error) {
          console.error("Failed to fetch Serial Numbers of containers:", error.message);
        }
      };
  
      fetchSerialNumbersOfContainers();

    }
    
  }, [validValues]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Choose a Container</h2>
        <ul className="space-y-2">
          {validValues.map((id, index) => (
            <li key={id} className="flex justify-between items-center">
              <button
                className="text-black font-medium py-1 px-3 rounded hover:bg-gray-200 hover:font-bold flex-1 text-left"
                onClick={() => onSelect(id)}
              >
                <span className="text-black">{serialNumbers[index]?.serial_number || "Loading..."}</span>
              </button>
              
            </li>
          ))}
        </ul>

        <button
          className="mt-4 w-full border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-red-900"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContainerChooser;
