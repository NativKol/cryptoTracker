import React, { createContext } from 'react';
import Plot from 'react-plotly.js';

export const ThemeContext = createContext(null);

//refresh page
const refresh = () => {
    window.location.reload();
  } 

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockSymbolField: props.Symbol,     
            stockChartsXValues: [],     //date
            stockChartsYValues: [],     //price
            trys: 0,     //check for how many trys the stock tried to load
            dateRange: 365       //the amount of days to show backwords
        };
        //functions that changes the state
        this.submit = this.submit.bind(this);
        this.selectOverall = this.selectOverall.bind(this);
        this.select5Years = this.select5Years.bind(this);
        this.selectYear = this.selectYear.bind(this);
        this.selectHalfYear = this.selectHalfYear.bind(this);      
        this.selectMonth = this.selectMonth.bind(this);
        this.selectWeek = this.selectWeek.bind(this);
    }

    submit() {
        console.log("submited");
        console.log(this.state.dateRange);
        this.fetchStock();
    }

    selectOverall() {    
        console.log("selected overall");
        this.setState({ dateRange: 20000});
        console.log(this.state.dateRange);
    }

    select5Years() {    
        console.log("selected 5 year");
        this.setState({ dateRange: 1825});
        console.log(this.state.dateRange);
    }

    selectYear() {    
        console.log("selected 1 year");
        this.setState({ dateRange: 365});
        console.log(this.state.dateRange);
    }

    selectHalfYear() {    
        console.log("selected 6 months");
        this.setState({ dateRange: 183});
        console.log(this.state.dateRange);  
    }

    selectMonth() {    
        console.log("selected 1 month");
        this.setState({ dateRange: 30});
        console.log(this.state.dateRange);
    }

    selectWeek() {    
        console.log("selected 1 week");
        this.setState({ dateRange: 7});
        console.log(this.state.dateRange);
    }

    //going up witn loading
    componentDidMount() {
        this.fetchStock();
    }

    //getting the data for the stock
    fetchStock() {
        this.state.trys++;
        const pointerToThis = this;
        let stockSymbol = this.state.stockSymbolField;
        let i = this.state.dateRange; 
        let t = this.state.trys;
        
        const API_KEY = '6RA6OOHZ284QXJ5N';
        let API_CALL = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${stockSymbol}&market=CNY&apikey=${API_KEY}`;
        
        let stockChartsXValuesFunction = [];
        let stockChartsYValuesFunction = [];
        
        fetch(API_CALL)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                    
                    if (!('Time Series (Digital Currency Daily)' in data) ) {
                        console.log('api could not load..');
                        console.log(t)
                        if (t >= 2) //if more than 2 trys
                        {
                            alert("API Could Not Load, Try To Refresh The Page..");
                        }
                    }

                    for (var key in data['Time Series (Digital Currency Daily)']) {
                        if (i < 0)
                            break;
                        stockChartsXValuesFunction.push(key);
                        stockChartsYValuesFunction.push(data['Time Series (Digital Currency Daily)'][key]['1b. open (USD)'])
                        i--;
                    }
                    //update x&y
                    pointerToThis.setState({
                        stockChartsXValues: stockChartsXValuesFunction,
                        stockChartsYValues: stockChartsYValuesFunction
                    });
                }
            )     
    }

    render() {

        /* 
            CSS STYLES
        */
        const lightStyle = {
            backgroundColor: '#FEB95F',
            height: '93vh'  
        };

        const btnStyle = {
            padding: '8px 20px',
            display: 'inline',
            alignItems: 'left',
            justifyContent: 'left',
            borderRadius: '12px',
            marginLeft: '25px',
            backgroundColor: '#FEB95F',
            color: 'black',
            border: '2px solid #000000',
            fontSize: '15px',
            fontWeight: 'bold',
            width: '115px'

        };        

        const menuStyle = {
            display: 'flex',
            color: "black",
            backgroundColor: "#FEB95F",
            fontSize: "20px",
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            marginLeft: '10px'
        };

        const submitStyle = {
            padding: '8px 20px',
            display: 'inline',
            alignItems: 'left',
            justifyContent: 'left',
            borderRadius: '12px',
            marginLeft: '25px',
            backgroundColor: 'black',
            color: '#FEB95F',
            borderColor: 'white',
            borderWidth: '2px',
            fontSize: '15px',
            fontWeight: 'bold',
            width: '115px'
        };

        //frontend-stock

        return (
            <div style={lightStyle}>
                <div style={{
                    justifyContent: 'left',
                    alignItems: 'left',
                    backgroundColor: '#FEB95F',
                    width: '1000px'
                    }}>
                    
                    <h1>Stock Market : {this.state.stockSymbolField}</h1>
                    
                    <button onClick={refresh} style={menuStyle}> Refresh </button>

                    <Plot data={[
                            {
                                x: this.state.stockChartsXValues,
                                y: this.state.stockChartsYValues,
                                backgroundColor: "#FEB95F",
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'black'},
                            }
                        ]}
                        layout={  { paper_bgcolor:"#FEB95F",  plot_bgcolor: '#FEB95F', width: 900, height: 400} }>
                    
                    </Plot>
                    
                    <button onClick={this.selectWeek} style={btnStyle}>Week</button>
                    <button onClick={this.selectMonth} style={btnStyle}>Month</button>
                    <button onClick={this.selectHalfYear} style={btnStyle}>6 Months</button>
                    <button onClick={this.selectYear} style={btnStyle}>Year</button>
                    <button onClick={this.select5Years} style={btnStyle}>5 Years</button>
                    <button onClick={this.selectOverall} style={btnStyle}>Overall</button>

                    <button onClick={this.submit} style={submitStyle}> Submit </button>
                </div>
            </div>
        )
    }
}
export default Stock;