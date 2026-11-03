import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ Intelligent Market Analysis
          </div>

          <h1>
            See the market.
            <br />
            <span>Think beyond the chart.</span>
          </h1>

          <p>
            TradeVision helps you discover opportunities, understand
            market movements, simulate decisions, and practice trading
            without risking real money.
          </p>

          <div className="hero-actions">

            <Link
              to="/analysis"
              className="primary-btn"
            >
              Explore the Market →
            </Link>

            <Link
              to="/paper-trading"
              className="secondary-btn"
            >
              Try Paper Trading
            </Link>

          </div>

        </div>


        {/* =========================
            STOCK CARD
        ========================= */}

        <div className="hero-visual">

          <div className="analysis-card">

            <div className="card-top">

              <div>
                <span className="stock-name">
                  RELIANCE
                </span>

                <span className="stock-label">
                  NSE
                </span>
              </div>

              <span className="positive">
                +2.84%
              </span>

            </div>


            <div className="price">
              ₹1,428.60
            </div>


            <div className="mini-chart">
              <div className="chart-line"></div>
            </div>


            <div className="score-section">

              <div>

                <span className="small-label">
                  TradeVision Score
                </span>

                <strong>
                  82
                </strong>

                <span>
                  /100
                </span>

              </div>


              <div className="signal">

                <span>
                  ●
                </span>

                Positive Signal

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES SECTION
      ========================= */}

      <section className="feature-section">

        <div className="section-heading">

          <span>
            EXPLORE TRADEVISION
          </span>

          <h2>
            More than a stock dashboard.
          </h2>

          <p>
            Tools designed to help you understand the market,
            not just watch it.
          </p>

        </div>


        <div className="feature-grid">


          {/* =========================
              INTELLIGENT ANALYSIS
          ========================= */}

          <Link
            to="/analysis"
            className="feature-card"
          >

            <div className="feature-icon">
              🧠
            </div>

            <h3>
              Intelligent Analysis
            </h3>

            <p>
              Get a simple TradeVision Score backed by technical
              indicators and market signals.
            </p>

            <span className="feature-link">
              Analyze a stock →
            </span>

          </Link>


          {/* =========================
              MARKET DETECTIVE
          ========================= */}

          <Link
            to="/detective"
            className="feature-card"
          >

            <div className="feature-icon">
              🕵️
            </div>

            <h3>
              Market Detective
            </h3>

            <p>
              Discover unusual volume, sudden movements,
              volatility and emerging market activity.
            </p>

            <span className="feature-link">
              Investigate the market →
            </span>

          </Link>


          {/* =========================
              WHAT-IF SIMULATOR
          ========================= */}

          <Link
            to="/simulator"
            className="feature-card"
          >

            <div className="feature-icon">
              🧪
            </div>

            <h3>
              What-If Simulator
            </h3>

            <p>
              Test hypothetical investments and see how
              different market scenarios could affect your money.
            </p>

            <span className="feature-link">
              Run a simulation →
            </span>

          </Link>


          {/* =========================
              PAPER TRADING
          ========================= */}

          <Link
            to="/paper-trading"
            className="feature-card"
          >

            <div className="feature-icon">
              🎮
            </div>

            <h3>
              Paper Trading
            </h3>

            <p>
              Practice buying and selling with virtual money
              before putting real money at risk.
            </p>

            <span className="feature-link">
              Start practicing →
            </span>

          </Link>


        </div>

      </section>

    </main>
  );
}

export default Home;