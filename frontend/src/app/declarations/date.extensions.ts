Date.prototype.fixDayOff = function () {
  const dateArray = String(this).split('-');
  const dateNumber: any = [];
  dateArray.forEach((char) => {
    dateNumber.push(Number(char));
  });
  this.setUTCFullYear(dateNumber[0], dateNumber[1] - 1, dateNumber[2]);
};
