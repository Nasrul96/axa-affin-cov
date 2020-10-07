import React from 'react';
import logo from './assets/axalogo.png';
import countryIcon from './assets/south-africa.png';
import './App.css';


class mainTitle extends React.Component{
  render(){
    return(
      <div className="backgroundTop">
          <img src={logo} alt="axa logo" className="logoTop"/>
          <div className="relativeWrapper">
            <h1 className="titleName">Covid-19 Cases in <b>South Africa</b>.</h1>
            <img src={countryIcon} alt="country icon" className="countryFlag"/>
          </div>
          <p className="textCenter">Please wear mask when you are at public area and always practice social distancing.</p>
      </div>
    )
  }
};

export default mainTitle;