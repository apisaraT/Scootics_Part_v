import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { TripsLayer } from '@deck.gl/geo-layers';
import ScooterData from './data/ScooterData2.json';
import {Redirect} from 'react-router-dom'

import NavBar from './components/Nav';
import GetStarted from './components/getStarted'
import Home from './components/home';
import { AuthContext } from './components/Auth';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw';
const INITIAL_VIEW_STATE = {
  longitude: -114.15,
  latitude: 51,
  zoom: 11.5,
  pitch: 50,
  bearing: 0
};

function App({
  trailLength = 5,
  mapStyle = 'mapbox://styles/mapbox/dark-v9',
  animationSpeed = 0.5,
  loopLength = 1500
}) {
  /////////////////////////////// Authentication/////////////////////////////////////////////////////////////////////
  const { currentUser } = useContext(AuthContext);

  //////////////////////////////////////////////////////////////////////////////////////////////
  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = () => {
    setTime(t => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation]
  );

  const _scotterData = ScooterData.map(data => {
    return {
      waypoints: [
        {
          coordinates: [data.startx, data.starty],
          timestamp: data.start_hour * 60,
        },
        {
          coordinates: [data.endx, data.endy],
          timestamp: (data.start_hour * 60) + data.trip_duration_min,
        }
      ],
    }
  })

  const layer = new TripsLayer({
    id: 'trips-layer',
    data: _scotterData,
    getPath: d => d.waypoints.map(p => p.coordinates),
    getTimestamps: d => d.waypoints.map(p => p.timestamp - 0),
    getColor: [0, 204, 204],
    opacity: 1,
    widthMinPixels: 3,
    rounded: true,
    trailLength,
    currentTime: time
  });

  return (
    <div className="App" >
      {
        currentUser ? (
           <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layer}
          >
            <StaticMap
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle={mapStyle}
            />
            <NavBar />
            <GetStarted />
            <Home />
          </DeckGL>
        ) : (
          <Redirect to="/SignIn"/>
        )
      }
         
    </div>
  );
}

export default App;