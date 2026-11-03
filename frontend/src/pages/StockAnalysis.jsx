import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function StockAnalysis() {

  const [stock, setStock] = useState("RELIANCE");

  // Backend stock data
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/stocks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      });
  }, []);

  const stockData = {

    RELIANCE: {
      name: "Reliance Industries",
      symbol: "RELIANCE",
      exchange: "NSE",
      price: "₹1,428.60",
      change: "+3.24%",
      score: 82,
      signal: "Positive Signal",
      momentum: 82,
      volume: 91,
      technical: 84,
      volatility: 62,
      entry: "₹1,420",
      target: "₹1,485",
      risk: "Medium",

      reasons: [
        "Strong short-term buying momentum is supporting the current market signal.",
        "Trading volume is above its recent average, indicating increased market activity.",
        "Technical indicators are showing a generally positive market structure.",
        "Moderate volatility should still be considered before making a trading decision.",
      ],
    },

    INFY: {
      name: "Infosys",
      symbol: "INFY",
      exchange: "NSE",
      price: "₹1,612.40",
      change: "+2.18%",
      score: 78,
      signal: "Positive Signal",
      momentum: 86,
      volume: 76,
      technical: 81,
      volatility: 58,
      entry: "₹1,605",
      target: "₹1,675",
      risk: "Medium",

      reasons: [
        "Strong momentum indicates that buying interest is currently supporting the stock.",
        "Trading activity remains healthy and shows continued investor participation.",
        "Technical strength suggests that the stock is maintaining a favorable structure.",
        "Volatility is relatively controlled, although market conditions can still change quickly.",
      ],
    },

    HDFCBANK: {
      name: "HDFC Bank",
      symbol: "HDFCBANK",
      exchange: "NSE",
      price: "₹1,745.20",
      change: "-2.41%",
      score: 61,
      signal: "Cautious Signal",
      momentum: 54,
      volume: 73,
      technical: 62,
      volatility: 78,
      entry: "₹1,735",
      target: "₹1,790",
      risk: "High",

      reasons: [
        "Momentum is weaker, suggesting that short-term buying pressure has reduced.",
        "Trading volume remains active, but higher activity does not necessarily indicate buying strength.",
        "Technical indicators show a mixed structure and require additional confirmation.",
        "Higher volatility increases the risk of larger price movements.",
      ],
    },

  };

  const currentStock = stockData[stock];

  return (
    <main className="analysis-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="analysis-header">

        <div className="analysis-heading">

          <span className="analysis-label">
            INTELLIGENT STOCK ANALYSIS
          </span>

          <h1>
            Understand the stock.
            <br />
            <span>Beyond the numbers.</span>
          </h1>

          <p>
            TradeVision combines market signals and technical
            indicators to give you a simple explanation of what
            may be happening with a stock.
          </p>

        </div>


        {/* =========================
            STOCK SEARCH
        ========================= */}

        <div className="stock-search">

          <label>
            Search Stock
          </label>

          {loading ? (
            <p>Loading stocks...</p>
          ) : (
            <select
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            >

              {stocks.map((item) => (
                <option
                  key={item.symbol}
                  value={item.symbol}
                >
                  {item.symbol}
                </option>
              ))}

            </select>
          )}

        </div>

      </section>


      {/* =========================
          STOCK OVERVIEW
      ========================= */}

      <section className="stock-overview">

        <div className="stock-info">

          <div className="stock-symbol">
            {currentStock.symbol}
          </div>

          <div>

            <h2>
              {currentStock.name}
            </h2>

            <span>
              {currentStock.exchange} · Market Analysis
            </span>

          </div>

        </div>


        <div className="stock-price">

          <strong>
            {currentStock.price}
          </strong>

          <span className="stock-change">
            {currentStock.change}
          </span>

        </div>

      </section>


      {/* =========================
          TRADEVISION SCORE
      ========================= */}

      <section className="score-layout">

        <div className="score-card">

          <span className="score-title">
            TRADEVISION SCORE
          </span>

          <div className="score-number">

            {currentStock.score}

            <span>
              /100
            </span>

          </div>

          <div className="score-signal">
            ● {currentStock.signal}
          </div>

          <p>
            Based on momentum, volume activity, technical
            strength and volatility.
          </p>

        </div>


        {/* =========================
            ANALYSIS FACTORS
        ========================= */}

        <div className="factors-card">

          <div className="card-heading">

            <div>

              <span>
                ANALYSIS FACTORS
              </span>

              <h3>
                What affects the score?
              </h3>

            </div>

          </div>


          {/* MOMENTUM */}

          <div className="factor">

            <div className="factor-top">

              <span>
                Momentum
              </span>

              <strong>
                {currentStock.momentum}%
              </strong>

            </div>

            <div className="progress">

              <div
                style={{
                  width: `${currentStock.momentum}%`,
                }}
              ></div>

            </div>

          </div>


          {/* VOLUME */}

          <div className="factor">

            <div className="factor-top">

              <span>
                Volume Activity
              </span>

              <strong>
                {currentStock.volume}%
              </strong>

            </div>

            <div className="progress">

              <div
                style={{
                  width: `${currentStock.volume}%`,
                }}
              ></div>

            </div>

          </div>


          {/* TECHNICAL */}

          <div className="factor">

            <div className="factor-top">

              <span>
                Technical Strength
              </span>

              <strong>
                {currentStock.technical}%
              </strong>

            </div>

            <div className="progress">

              <div
                style={{
                  width: `${currentStock.technical}%`,
                }}
              ></div>

            </div>

          </div>


          {/* VOLATILITY */}

          <div className="factor">

            <div className="factor-top">

              <span>
                Volatility
              </span>

              <strong>
                {currentStock.volatility}%
              </strong>

            </div>

            <div className="progress">

              <div
                style={{
                  width: `${currentStock.volatility}%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          EXPLANATION
      ========================= */}

      <section className="explanation-section">

        <div className="explanation-card">

          <span>
            WHY THIS SCORE?
          </span>

          <h2>
            TradeVision's interpretation
          </h2>


          <div className="reason-list">

            {currentStock.reasons.map((reason, index) => (

              <div key={index}>

                <span>
                  {index === 3 ? "!" : "✓"}
                </span>

                <p>
                  {reason}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* =========================
            TRADE SCENARIO
        ========================= */}

        <div className="scenario-card">

          <span>
            TRADE SCENARIO
          </span>

          <h2>
            Possible market levels
          </h2>


          <div className="scenario-row">

            <span>
              Potential Entry
            </span>

            <strong>
              {currentStock.entry}
            </strong>

          </div>


          <div className="scenario-row">

            <span>
              Possible Target
            </span>

            <strong>
              {currentStock.target}
            </strong>

          </div>


          <div className="scenario-row">

            <span>
              Risk Level
            </span>

            <strong>
              {currentStock.risk}
            </strong>

          </div>


          {/* =========================
              ACTION BUTTONS
          ========================= */}

          <div className="analysis-actions">

            <Link
              to="/simulator"
              className="analysis-action-link"
            >
              🧪 What-If Simulator
            </Link>

            <Link
              to="/paper-trading"
              className="analysis-action-link"
            >
              🎮 Paper Trade
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default StockAnalysis;