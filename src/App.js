import React from 'react';
import logo from './logo.svg';
import Dashboard from './dashboard';
import './App.scss';

function App() {
    return (
	<div className="App">
	  <header className="App-header">
	    <h2> Piconax </h2>
	  </header>
          <p>
            A simple dApp to demonstrate the use of Beacon
            with Galleon
          </p>
          <Dashboard/>
	</div>
    );
}



export default App;
