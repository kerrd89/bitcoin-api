import React, { Component } from 'react';
import { Link} from 'react-router';
import axios from 'axios';
import moment from 'moment';

import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      txs: [],
      rates: null,
      address: 'no bitcoin address selected'
    };
  }
  componentDidMount() {
    this.getExchangeRates();
    if (this.props.params.token) {
      this.getTransactions(this.props.params.token);
    }
  }
  getTransactions(address) {
    axios.get(`http://localhost:3000/api/${address}`)
      .then(r => this.setState({ txs: r.data.txs.txs, address }))
      .catch(err => console.log(err));
  }
  getExchangeRates() {
    axios.get('http://localhost:3000/api/rates/all')
      .then(r => this.setState({ rates: r.data.rates }))
      .catch(err => console.log(err));
  }
  transactionHTML(tx, index) {
    return  <tr key={tx.time}>
              <td >{moment(tx.time).format('MMM Do YY, h:mm')}</td>
              <td >{Number(tx.result).toLocaleString('en')}</td>
              <td className='USD'>{Number(tx.result * this.state.rates['USD'].last).toLocaleString('en')}</td>
            </tr>
  }
  render() {

    const { txs, address } = this.state;
    console.log(txs);
    let transactions = txs.map((tx, index) => this.transactionHTML(tx, index));

    return (
      <div className="App">

        <Header getTransactions={(e) => this.getTransactions(e)} address={address}/>

        <table>
          <tbody>
            <tr>
              <th>Time Stamp</th>
              <th># of Bitcoin</th>
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
