import axiosInstance from '../api/AxiosInstance';

// Function to check the sentence and match conditions
const checkForAlerts = async (sentences, serialNumber, selectedShip, page) => {
    let alerts = [];  // Initialize alerts array to store any matching conditions
    const validSentences = Array.isArray(sentences) ? sentences : [];

    for (const sentence of validSentences) {
      // Extract condition and result from sentence
      const [condition, result] = sentence.split(" = ");
      const conditionParts = condition.split(" ");
      let parameterValue = 0;
      const conditionParameter = conditionParts[0];
      const comparator = conditionParts[1];
      const conditionValue = parseFloat(conditionParts[2]);
  
      const containerIdOfSN = await axiosInstance.get(`/rest/container/by-serial-number/${serialNumber}`);
      const fetchedID = containerIdOfSN.data.container;

      let ship;
      if(page === "main"){
        ship = selectedShip.id;
      }else{
        ship = selectedShip;
      }

      const environmentDataResponse = await axiosInstance.get(`/rest/sensor/${ship}/${fetchedID}`);

      // Evaluate condition
      let isValid = false;
  
      // Check parameter based on condition
      switch (conditionParameter) {
        case "Air-Pressure":
          parameterValue = environmentDataResponse.data.sensor_data.air_pressure[0].value;
          break;
        case "Humidity":
          parameterValue = environmentDataResponse.data.sensor_data.humidity[0].value;
          break;
        case "Temperature":
          parameterValue = environmentDataResponse.data.sensor_data.temperature[0].value;
          break;
        case "Vibration":
          parameterValue = environmentDataResponse.data.sensor_data.vibration[0].value;
          break;
        case "Altitude":
          parameterValue = environmentDataResponse.data.sensor_data.altitude[0].value;
          break;
        case "Latitude":
          parameterValue = environmentDataResponse.data.sensor_data.latitude[0].value;
          break;
        case "Longitude":
          parameterValue = environmentDataResponse.data.sensor_data.longitude[0].value;
          break;
        default:
          isValid = false;
          break;
      }
  
      switch (comparator) {
        case ">":
          isValid = parameterValue > conditionValue;
          break;
        case "<":
          isValid = parameterValue < conditionValue;
          break;
        case "==":
          isValid = parameterValue === conditionValue;
          break;
        case "!=":
          isValid = parameterValue !== conditionValue;
          break;
        case ">=":
          isValid = parameterValue >= conditionValue;
          break;
        case "<=":
          isValid = parameterValue <= conditionValue;
          break;
        default:
          isValid = false;
          break;
      }
  
      // If the condition is valid, push the result into the alerts array
      if (isValid) {
        // Maybe change later
        if (result === 'Critical' || result === 'High' || result === 'Low'){
          alerts.push(`${conditionParameter} of ${serialNumber} = ${result}`);
        }
      
      }
    };
  
    return alerts;
  };
  
  export default checkForAlerts;
  