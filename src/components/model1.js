import React, { useEffect, useState,useContext } from "react";

import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import NavBar from './Nav'
import './model2.css'
import { AuthContext } from './Auth';
import { Redirect } from "react-router";


const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw";

const INITIAL_VIEW_STATE = {
  longitude: -114.07777,
  latitude: 51,
  zoom: 11,
  pitch: 50,
  bearing: -8,
};

function Pickpre() {
  return (
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
          >
            <StaticMap
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle={"mapbox://styles/mapbox/dark-v9"}
            />
            <NavBar />
          </DeckGL>

  );
}
export default Pickpre;