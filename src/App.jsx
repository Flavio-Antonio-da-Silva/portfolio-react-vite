import { useState } from 'react';
import './App.css';

// Caminhos de importação CORRETOS
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Projects from './assets/components/Projects';
import Contacts from './assets/components/Contactos';

function App() {
  return (
    <div className="bg-gray-200">   
      <Navbar />
      <AboutMe />
      <Projects />
      <Contacts />
    </div>
  );
}

export default App;