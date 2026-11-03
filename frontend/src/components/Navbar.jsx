import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      {/* LOGO */}

      <Link to="/" className="logo">
        <div className="logo-icon">
          T
        </div>

        <span>
          TradeVision
        </span>
      </Link>


      {/* NAVIGATION */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/analysis">
          Stock Analysis
        </Link>

        <Link to="/detective">
          Market Detective
        </Link>

        <Link to="/news">
          News & Sentiment
        </Link>

        <Link to="/simulator">
          What-If Simulator
        </Link>

        <Link to="/paper-trading">
          Paper Trading
        </Link>

        <Link to="/portfolio">
          Portfolio
        </Link>

      </div>


      {/* AUTH BUTTONS */}

      <div className="navbar-actions">

        <Link
          to="/login"
          className="login-btn"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="signup-btn"
        >
          Get Started
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;