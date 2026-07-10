import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";
import PerfumeSprayCursor from "./components/PerfumeSprayCursor";
import Home from "./pages/Home";
import Process from "./pages/Process";
import Sourcing from "./pages/Sourcing";
import Perfumes from "./pages/Perfumes";
import Gallery from "./pages/Gallery";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import ChangePassword from "./pages/ChangePassword";
import Favorites from "./pages/Favorites";
import PolicyPage from "./pages/PolicyPage";
import "./App.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <div className="app">
            <PerfumeSprayCursor />
            <Navbar />
            <ScrollToTop />
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
              <Route path="/favorites" element={<Favorites />} />
              <Route
                path="/privacy-policy"
                element={<PolicyPage type="privacy" />}
              />
              <Route
                path="/terms-of-service"
                element={<PolicyPage type="terms" />}
              />
              <Route
                path="/shipping-policy"
                element={<PolicyPage type="shipping" />}
              />
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
