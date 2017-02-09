import React, { Component } from 'react';
import { Link} from 'react-router';

// import './reset.css';
// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedAddress: null,
      data: [1,2,3]
    };
  }
  componentDidMount() {
    console.log(this.props.params.shortid);
  }
  getTransactions(e) {
    e.preventDefault();
    console.log(e.target.address);
  }
  render() {
    let transactions = this.state.data.map(i => <li key={i}>{i}</li>);
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
