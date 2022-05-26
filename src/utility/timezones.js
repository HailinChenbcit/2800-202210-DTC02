/**
 * Offsets the given date by the given offset
 * 
 * Code adapted from StackOverflow:
 * source: https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
 */
const offsetDate = (date, offset) =>
    new Date(date.getTime() + offset * 60 * 1000);

// Formats the given rawDatetime into a String for display
const formatToString = rawDatetime => rawDatetime.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
});

// Formats the given rawDatetime into a URL String for routes
const formatToURLString = rawDatetime =>
    `${String(rawDatetime.getFullYear()).padStart(4, "0")}${String(rawDatetime.getMonth()).padStart(2, "0")}${String(rawDatetime.getDate()).padStart(2, "0")}`;


module.exports = { offsetDate, formatToString, formatToURLString };