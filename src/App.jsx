import { useState } from 'react';
import './App.css';

// Caminhos de importação CORRETOS
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Projects from './assets/components/Projects';

function App() {
  return (
    <>    
    <h1 className='text-yellow-500'>Hello, mundo!</h1>
      <Navbar />
      <AboutMe />
      <Projects />
    </>
  );
}

export default App;