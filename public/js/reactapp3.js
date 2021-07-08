
class App extends React.Component {
  constructor(props) {
      super(props);

      this.cache = {}
      this.currencies = ["CAD","HKD","CHF","JPY","USD","IDR","EUR","BGN"]
      
      this.state = {
       base: "USD",
       other: "EUR",
       value: 0,
       converted: 0
     };
   }

  render() {
    const options = this.currencies.map((currency) => {
       return (
          <option key={currency} value={currency}>{currency}</option>
        )
    })
    return (
    <div>  

      <div>
        <select name="base" onChange={this.makeSelection} value={this.state.base}>
            {options}
        </select>
        <input value={this.state.value} onChange={this.changeValue}/>
      </div>

      <div>
        <select name="other" onChange={this.makeSelection} value={this.state.other}>
            {options}
        </select>
        <input value={this.state.converted ===null?"recalculate...":this.state.converted} disabled={true}/>
      </div>

    </div>

      );
    }

    makeSelection = (event) => {
      this.setState({
        [event.target,name]: event.target.value,
      },this.recalculate)
    }

    changeValue = (event) => {
      this.setState({
        value: event.target.value,
        converted:null
      },this.recalculate)
    }

    recalculate = () => {
      const value = parseFloat(this.state.value)

      if (isNaN(value)) return

      if (this.cache[this.state.base] && Date.now()-this.cache.timestamp<1000*60) {
        this.setState({
          converted: this.cache[this.state.base].rates[this.state.other]*value
        })
        return
      }
      
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json())
      .then(data => {
        this.cache[this.state.base] = {
          rates: data.rates,
          timestamp: Date.now()
        }
        this.setState({
          converted: data.rates[this.state.other]*value                                
        })
      })
    }

  }


// ========================================

  ReactDOM.render(<App />, document.querySelector("#root"));

