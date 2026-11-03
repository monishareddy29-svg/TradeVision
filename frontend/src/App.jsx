import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MarketDetective from "./pages/MarketDetective";
import StockAnalysis from "./pages/StockAnalysis";
import NewsSentiment from "./pages/NewsSentiment";
import WhatIfSimulator from "./pages/WhatIfSimulator";
import PaperTrading from "./pages/PaperTrading";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Portfolio from "./pages/Portfolio";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* STOCK ANALYSIS */}
        <Route
          path="/analysis"
          element={<StockAnalysis />}
        />

        {/* MARKET DETECTIVE */}
        <Route
          path="/detective"
          element={<MarketDetective />}
        />

        {/* NEWS & SENTIMENT */}
        <Route
          path="/news"
          element={<NewsSentiment />}
        />

        {/* WHAT-IF SIMULATOR */}
        <Route
          path="/simulator"
          element={<WhatIfSimulator />}
        />

        {/* PAPER TRADING */}
        <Route
          path="/paper-trading"
          element={<PaperTrading />}
        />

        {/* PORTFOLIO */}
        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        {/* AUTHENTICATION */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>
    </>
  );
}

export default App;