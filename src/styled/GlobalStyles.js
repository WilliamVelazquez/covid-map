import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    /* font-size:18px; */
    background: #ffffff;
    font-family: 'Poppins', sans-serif, system-ui;
  }
  button {
    font-family: 'Poppins', sans-serif, system-ui;
  }
  #map-container , .leaflet-container {
    width:100%;
    height: 480px;
    background: #fff;
  }
`;

export default GlobalStyles;
