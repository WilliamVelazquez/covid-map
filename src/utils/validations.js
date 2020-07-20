export const isEmptyObject = (obj) => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
