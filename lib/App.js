import React, { Component } from 'react';
import { Link} from 'react-router';
import axios from 'axios';
import moment from 'moment';

// import './reset.css';
// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedAddress: null,
      txs: []
    };
  }
  getTransactions(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/${e.target.address.value}`)
      .then(r => this.setState({ txs: r.data.data.txs }))
      .catch(err => console.log(err));
  }
  transactionHTML(tx, index) {
    return  <tr key={tx.time}>
              <td>{moment(tx.time).format('MMMM Do YYYY, h:mm:ss')}</td>
              <td>{tx.result}</td>
              <td>100 Dollars</td>
            </tr>
  }
  render() {
    const { txs } = this.state;
    console.log(txs);
    let transactions = txs.map((tx, index) => this.transactionHTML(tx, index));
    return (
      <div className="App">
        <form name='enter-address' onSubmit={(e)=>this.getTransactions(e)}>
          <input placeholder="Enter Address" name="address"/>
          <button type='submit'>
            Submit
          </button>
        </form>
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
