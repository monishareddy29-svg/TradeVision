import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Signup failed");
      }

      const data = await response.json();

      console.log("Signup successful:", data);

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);

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
              START YOUR JOURNEY
            </span>

            <h1>
              Discover.
              <br />
              <span>Analyze. Trade.</span>
            </h1>

            <p>
              Create your TradeVision account and explore
              intelligent market analysis, simulations,
              and risk-free trading.
            </p>

          </div>

        </div>


        {/* SIGNUP CARD */}

        <div className="auth-card">

          <div className="auth-card-header">

            <h2>
              Create account
            </h2>

            <p>
              Start using TradeVision today
            </p>

          </div>


          <form onSubmit={handleSignup}>

            {/* NAME */}

            <div className="auth-input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>


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

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-input-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
            </button>

          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-signup">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>
    </main>
  );
}

export default Signup;