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
  .info {
    /* font: 14px/16px Arial, Helvetica, sans-serif; */
    padding: 6px 8px;
    background: white;
    border-radius: 5px;
    margin-right: 20px !important;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
  }
  .legend {
    color: #555;
    line-height: 18px;
  }
  .legend i {
    float: left;
    width: 18px;
    height: 18px;
    opacity: 0.7;
    margin-right: 8px;
  }
  .help-text{
    margin: 0;
    color: #555;
  }
`;

export default GlobalStyles;
