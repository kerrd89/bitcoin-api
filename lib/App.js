import React, { Component } from 'react';
import { browserHistory } from 'react-router';
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
    //pull exchange rates
    this.getExchangeRates();
    //if url has a token attached, pull data for that token
    if (this.props.params.token) {
      this.getTransactions(this.props.params.token);
    }
  }
  getTransactions(address) {
    axios.get(`https://bitcoin-received.herokuapp.com/api/${address}`)
      .then(r => this.setState({ txs: r.data.txs.txs, address }))
      .catch(err => console.log(err));
    //pushing url for current token
    browserHistory.push(`/${address}`);
  }
  getExchangeRates() {
    axios.get('https://bitcoin-received.herokuapp.com/api/rates/all')
      .then(r => this.setState({ rates: r.data.rates }))
      .catch(err => console.log(err));
  }
  transactionHTML(tx, index) {
    //excluding outgoing payments and null transfers
    if (tx.result <= 0) return;
    //itterating through each transactions to render the individual inputs
    return tx.inputs.map((input) => {
      //convert Satoshi to BTC
      let BTC = input.prev_out.value/100000000;
      //converst BTC to USD.  Bracket notation used so this could be generalized
      let USD = BTC * this.state.rates['USD'].last;
      return <tr key={input.script}>
                <td >{input.prev_out.addr}</td>
                <td >{moment(tx.time).format('MMM Do YY, h:mm')}</td>
                <td >{Number(BTC).toLocaleString('en')}</td>
                <td className='USD'>{Number(USD).toLocaleString('en')}</td>
              </tr>
    })
  }
  render() {
    const { txs, address } = this.state;
    let transactions = txs.map((tx, index) => this.transactionHTML(tx, index));
    return (
      <div className="App">

        <Header getTransactions={(e) => this.getTransactions(e)} address={address} />
        <table>
          <tbody>
            <tr>
              <th>From Address</th>
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
