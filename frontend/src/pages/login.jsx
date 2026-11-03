import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();

      console.log("Login successful:", data);

      // Save logged-in user
      localStorage.setItem(
        "tradevisionUser",
        JSON.stringify(data)
      );

      alert("Login successful!");

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.message || "Unable to connect to the server."
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-info">

          <Link to="/" className="auth-logo">

            <div className="logo-icon">
              T
            </div>

            <span>
              TradeVision
            </span>

          </Link>

          <div className="auth-intro">

            <span className="auth-label">
              INTELLIGENT MARKET ANALYSIS
            </span>

            <h1>
              Understand the market.
              <br />
              <span>Trade smarter.</span>
            </h1>

            <p>
              Discover stocks, analyze market signals,
              simulate investments, and practice trading
              with TradeVision.
            </p>

          </div>

        </div>


        {/* LOGIN CARD */}

        <div className="auth-card">

          <div className="auth-card-header">

            <h2>
              Welcome back
            </h2>

            <p>
              Login to your TradeVision account
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="auth-input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="auth-input-group">

              <div className="password-label">

                <label>
                  Password
                </label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
            >
              Login
            </button>

          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-signup">

            Don't have an account?

            <Link to="/signup">
              Create account
            </Link>

          </p>

        </div>

      </div>
    </main>
  );
}

export default Login;