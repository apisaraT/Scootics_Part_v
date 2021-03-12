import React, {useState} from 'react';

const styles={
    color:'#fff',
    fontSize:'7rem'
}

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = { h: 0, m: 0};
    }
  
    render() {
      return (
        <div style={styles}className="Clock">
          {this.state.h < 10 ? "0" + this.state.h : this.state.h}:{this
            .state.m < 10
            ? "0" + this.state.m
          : this.state.m}
        </div>
      );
    }
    componentDidMount() {
      setInterval(() => {
        this.setState((state, props) => {
          state.m += 1;
          if (state.m === 60){
            state.m = 0;
            state.h += 1;
            if (state.h === 24){
              state.h = 0;
            }
          }
          return {
            h: state.h,
            m: state.m
          };
        });
      }, 10);
    }
  }

  export default Clock;