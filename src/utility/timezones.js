const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

module.exports = {offsetDate}