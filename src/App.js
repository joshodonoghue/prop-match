import React from 'react';
import './App.css';
import Header from './Header';
import About from './About';
// Import other components in a similar way

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      {/* Include other components here */}
    </div>
  );
}

export default App;
