import React, { Component } from 'react';
import { Link} from 'react-router';
import axios from 'axios';

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
  componentDidMount() {
    console.log(this.props.params.shortid);
  }
  getTransactions(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/${e.target.address.value}`)
      .then(r => this.setState({ txs: r.data.data.txs }))
      .catch(err => console.log(err));
  }
  render() {
    const { txs } = this.state;
    let transactions = txs.map(tx => <li key={tx.tx_index}>{tx.hash}</li>);
    return (
      <div className="App">
        <form name='enter-address' onSubmit={(e)=>this.getTransactions(e)}>
          <input placeholder="Enter Address" name="address"/>
          <button type='submit'>
            Submit
          </button>
        </form>
        <ul>
          {transactions}
        </ul>
      </div>
    );
  }
}

export default App;
