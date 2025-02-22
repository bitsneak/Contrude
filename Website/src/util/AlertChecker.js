// Function to check the sentence and match conditions
const checkForAlerts = (sentences, serialNumber) => {
    let alerts = [];  // Initialize alerts array to store any matching conditions
    const validSentences = Array.isArray(sentences) ? sentences : [];

    validSentences.forEach((sentence) => {
      // Extract condition and result from sentence
      const [condition, result] = sentence.split(" = ");
      const conditionParts = condition.split(" ");
      let parameterValue = 0;
      const conditionParameter = conditionParts[0];
      const comparator = conditionParts[1];
      const conditionValue = parseFloat(conditionParts[2]);
  
      // Evaluate condition
      let isValid = false;
  
      // Check parameter based on condition
      switch (conditionParameter) {
        case "Air-Pressure":
          parameterValue = 102.32500;
          break;
        case "Humidity":
          parameterValue = 20;
          break;
        case "Temperature":
          parameterValue = 25;
          break;
        case "Vibration":
          parameterValue = 7;
          break;
        case "Altitude":
          parameterValue = 110;
          break;
        case "Latitude":
          parameterValue = 50;
          break;
        case "Longitude":
          parameterValue = 80;
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
    });
  
    return alerts;
  };
  
  export default checkForAlerts;
  