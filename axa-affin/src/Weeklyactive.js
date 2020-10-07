import React from 'react';
import './App.css';

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#61C4E5'
    let widthScale = d => d * 0.045
    let dateFormat = date => {
        var realDate = Date.parse(date);
        var newDate = new Date(realDate);
        var dayofMonth = newDate.getDate();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthofYear = months[newDate.getMonth()];
        let showDate = dayofMonth + " " + monthofYear;

        return showDate;
    }
  
    let width = widthScale(props.d.active)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{dateFormat(props.d.date)}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.active}</text>
    </g>
  }
  
  class BarChart extends React.Component {
    state = {
      data: this.props.shareData.slice(-7)
    }

  
    render() {
      let barHeight = 30
      let barGroups = this.state.data.map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup d={d} barHeight={barHeight} />
                                                    </g>)                         
      
      return <div className="containerData activeCasesBox"><svg width="300" height="275">
        <g className="container">
          <text className="title" x="10" y="30">Active Cases</text>
          <g className="chart" transform="translate(60,60)">
            {barGroups}
          </g>
        </g>
      </svg>
      </div>
    }
  }
  
export default BarChart;