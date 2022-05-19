/**
 * Offsets the given date by the given offset
 * @param {Date} date a Date object in UTC time
 * @param {Number} offset a Number in minutes
 * @returns a new Date object
 */
const offsetDate = (date, offset) =>
    new Date(date.getTime() + offset * 60 * 1000);

const formatToString = rawDatetime => rawDatetime.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
})

const formatToURLString = rawDatetime =>
    `${String(rawDatetime.getFullYear()).padStart(4, "0")}${String(rawDatetime.getMonth()).padStart(2, "0")}${String(rawDatetime.getDate()).padStart(2, "0")}`


module.exports = { offsetDate, formatToString, formatToURLString }