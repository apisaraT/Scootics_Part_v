import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { TripsLayer } from '@deck.gl/geo-layers';

import NavBar from './Nav'
import './model2.css'

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw";

const INITIAL_VIEW_STATE = {
  longitude: -114.07777,
  latitude: 51.02222,
  zoom: 12,
  pitch: 50,
  bearing: -8,
};

const day = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

const hour = [
  { value: 0, label: '00:00' },
  { value: 1, label: '01:00' },
  { value: 2, label: '02:00' },
  { value: 3, label: '03:00' },
  { value: 4, label: '04:00' },
  { value: 5, label: '05:00' },
  { value: 6, label: '06:00' },
  { value: 7, label: '07:00' },
  { value: 8, label: '08:00' },
  { value: 9, label: '09:00' },
  { value: 10, label: '10:00' },
  { value: 11, label: '11:00' },
  { value: 12, label: '12:00' },
  { value: 13, label: '13:00' },
  { value: 14, label: '14:00' },
  { value: 15, label: '15:00' },
  { value: 16, label: '16:00' },
  { value: 17, label: '17:00' },
  { value: 18, label: '18:00' },
  { value: 19, label: '19:00' },
  { value: 20, label: '20:00' },
  { value: 21, label: '21:00' },
  { value: 22, label: '22:00' },
  { value: 23, label: '23:00' },
]

const DesPre = ({ animationSpeed = 1, loopLength = 200 }) => {

  const [datas, setDatas] = useState({ posts: [] });
  const [days, setDay] = useState("");
  const [hours, setHours] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);
  const [submit, setSubmit] = useState(1);
  const [isError, setIsError] = useState(false);
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

  const dHandler = (e) => {
    setDay(e.value);
  };

  const hHandler = (e) => {
    setHours(e.value);
  };

  useEffect(() => {
    async function call() {
      setIsError(false);
      try {
        const pullData = await axios.post(
          "http://35.185.177.179:8080/predict",
          {
            dayofweek: days,
            hour: hours,
            latitude: latitude,
            longitude: longtitude,
          }
        );
        setDatas({ posts: pullData.data });
      } catch (err) {
        setIsError(true);
      }
    }
    call();
  }, [submit]);

  const use = [
    {
      waypoints: [
        { coordinates: [longtitude, latitude], timestamp: 0 },
        {
          
          coordinates: [datas.posts.longtitude, datas.posts.latitude],
          timestamp: 60,
        },
      ],
    },
  ];

  const layer = [
    new TripsLayer({
      id: "trips-layer",
      data: use,
      getPath: (d) => d.waypoints.map((p) => p.coordinates),
      getTimestamps: (d) => d.waypoints.map((p) => p.timestamp - 0),
      getColor:  [216, 254, 181],
      opacity: 5,
      widthMinPixels: 9,
      rounded: true,
      trailLength: 50,
      currentTime: time,
    })]

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
      />
      <NavBar />
      <div className="groupForm">
        <div className="inputform">
          <div>
            <p className="head">Enter Day</p>
            <Select className="Select" placeholder="Day" options={day} onChange={dHandler} />
          </div>
          <div>
            <p className="head">Enter Time(Hour)</p>
            <Select className="Select" placeholder="Hour" options={hour} onChange={hHandler} />
          </div>
          <div>
            <p className="head">Enter Latitude</p>
            <input className="inputsize"
              placeholder="Latitude"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </div>
          <div>
            <p className="head">Enter Longitude</p>
            <input className="inputsize"
              placeholder="Longtitude"
              value={longtitude}
              onChange={(event) => setLongtitude(event.target.value)}
            />
          </div>
          <div>
            <button
              type="button" className="mt-5 btn btn-primary"
              onClick={() => setSubmit({ days, hours, latitude, longtitude })}
            >
              Submit
        </button>
          </div>
        </div>
        {isError && <div>Something went wrong ...</div>}
      </div>

    </DeckGL >
  );
};
export default DesPre;
