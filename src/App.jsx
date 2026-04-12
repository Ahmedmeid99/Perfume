import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import Home from './pages/Home';
import Process from './pages/Process';
import Essence from './pages/Essence';
import Consultation from './pages/Consultation';
import Sourcing from './pages/Sourcing';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/process" element={<Process />} />
            <Route path="/essence" element={<Essence />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/sourcing" element={<Sourcing />} />
          </Routes>
          <FloatingWidgets />
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
