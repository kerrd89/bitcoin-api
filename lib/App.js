import React, { Component } from 'react';
import { Link} from 'react-router';

// import './reset.css';
// import './App.css';

class App extends Component {
  componentDidMount() {
    console.log(this.props.params.shortid);
  }

  render() {
    return (
      <div className="App">
        <h2>How about this?</h2>
      </div>
    );
  }
}

export default App;
