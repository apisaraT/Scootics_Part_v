import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';

import sData from '../data/ScooterData2.json';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
    { quarter: 5, earnings: 15590 },
    { quarter: 6, earnings: 21340 },
    { quarter: 7, earnings: 11900 }
];

class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            data: this.getData(0)
        };
    }
    componentDidMount() {
        let percent = 25;
        this.setStateInterval = window.setInterval(() => {
            percent += (Math.random() * 25);
            percent = (percent > 100) ? 0 : percent;
            this.setState({
                percent, data: this.getData(percent)
            });
        }, 1000);
    }
    componentWillUnmount() {
        window.clearInterval(this.setStateInterval);
    }

    getData(percent) {
        return [{ x: 1, y: percent },
        { x: 2, y: 100 - percent },
        { x: 3, y: 50 + percent },
        { x: 4, y: percent / 2 },
        { x: 5, y: 2 * percent },
        { x: 6, y: 30 + percent },
        { x: 7, y: percent + 20 },
        { x: 8, y: percent/4},
        { x: 9, y: percent+10 },
        { x: 10, y: percent*5 },
        { x: 11, y: 110-percent },
        { x: 12, y: 30+percent },
        { x: 13, y: percent+60 },
        { x: 14, y: percent/9 },
        { x: 15, y: percent },
        { x: 16, y: percent*3 },
        { x: 17, y: percent+40 },
        { x: 18, y: 130-percent },
        { x: 19, y: percent*4 },
        { x: 20, y: percent/7 },
        { x: 21, y: percent*6 },
        { x: 22, y: 160-percent },
        { x: 23, y: percent%50 },
        { x: 24, y: percent%9 },
    ];
    }
    render() {
        return (
            <div style={{ width: '20%' }}>
                <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={1500} height={300} containerComponent={<VictoryContainer responsive={false}/>}>
                    <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]} tickFormat={[""]} />
                    <VictoryAxis dependentAxis />
                    <VictoryBar data={this.state.data} style={{ data: { fill: "#FFF" } }} />
                </VictoryChart>
            </div>

        )
    }
}

export default Chart;