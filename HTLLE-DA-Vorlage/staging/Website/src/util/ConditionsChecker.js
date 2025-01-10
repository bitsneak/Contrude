// Function to check the sentence and match conditions
  const checkConditions = (tableData, sentences) => {
    return tableData.map((data) => {
      // Find the sentence that matches the environment
      const sentence = sentences.find((sentence) => sentence.toLowerCase().includes(data.environment.toLowerCase()));
      
      if (!sentence) {
        return { ...data, alert: "" };  // No matching sentence found
      }
  
      // Extract condition and alert from sentence
      const [condition, result] = sentence.split(" = ");
      const conditionParts = condition.split(" ");
      const parameterValue = parseFloat(data.value);
      const comparator = conditionParts[1];
      const conditionValue = parseFloat(conditionParts[2]);
  
      // Evaluate condition
      let isValid = false;
  
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
  
      return { ...data, alert: isValid ? result : "" };
    });
  };
  
export default checkConditions;
  