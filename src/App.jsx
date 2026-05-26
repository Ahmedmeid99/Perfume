import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import PerfumeSprayCursor from './components/PerfumeSprayCursor';
import Home from './pages/Home';
import Process from './pages/Process';
import Sourcing from './pages/Sourcing';
import Perfumes from './pages/Perfumes';
import Gallery from './pages/Gallery';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';
import ChangePassword from './pages/ChangePassword';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <div className="app">
            <PerfumeSprayCursor />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/process" element={<Process />} />
              <Route path="/perfumes" element={<Perfumes />} />
              <Route path="/sourcing" element={<Sourcing />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <FloatingWidgets />
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
