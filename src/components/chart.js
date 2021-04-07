import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
} from "victory";

import moment from "moment";

import sData from "../data/ScooterData2.json";

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

var test = 0

let q = new Queue();
for (let i = 15; i < 32; i++) {
  for (let j = 0; j < 24; j++) {
    const result = _sData.filter((_sDatas) => {
      return _sDatas.day == String(i) && _sDatas.hour == j;
    });
    q.enqueue(result.length);
  }
}

var useData = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
];

var xAxis = [
  "23",
  "22",
  "21",
  "20",
  "19",
  "18",
  "17",
  "16",
  "15",
  "14",
  "13",
  "12",
  "11",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
];

var backUp = 0;

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(0),
    };
  }
  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      if (!q.isEmpty()) {
        useData[23] = useData[22];
        useData[22] = useData[21];
        useData[21] = useData[20];
        useData[20] = useData[19];
        useData[19] = useData[18];
        useData[18] = useData[17];
        useData[17] = useData[16];
        useData[16] = useData[15];
        useData[15] = useData[14];
        useData[14] = useData[13];
        useData[13] = useData[12];
        useData[12] = useData[11];
        useData[11] = useData[10];
        useData[10] = useData[9];
        useData[9] = useData[8];
        useData[8] = useData[7];
        useData[7] = useData[6];
        useData[6] = useData[5];
        useData[5] = useData[4];
        useData[4] = useData[3];
        useData[3] = useData[2];
        useData[2] = useData[1];
        useData[1] = useData[0];
        useData[0] = q.dequeue();
        backUp = xAxis[23];
        xAxis[23] = xAxis[22];
        xAxis[22] = xAxis[21];
        xAxis[21] = xAxis[20];
        xAxis[20] = xAxis[19];
        xAxis[19] = xAxis[18];
        xAxis[18] = xAxis[17];
        xAxis[17] = xAxis[16];
        xAxis[16] = xAxis[15];
        xAxis[15] = xAxis[14];
        xAxis[14] = xAxis[13];
        xAxis[13] = xAxis[12];
        xAxis[12] = xAxis[11];
        xAxis[11] = xAxis[10];
        xAxis[10] = xAxis[9];
        xAxis[9] = xAxis[8];
        xAxis[8] = xAxis[7];
        xAxis[7] = xAxis[6];
        xAxis[6] = xAxis[5];
        xAxis[5] = xAxis[4];
        xAxis[4] = xAxis[3];
        xAxis[3] = xAxis[2];
        xAxis[2] = xAxis[1];
        xAxis[1] = xAxis[0];
        xAxis[0] = backUp;
      }
      this.setState({
        data: this.getData(useData),
      });
    }, 10);
  }
  componentWillUnmount() {
    if (q.isEmpty()) window.clearInterval(this.setStateInterval);
  }

  changeData(){
    return[
      
    ]
  }

  getData(useData) {
    return [
      { x: 1, y: useData[0] },
      { x: 2, y: useData[1] },
      { x: 3, y: useData[2] },
      { x: 4, y: useData[3] },
      { x: 5, y: useData[4] },
      { x: 6, y: useData[5] },
      { x: 7, y: useData[6] },
      { x: 8, y: useData[7] },
      { x: 9, y: useData[8] },
      { x: 10, y: useData[9] },
      { x: 11, y: useData[10] },
      { x: 12, y: useData[11] },
      { x: 13, y: useData[12] },
      { x: 14, y: useData[13] },
      { x: 15, y: useData[14] },
      { x: 16, y: useData[15] },
      { x: 17, y: useData[16] },
      { x: 18, y: useData[17] },
      { x: 19, y: useData[18] },
      { x: 20, y: useData[19] },
      { x: 21, y: useData[20] },
      { x: 22, y: useData[21] },
      { x: 23, y: useData[22] },
      { x: 24, y: useData[23] },
    ];
  }
  render() {
    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={50}
          width={1500}
          height={300}
          containerComponent={<VictoryContainer responsive={true} />}
        >
          <VictoryAxis
            tickValues={[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
            ]}
            tickFormat={[
              xAxis[0],
              xAxis[1],
              xAxis[2],
              xAxis[3],
              xAxis[4],
              xAxis[5],
              xAxis[6],
              xAxis[7],
              xAxis[8],
              xAxis[9],
              xAxis[10],
              xAxis[11],
              xAxis[12],
              xAxis[13],
              xAxis[14],
              xAxis[15],
              xAxis[16],
              xAxis[17],
              xAxis[18],
              xAxis[19],
              xAxis[20],
              xAxis[21],
              xAxis[22],
              xAxis[23],
            ]}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 8, padding: 30 },
              grid: { stroke: "transparent" },
              ticks: { stroke: "grey", size: 2 },
              tickLabels: { padding: 5, fill: "#ffff" },
            }}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={this.state.data}
            style={{ data: { fill: "#F9E79F" } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default Chart;
