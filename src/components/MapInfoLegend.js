import React, { Component } from 'react';
import { withLeaflet, MapControl } from 'react-leaflet';
import L from 'leaflet';
import { getColor } from '../utils/validations';

class MapInfoLegend extends MapControl {
  constructor(props, context) {
    super(props);
  }

  createLeafletElement(opts) {
    const MapInfoLegend = L.Control.extend({
      onAdd: (map) => {
        this.panelDiv = L.DomUtil.create('div', 'info legend');
        const grades = [0, 100, 1000, 2000, 4000, 5000, 6000, 9000];

        for (let i = 0; i < grades.length; i++) {
          this.panelDiv.innerHTML += `<i style="background: ${getColor(grades[i] + 1)}"></i> ${grades[i] + (grades[i + 1] ? `&ndash;${grades[i + 1]}<br>` : '+')}`;
        }
        return this.panelDiv;
      },
    });
    return new MapInfoLegend({ position: 'topright' });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(MapInfoLegend);
