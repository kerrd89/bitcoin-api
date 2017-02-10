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
    axios.get('https://blockchain.info/ticker')
      .then(r => this.setState({ rates: r.data }))
      .catch(err => console.log(err));
  }
  getTransactions(e) {
    e.preventDefault();
    let address = e.target.address.value;
    axios.get(`http://localhost:3000/api/${address}`)
      .then(r => this.setState({ txs: r.data.data.txs, address }))
      .catch(err => console.log(err));
    e.target.address.value = null;
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
