/**
 * @description Build a flux query to get sensor data
 * @param {string} bucket 
 * @param {int} ship 
 * @param {int} container 
 * @param {DateTime} start 
 * @param {DateTime} stop 
 * @returns {string} Flux query
 */
export const fluxQuery = function(bucket, ship, container, start, stop) {
return `
    from(bucket: "${bucket}") 
    |> range(start: ${start}, stop: ${stop}) 
    |> filter(fn: (r) => r["ship"] == "${ship}") 
    |> filter(fn: (r) => r["container"] == "${container}")`;
};
  
/**
 * @description Check if the start and stop times are valid
 * @param {DateTime} start 
 * @param {DateTime} stop 
 * @returns {string} Error message or empty string
 */
export const checkParams = function(start, stop) {
    const ISO_8601_UTC = /^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z$/;
    
    // check if the start and stop times are valid
    if (!ISO_8601_UTC.test(start)) return "Invalid start format";
    else if (!ISO_8601_UTC.test(stop)) return "Invalid stop format";
    else {
        // check if stop time is same or earlier than start time
        const startDate = new Date(start);
        const stopDate = new Date(stop);
  
        if (stopDate <= startDate) return "Stop time is same or earlier than start time";
    }
    return "";
};