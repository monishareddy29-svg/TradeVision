import { useState } from "react";

function MarketDetective() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const stocks = [
    {
      name: "RELIANCE",
      price: "₹1,428.60",
      change: "+3.24%",
      type: "Volume Spike",
      volume: "2.4×",
      momentum: "Strong",
      score: 82,
      reason:
        "Trading volume is significantly above its recent average, suggesting increased investor activity.",
      insight:
        "The combination of high volume and strong momentum suggests that RELIANCE is currently attracting strong market attention.",
    },
    {
      name: "INFY",
      price: "₹1,612.40",
      change: "+2.18%",
      type: "Strong Momentum",
      volume: "1.8×",
      momentum: "Very Strong",
      score: 78,
      reason:
        "INFY is showing stronger upward momentum than its recent market behavior.",
      insight:
        "Strong momentum combined with healthy trading activity indicates that INFY is currently showing positive market strength.",
    },
    {
      name: "HDFC BANK",
      price: "₹1,745.20",
      change: "-2.41%",
      type: "High Volatility",
      volume: "2.1×",
      momentum: "Weak",
      score: 61,
      reason:
        "Price movement and trading activity are considerably higher than normal, indicating increased volatility.",
      insight:
        "HDFC BANK requires caution because weaker momentum combined with high volatility can result in larger short-term price movements.",
    },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setSelectedStock(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
    }, 1500);
  };

  const handleInvestigate = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <main className="detective-page">

      {/* =========================
          DETECTIVE HERO
      ========================= */}

      <section className="detective-hero">

        <div>

          <div className="detective-badge">
            ✦ MARKET INTELLIGENCE
          </div>

          <h1>
            What is happening
            <br />
            <span>in the market?</span>
          </h1>

          <p>
            Let TradeVision scan the market and uncover unusual
            activity, momentum shifts, volume spikes and potential
            market signals.
          </p>

          <button
            className="scan-btn"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning
              ? "⏳ Scanning Market..."
              : "🔍 Scan Today's Market"}
          </button>

        </div>


        {/* =========================
            SCAN STATUS
        ========================= */}

        <div className="scan-status">

          <div className="radar-circle">

            <span>
              {isScanning ? "..." : "SCAN"}
            </span>

          </div>

          <div>

            <strong>
              {isScanning
                ? "Scanning Market"
                : scanned
                ? "Market Scan Complete"
                : "Market Scan Ready"}
            </strong>

            <p>
              {isScanning
                ? "Analyzing unusual market activity..."
                : scanned
                ? "Unusual activity has been detected."
                : "Detect unusual activity across the market."}
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          DETECTED RESULTS
      ========================= */}

      <section className="detective-results">

        <div className="results-header">

          <div>

            <span>
              DETECTED ACTIVITY
            </span>

            <h2>
              Market Signals
            </h2>

          </div>

          <div className="result-count">
            {scanned
              ? `${stocks.length} signals detected`
              : "Ready to scan"}
          </div>

        </div>


        <div className="signal-grid">

          {stocks.map((stock) => (

            <div
              className="signal-card"
              key={stock.name}
            >

              {/* STOCK HEADER */}

              <div className="signal-card-top">

                <div>

                  <h3>
                    {stock.name}
                  </h3>

                  <span>
                    {stock.price}
                  </span>

                </div>

                <strong
                  className={
                    stock.change.startsWith("-")
                      ? "negative-change"
                      : "positive-change"
                  }
                >
                  {stock.change}
                </strong>

              </div>


              {/* SIGNAL TYPE */}

              <div className="activity-tag">
                ⚡ {stock.type}
              </div>


              {/* DETAILS */}

              <div className="signal-details">

                <div>

                  <span>
                    Volume
                  </span>

                  <strong>
                    {stock.volume}
                  </strong>

                </div>

                <div>

                  <span>
                    Momentum
                  </span>

                  <strong>
                    {stock.momentum}
                  </strong>

                </div>

                <div>

                  <span>
                    TV Score
                  </span>

                  <strong>
                    {stock.score}/100
                  </strong>

                </div>

              </div>


              {/* WHY DETECTED */}

              <div className="why-detected">

                <span>
                  WHY DETECTED?
                </span>

                <p>
                  {stock.reason}
                </p>

              </div>


              {/* INVESTIGATE */}

              <button
                className="investigate-btn"
                onClick={() => handleInvestigate(stock)}
              >
                Investigate →
              </button>

            </div>

          ))}

        </div>


        {/* =========================
            INVESTIGATION PANEL
        ========================= */}

        {selectedStock && (

          <div
            className="investigation-panel"
            style={{
              marginTop: "30px",
              padding: "30px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >

              <div>

                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "1.5px",
                  }}
                >
                  INVESTIGATION REPORT
                </span>

                <h2
                  style={{
                    marginTop: "8px",
                    fontSize: "28px",
                  }}
                >
                  {selectedStock.name}
                </h2>

              </div>


              <button
                onClick={() => setSelectedStock(null)}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

            </div>


            <div
              style={{
                marginTop: "25px",
                paddingTop: "20px",
                borderTop: "1px solid #f1f5f9",
              }}
            >

              <strong>
                TradeVision Insight
              </strong>

              <p
                style={{
                  marginTop: "10px",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  fontSize: "14px",
                }}
              >
                {selectedStock.insight}
              </p>

            </div>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: "15px",
                marginTop: "25px",
              }}
            >

              <div>
                <span
                  style={{
                    display: "block",
                    color: "#9ca3af",
                    fontSize: "11px",
                  }}
                >
                  PRICE
                </span>

                <strong>
                  {selectedStock.price}
                </strong>
              </div>


              <div>
                <span
                  style={{
                    display: "block",
                    color: "#9ca3af",
                    fontSize: "11px",
                  }}
                >
                  SIGNAL
                </span>

                <strong>
                  {selectedStock.type}
                </strong>
              </div>


              <div>
                <span
                  style={{
                    display: "block",
                    color: "#9ca3af",
                    fontSize: "11px",
                  }}
                >
                  TV SCORE
                </span>

                <strong>
                  {selectedStock.score}/100
                </strong>
              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}

export default MarketDetective;