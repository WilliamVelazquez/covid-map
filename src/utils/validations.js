export const isEmptyObject = (obj) => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getColor = (density) => {
  return density > 9000 ? '#ab0606' :
        density > 6000 ? '#c52121' :
        density > 5000 ? '#ec2e2e' :
        density > 4000 ? '#dc5f17' :
        density > 2000 ? '#FD8D3C' :
        density > 1000 ? '#FEB24C' :
        density > 100 ? '#FED976' :
        '#FFEDA0';
};
