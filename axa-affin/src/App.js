import React from 'react';
import MainBackground from './Main';
import WeekChartActive from './Weeklyactive';
import WeekChartConfirmed from './Weeklyconfirmed';
import WeekChartDeath from './Weeklydeath';
import WeekChartRecovered from './Weeklyrecover';
// import Overall from './Overall';
import Footer from './Footer';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      index: []
    };
  }

  componentDidMount() {
    // fetch("https://cors-anywhere.herokuapp.com/https://api.covid19api.com/live/country/south-africa")
      fetch("https://api.covid19api.com/live/country/south-africa")

      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            index: result,
          });
          console.log(this.state.index)

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loaderContainer"><div className="loader"></div>
      <p className="loaderText">Loading...</p></div>;
    } else {
      return (
        <div className="containerWrapper">
          <MainBackground shareData = {this.state.index}/>
          <div className="contentWrapper">
            <div className="centerAlign">
              <div className="halfWidth">
              <h2 className="contentTitle">Total Cases.</h2>
                <div className="totalCases">
                  <p className="inlineText">Active : <b>{this.state.index.slice(-1)[0].Active}</b> </p>
                  <p className="inlineText">Confirmed :<b>{this.state.index.slice(-1)[0].Confirmed}</b></p>
                  <p className="inlineText">Death : <b>{this.state.index.slice(-1)[0].Deaths}</b></p>
                  <p className="inlineText">Recovered : <b>{this.state.index.slice(-1)[0].Recovered}</b></p>
                </div>
              </div>
            </div>
          {/* <Overall shareData = {this.state.index.map(wActive => ({x:wActive.Date, y:wActive.Active}))}/> */}
            <h2 className="contentTitle">Number of cases for the last 7 days.</h2>
            <WeekChartActive shareData = {this.state.index.map(wActive => ({date:wActive.Date, active:wActive.Active}))}/>
            <WeekChartConfirmed shareData = {this.state.index.map(wConfirmed => ({date:wConfirmed.Date, confirmed:wConfirmed.Confirmed}))}/>
            <WeekChartDeath shareData = {this.state.index.map(wDeath => ({date:wDeath.Date, deaths:wDeath.Deaths}))}/>
            <WeekChartRecovered shareData = {this.state.index.map(wRecovered => ({date:wRecovered.Date, recovered:wRecovered.Recovered}))}/>
          </div>
          <Footer/>
        </div>
      );
    }
  }
}

export default App;