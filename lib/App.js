import React, { Component } from 'react';
import { Link} from 'react-router';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedAddress: null,
      txs: [],
      rates: null,
    };
  }
  componentDidMount() {
    axios.get('https://blockchain.info/ticker')
      .then(r => {
        console.log(r.data);
        this.setState({ rates: r.data });
      })
      .catch(err => console.log(err));
  }
  getTransactions(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/${e.target.address.value}`)
      .then(r => this.setState({ txs: r.data.data.txs }))
      .catch(err => console.log(err));
    e.target.address.value = null;
  }
  transactionHTML(tx, index) {
    return  <tr key={tx.time}>
              <td>{moment(tx.time).format('MM/DD/YYYY, h:mm:ss')}</td>
              <td>{tx.result}</td>
              <td>{tx.result * this.state.rates['USD'].last}</td>
            </tr>
  }
  render() {
    console.log(this.state.rates);
    const { txs } = this.state;
    let transactions = txs.map((tx, index) => this.transactionHTML(tx, index));
    return (
      <div className="App">
        <header>
          <h1>bitcoin transaction history</h1>
          <form name='enter-address' onSubmit={(e)=>this.getTransactions(e)}>
            <input placeholder="Enter Address" name="address"/>
            <button type='submit'>
              Submit
            </button>
          </form>
        </header>

        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Bitcoin</th>
              <th>Value in USD</th>
            </tr>
            {transactions}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
