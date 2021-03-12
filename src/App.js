import React, { useState, useEffect } from 'react';
import './App.css';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { TripsLayer } from '@deck.gl/geo-layers';
import ScooterData from './data/ScooterData2.json';
import Moment from 'moment';

import SignIn from './components/SignIn';
import auth from './firebase';
import NavBar from './components/Nav';


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw';
const INITIAL_VIEW_STATE = {
  longitude: -114.15,
  latitude: 51,
  zoom: 10.8,
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
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });

  useEffect(() => {
    const handelAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage: null
        })
      }
    });
    return () => {
      handelAuth();
    }
  }, [])
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
        session.isLoggedIn ? (
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layer}
          >
            <StaticMap
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle={mapStyle}
            />
            <NavBar setSession={setSession} />
          </DeckGL>)

          : (<SignIn setSession={setSession} />)
      }


    </div>
  );
}

export default App;
