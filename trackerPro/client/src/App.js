import React, { useEffect, useState } from 'react';
import Stock from './Stock';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import background from "./Images/backOrange.png";


function App() {

  const [backendData, setBackendData] = useState([{}])

  /*
  CSS STYLES
  */
  const labelStyle = {
    marginTop: '50px',
    marginLeft: '530px',
    color: "black",
    fontSize: "1px",
  };

  const coinStyle = {
    height: '170px',
    width: '170px',
    textDecoration: 'none',
    padding: '60px 20px',
    textAlign: 'center',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    marginLeft: '85px',
    marginTop: '60px',
    backgroundColor: '#f6b35c',
    color: 'black',
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: 'yellow',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const homeStyle = {
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    color: "black",
    backgroundColor: '#f6b35c',
    fontWeight: 'bold',
    fontSize: "35px",
    textDecoration: 'none',
    marginLeft: '0px'
  };

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  
  //the frontend
  return (
    <Router>
      <div style={{ backgroundColor: '#FEB95F',
        height: '100vh', display: 'block', backgroundImage: `url(${background})`,
        backgroundSize: 'cover' }}>
        <Link to="/" style={homeStyle}>Crypto Tracker</Link>      

        <Switch>
            <Route exact path="/">
              <p style={labelStyle}>.</p>
              {(typeof backendData.coins == 'undefined') ? (
            <p>Loading... </p>
            ): ( 

              backendData.coins.map((user, i) => (
                <React.Fragment key={i}>
                  <Link to={backendData.coins[i]} style={coinStyle}> {backendData.coins[i]} </Link> 
                </React.Fragment>
              ))
            )}
            </Route>  
            <Route path={'/Bitcoin'}>
              <Stock Symbol={'BTC'}/>
            </Route> 
            <Route path={'/Ethereum'}>
              <Stock Symbol={'ETH'}/>
            </Route> 
            <Route path={'/Cardano'}>
              <Stock Symbol={'ADA'}/>
            </Route>
            <Route path={'/DodgeCoin'}>
              <Stock Symbol={'DOGE'}/>
            </Route> 
            <Route path={'/XRP'}>
              <Stock Symbol={'XRP'}/>
            </Route> 
            <Route path={'/Tether'}>
              <Stock Symbol={'USDT'}/>
            </Route> 
            <Route path={'/BNB'}>
              <Stock Symbol={'BNB'}/>
            </Route> 
            <Route path={'/Solona'}>
              <Stock Symbol={'SOL'}/>
            </Route> 
            <Route path={'/Dai'}>
              <Stock Symbol={'DAI'}/>
            </Route> 
            <Route path={'/Polkadot'}>
              <Stock Symbol={'DOT'}/>
            </Route>  
        </Switch>
      </div>
    </Router>
  )
}

export default App