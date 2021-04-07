import React, { useState, useEffect, useContext } from "react";
import { StaticMap } from "react-map-gl";
import Select from "react-select";

import DeckGL from "@deck.gl/react";
import { GPUGridLayer } from "@deck.gl/aggregation-layers";
import { DataFilterExtension } from "@deck.gl/extensions";
import { AuthContext } from './Auth';
import './upoff.css';

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
} from "victory";

import moment from "moment";

import NavBar from "./Nav";

import sData from "../data/ScooterData2.json";
import { Redirect } from "react-router";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYmlnYmFuazcyMSIsImEiOiJja2dhcXgxMXkwOXR3MnNwZHAyNmR2aDQ0In0.ZEyhAomCp9DWVE-9yiVDiw";

const INITIAL_VIEW_STATE = {
  longitude: -114.1999999,
  latitude: 51,
  zoom: 11,
  pitch: 50,
  bearing: -8,
};

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];


function Queue() {
  this.elements = [];
}
Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};
Queue.prototype.dequeue = function () {
  return this.elements.shift();
};
Queue.prototype.isEmpty = function () {
  return this.elements.length == 0;
};
Queue.prototype.peek = function () {
  return !this.isEmpty() ? this.elements[0] : undefined;
};
Queue.prototype.length = function () {
  return this.elements.length;
};

const _sData = sData.map((data) => {
  var time = data.start_hour;
  var day = moment(data.start_date).format("D");
  if (day - 15 > 0) {
    time = time + 24 * (day - 15);
  }
  return {
    coordinates: [data.startx, data.starty],
    timestamp: time * 60,
    day: day,
    hour: data.start_hour,
    grid: data.starting_grid_id,
  };
});

let filFir = 0;
let filSec = 0;

const dates = [
  // { value: 1, label: 1 },
  // { value: 2, label: 2 },
  // { value: 3, label: 3 },
  // { value: 4, label: 4 },
  // { value: 5, label: 5 },
  // { value: 6, label: 6 },
  // { value: 7, label: 7 },
  // { value: 8, label: 8 },
  // { value: 9, label: 9 },
  // { value: 10, label: 10 },
  // { value: 11, label: 11 },
  // { value: 12, label: 12 },
  // { value: 13, label: 13 },
  // { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 },
];

const months = [
  // { value: 1, label: "JAN" },
  // { value: 2, label: "FEB" },
  // { value: 3, label: "MAR" },
  // { value: 4, label: "APR" },
  // { value: 5, label: "MAY" },
  // { value: 6, label: "JUN" },
  { value: 7, label: "JUL" },
  // { value: 8, label: "AUG" },
  // { value: 9, label: "SEP" },
  // { value: 10, label: "OCT" },
  // { value: 11, label: "NOV" },
  // { value: 12, label: "DEC" },
];

const hours = [
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
];

const useData = [
  { time: 0, volume: 0 },
  { time: 1, volume: 0 },
  { time: 2, volume: 0 },
  { time: 3, volume: 0 },
  { time: 4, volume: 0 },
  { time: 5, volume: 0 },
  { time: 6, volume: 0 },
  { time: 7, volume: 0 },
  { time: 8, volume: 0 },
  { time: 9, volume: 0 },
  { time: 10, volume: 0 },
  { time: 11, volume: 0 },
  { time: 12, volume: 0 },
  { time: 13, volume: 0 },
  { time: 14, volume: 0 },
  { time: 15, volume: 0 },
  { time: 16, volume: 0 },
  { time: 17, volume: 0 },
  { time: 18, volume: 0 },
  { time: 19, volume: 0 },
  { time: 20, volume: 0 },
  { time: 21, volume: 0 },
  { time: 22, volume: 0 },
  { time: 23, volume: 0 },
];

const UpOff = () => {
  let [count, setCount] = useState(0);
  let [fst, setFst] = useState(0);
  let [sec, setSec] = useState(0);
  const [date, setDate] = useState(15);
  const [month, setMonth] = useState(7);
  const [hour, setHour] = useState(0);
  const [filter, setFilter] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const dHandler = (e) => {
    setDate(e.value);
  };

  const mHandler = (e) => {
    setMonth(e.value);
  };

  const hHandler = (e) => {
    setHour(e.value);
  };

  useEffect(() => {
    setCount((count) => count * 0);
    let interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1);
    return () => clearInterval(interval);
  }, [filter]);

  useEffect(() => {
    if (submit === true) {
      if (date >= 15 && month === 7) {
        setFst((fst) => (fst = (date - 15 + hour) * 60));
        setSec((sec) => (sec = (date - 15 + hour) * 60));
      } else {
        setFst(-1);
        setSec(-1);
      }
    }
  }, [submit]);

  if (filter === false) {
    filFir = 0;
    if (count % 60 === 0) filSec = count;
    for (let i = 0; i < 24; i++) {
      useData[i].volume = 0;
    }
  } else if (filter === true && submit === false) {
    filSec = -1;
    for (let i = 0; i < 24; i++) {
      useData[i].volume = 0;
    }
  } else if (filter === true && submit === true) {
    filFir = fst;
    filSec = sec;
    let q = new Queue();
    for (let i = date; i < date + 1; i++) {
      for (let j = 0; j < 24; j++) {
        const result = _sData.filter((_sDatas) => {
          return _sDatas.day == String(i) && _sDatas.hour == j;
        });
        q.enqueue(result.length);
      }
    }
    for (let i = 0; i < 24; i++) {
      useData[i].volume = q.dequeue();
    }
  }

  const layers = [
    new GPUGridLayer({
      id: "gpu-grid-layer",
      colorRange,
      data: _sData,
      pickable: true,
      extruded: true,
      cellSize: 300,
      coverage: 1,
      elevationScale: 7,
      opacity: 0.2,
      getPosition: (d) => d.coordinates,
      getFilterValue: (d) => d.timestamp,
      filterRange: [filFir, filSec],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    }),
  ];

  return (
    <div>
      {
        currentUser ? (
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers}
          >
            <StaticMap
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle={"mapbox://styles/mapbox/dark-v9"}
            />
            <NavBar />
            <div className="Selected">
              <button className="btn on" type="button" onClick={() => setFilter(true)}>
                Filter ON
          </button>
              <button className="btn off" type="button" onClick={() => setFilter(false)}>
                Filter OFF
          </button>
              <Select className="Selectform" placeholder="Date" options={dates} onChange={dHandler} />
              <Select className="Selectform" placeholder="Month" options={months} onChange={mHandler} />
              <Select className="Selectform" placeholder="Hour" options={hours} onChange={hHandler} />
              <button className="btn reset" type="button" onClick={() => setSubmit(false)}>
                RESET
          </button>
              <button className="btn submit" type="button" onClick={() => setSubmit(true)}>
                SUBMIT
          </button>
            </div>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              padding={75}
              width={1000}
              containerComponent={<VictoryContainer responsive={false} />}
            >
              <VictoryAxis
                fixLabelOverlap
                style={{
                  axis: { stroke: "#ffff" },
                  axisLabel: { fontSize: 100, padding: 30 },
                  grid: { stroke: "transparent" },

                  tickLabels: { padding: 5, fill: "#ffff" },
                }}
              />
              <VictoryAxis dependentAxis
                style={{
                  tickLabels: { padding: 5, fill: "#ffff" }
                }} />
              <VictoryBar
                data={useData}
                x="time"
                y="volume"
                labels={({ datum }) => `${datum.volume}`}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.time === hour ? "	#0096FF" : "	#B1B1B1",
                  },
                  labels: {
                    fontSize: 15,
                    fill: ({ datum }) =>
                      datum.time === hour ? "	#0096FF" : "	#B1B1B1",
                  },
                }}
              />
            </VictoryChart>
          </DeckGL>
        ) : (
          <Redirect to="/SignIn" />
        )
      }

    </div>

  );
};

export default UpOff;
