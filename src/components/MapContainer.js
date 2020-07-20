/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map as LeafletMap, GeoJSON } from 'react-leaflet';

import ClientPortal from './ClientPortal';
import mexicoStates from '../utils/states.geojson';
import PopupContent from './PopupContent';

const MapContainer = (props) => {
  const { data = [] } = props;
  const statesData = {};
  const statusData = {};

  data.map((item) => {
    const s = statesData[item.nom_ent];
    if (s === undefined) {
      statesData[item.nom_ent] = {
        Females: {
          confirmados: 1,
          sospechosos: 1,
        },
        Males: {
          confirmados: 1,
          sospechosos: 1,
        },
      };
    } else {
      if (item.resultado === 'confirmado') {
        if (item.sexo === 'F') statesData[item.nom_ent].Females.confirmados = statesData[item.nom_ent].Females.confirmados + 1;
        else statesData[item.nom_ent].Males.confirmados = statesData[item.nom_ent].Males.confirmados + 1;
      } else {
        if (item.sexo === 'F') statesData[item.nom_ent].Females.sospechosos = statesData[item.nom_ent].Females.sospechosos + 1;
        else statesData[item.nom_ent].Males.sospechosos = statesData[item.nom_ent].Males.sospechosos + 1;
      }
    }

    let r = statusData[item.resultado];
    if (r === undefined) r = 0;
    statusData[item.resultado] = r + 1;
  });

  console.log('Estados', statesData);
  console.log('Status', statusData);
  console.log(`Total de casos: ${data.length}`);

  const mexicoPosition = [23.634501, -102.552784];
  // const mexicoCityPosition = [19.451054, -99.125519];

  const geojsonMarkerOptions = {
    fillColor: '#85C1E9',
    color: '#fff',
    weight: 0.8,
    opacity: 1,
    fillOpacity: 0.6,
  };

  const handleEachFeature = (feature = {}, layer) => {
    const { properties = {} } = feature;
    const { state_name } = properties;
    if (!state_name) return;
    // layer.bindPopup(`<p>${state_name}</p><p>${statesData[state_name]}</p>`);
    layer.bindPopup(ReactDOMServer.renderToString(<PopupContent title={state_name} firstNumber={statesData[state_name] ? (statesData[state_name].Females.sospechosos + statesData[state_name].Males.sospechosos) : '-'} secondNumber={statesData[state_name] ? (statesData[state_name].Females.confirmados + statesData[state_name].Males.confirmados) : '-'} />));
    // layer.on('mouseover', e => {
    //   console.log(state_name);
    //   layer.bindPopup(ReactDOMServer.renderToString(<PopupContent title={state_name} />)).openPopup();
    // });
  };

  return (
    <ClientPortal selector='#map-container'>
      <LeafletMap center={mexicoPosition} zoom={5}>
        <GeoJSON
          data={mexicoStates}
          style={geojsonMarkerOptions}
          onEachFeature={handleEachFeature}
        />
      </LeafletMap>
    </ClientPortal>
  );
};

export default MapContainer;
