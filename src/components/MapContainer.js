/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map as LeafletMap, GeoJSON } from 'react-leaflet';
import { getColor, numberWithCommas } from '../utils/validations';

import ClientPortal from './ClientPortal';
import mexicoStates from '../utils/states.geojson';
import PopupContent from './PopupContent';
import CountBoard from './CountBoard';
import MapInfoLegend from './MapInfoLegend';
import Separator from './Separator';

const MapContainer = (props) => {
  const { data = [] } = props;
  const statesData = {};
  const statusData = {};

  const SELECT_OPTIONS = [
    { id: '1', value: 'Todos los casos' },
    { id: '2', value: 'Mujeres' },
    { id: '3', value: 'Hombres' },
  ];

  const [selectedValue, setSelectedValue] = useState(1);
  const [activeData, setActiveData] = useState({
    selectedOptionId: 1,
    firstText: 'Sospechosos',
    secondText: 'Confirmados',
    firstData: '-',
    secondData: '-',
  });

  data.map((item) => {
    const s = statesData[item.nom_ent];
    if (s === undefined) {
      statesData[item.nom_ent] = {
        Females: {
          confirmados: 0,
          sospechosos: 0,
        },
        Males: {
          confirmados: 0,
          sospechosos: 0,
        },
      };
    }

    if (item.resultado === 'confirmado') {
      if (item.sexo === 'F') statesData[item.nom_ent].Females.confirmados = statesData[item.nom_ent].Females.confirmados + 1;
      else statesData[item.nom_ent].Males.confirmados = statesData[item.nom_ent].Males.confirmados + 1;
    } else {
      if (item.sexo === 'F') statesData[item.nom_ent].Females.sospechosos = statesData[item.nom_ent].Females.sospechosos + 1;
      else statesData[item.nom_ent].Males.sospechosos = statesData[item.nom_ent].Males.sospechosos + 1;
    }

    let r = statusData[item.resultado];
    if (r === undefined) r = 0;
    statusData[item.resultado] = r + 1;
  });

  // console.log('Estados', statesData);
  // console.log('Status', statusData);
  // console.log(`Total de casos: ${data.length}`);

  const femaleSuspectTotal = Object.values(statesData).reduce((t, { Females }) => t + Females.sospechosos, 0);
  const femaleConfirmedTotal = Object.values(statesData).reduce((t, { Females }) => t + Females.confirmados, 0);

  const maleSuspectTotal = Object.values(statesData).reduce((t, { Males }) => t + Males.sospechosos, 0);
  const maleConfirmedTotal = Object.values(statesData).reduce((t, { Males }) => t + Males.confirmados, 0);

  const updateBoardData = () => {
    setActiveData({
      selectedOptionId: selectedValue,
      firstText: 'Sospechosos',
      secondText: 'Confirmados',
      firstData: selectedValue > 2 ? numberWithCommas(maleSuspectTotal) : selectedValue > 1 ? numberWithCommas(femaleSuspectTotal) : numberWithCommas(statusData.sospechoso),
      secondData: selectedValue > 2 ? numberWithCommas(maleConfirmedTotal) : selectedValue > 1 ? numberWithCommas(femaleConfirmedTotal) : numberWithCommas(statusData.confirmado),
    });
  };

  useEffect(() => {
    updateBoardData();
  }, [selectedValue]);

  const onChangeInfo = (e) => {
    // console.log(e.target.value);
    setSelectedValue(e.target.value);
  };

  const mexicoPosition = [23.634501, -102.552784];
  // const mexicoCityPosition = [19.451054, -99.125519];

  const geojsonMarkerOptions = {
    // fillColor: getColor(), //'#017faf', //'#85C1E9',
    color: '#fff',
    weight: 0.8,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const styleOpts = (feature) => {
    // console.log(feature);
    const stateName = feature.properties.state_name;
    const density = (statesData[stateName].Females.confirmados + statesData[stateName].Males.confirmados);
    // console.log('density-->', density);
    return {
      fillColor: getColor(density),
      ...geojsonMarkerOptions,
    };
  };

  const handleEachFeature = (feature = {}, layer) => {
    const { properties = {} } = feature;
    const { state_name } = properties;
    if (!state_name) return;
    // layer.bindPopup(`<p>${state_name}</p><p>${statesData[state_name]}</p>`);
    layer.bindPopup(ReactDOMServer.renderToString(<PopupContent title={state_name} firstNumber={statesData[state_name] ? numberWithCommas(statesData[state_name].Females.sospechosos + statesData[state_name].Males.sospechosos) : '-'} secondNumber={statesData[state_name] ? numberWithCommas(statesData[state_name].Females.confirmados + statesData[state_name].Males.confirmados) : '-'} />));
    // layer.on('mouseover', e => {
    //   console.log(state_name);
    //   layer.bindPopup(ReactDOMServer.renderToString(<PopupContent title={state_name} />)).openPopup();
    // });
  };

  return (
    <>
      <CountBoard
        options={SELECT_OPTIONS}
        handleChange={onChangeInfo}
        value={selectedValue}
        firstTitle={activeData.firstText} //'Sospechosos'
        firstCount={activeData.firstData} //{numberWithCommas(statusData.sospechoso)}
        secondTitle={activeData.secondText} //'Confirmados'
        secondCount={activeData.secondData} //{numberWithCommas(statusData.confirmado)}
        finalTitle='Total de Casos'
        finalCount={numberWithCommas(data.length)}
      />
      <Separator />
      <p className='help-text'>Haz clic sobre un estado para ver el total de casos en cada uno.</p>
      <ClientPortal selector='#map-container'>
        <LeafletMap center={mexicoPosition} zoom={5}>
          <MapInfoLegend />
          <GeoJSON
            data={mexicoStates}
            style={styleOpts}
            onEachFeature={handleEachFeature}
          />
        </LeafletMap>
      </ClientPortal>
    </>
  );
};

export default MapContainer;
