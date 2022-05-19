/**
 * Offsets the given date by the given offset
 * @param {Date} date a Date object in UTC time
 * @param {Number} offset a Number in minutes
 * @returns a new Date object
 */
const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

module.exports = {offsetDate}