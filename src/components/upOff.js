import React, { useState, useEffect } from 'react';
import { StaticMap } from 'react-map-gl';

import DeckGL from '@deck.gl/react';
import { GPUGridLayer } from '@deck.gl/aggregation-layers';
import { DataFilterExtension } from '@deck.gl/extensions';

import NavBar2 from './Nav2';
import Clock from './clock';
import Chart from './chart';
import sData from '../data/ScooterData2.json';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw';

const styles ={
  paddingLeft:'40px',
  paddingTop:'35%'
}

const styless ={
  paddingLeft:'20px',
  paddingTop:'30%'
}
const INITIAL_VIEW_STATE = {
  longitude: -114.066666,
  latitude: 51,
  zoom: 10.3,
  pitch: 50,
  bearing: -8
};

const _sData = sData.map(data => {
  return {
    coordinates: [data.startx, data.starty],
    timestamp: data.start_hour * 60
  }
})

const UpOff = () => {
  const [filters, setFilters] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilters(filters => filters + 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    new GPUGridLayer({
      id: 'gpu-grid-layer',
      data: _sData,
      pickable: true,
      extruded: true,
      cellSize: 200,
      elevationScale: 10,
      opacity: 0.25,
      getPosition: d => d.coordinates,
      getFilterValue: d => d.timestamp,
      filterRange: [0, filters],
      extensions: [new DataFilterExtension({ filterSize: 1 })]
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
      />

      <NavBar2 />
      <div class="d-inline-flex">
          <div style={styles}>
            <Clock />
          </div>
          <div style={styless}>
              <Chart />
          </div>
        
      </div>
     


    </DeckGL>
  );
}

export default UpOff;