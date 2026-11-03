import { useState } from "react";

function WhatIfSimulator() {
  const stockPrices = {
    RELIANCE: 1428.6,
    INFY: 1612.4,
    HDFCBANK: 1745.2,
  };

  const [stock, setStock] = useState("RELIANCE");
  const [investment, setInvestment] = useState(50000);
  const [buyPrice, setBuyPrice] = useState(1428.6);
  const [targetPrice, setTargetPrice] = useState(1600);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulated, setSimulated] = useState(false);

  const safeInvestment = Number(investment) || 0;
  const safeBuyPrice = Number(buyPrice) || 0;
  const safeTargetPrice = Number(targetPrice) || 0;

  const shares =
    safeBuyPrice > 0
      ? safeInvestment / safeBuyPrice
      : 0;

  const potentialValue =
    shares * safeTargetPrice;

  const profit =
    potentialValue - safeInvestment;

  const returnPercentage =
    safeInvestment > 0
      ? (profit / safeInvestment) * 100
      : 0;

  const bearPrice =
    safeBuyPrice * 0.91;

  const basePrice =
    safeBuyPrice * 1.05;

  const bullPrice =
    safeBuyPrice * 1.12;

  const calculateScenario = (price) => {
    const value = shares * price;
    const scenarioProfit =
      value - safeInvestment;

    return {
      value,
      profit: scenarioProfit,
      percentage:
        safeInvestment > 0
          ? (scenarioProfit / safeInvestment) * 100
          : 0,
    };
  };

  const bear = calculateScenario(bearPrice);
  const base = calculateScenario(basePrice);
  const bull = calculateScenario(bullPrice);

  const handleStockChange = (e) => {
    const selectedStock = e.target.value;

    setStock(selectedStock);

    const currentPrice =
      stockPrices[selectedStock];

    setBuyPrice(currentPrice);
    setSimulated(false);
  };

  const handleSimulation = () => {
    if (
      safeInvestment <= 0 ||
      safeBuyPrice <= 0 ||
      safeTargetPrice <= 0
    ) {
      alert(
        "Please enter valid investment and price values."
      );
      return;
    }

    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulated(true);
    }, 800);
  };

  const setTargetPercentage = (percentage) => {
    if (safeBuyPrice <= 0) return;

    const newTarget =
      safeBuyPrice * (1 + percentage / 100);

    setTargetPrice(
      Number(newTarget.toFixed(2))
    );

    setSimulated(false);
  };

  return (
    <main className="simulator-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="simulator-header">

        <div className="simulator-heading">

          <span className="simulator-label">
            WHAT-IF SIMULATOR
          </span>

          <h1>
            What if you
            <br />
            <span>invested?</span>
          </h1>

          <p>
            Explore hypothetical investment scenarios
            and see how different stock prices could
            affect your money.
          </p>

        </div>

      </section>


      {/* =========================
          SIMULATOR
      ========================= */}

      <section className="simulator-section">

        {/* INPUT CARD */}

        <div className="simulator-input-card">

          <div className="simulator-card-title">

            <span>
              SIMULATION INPUT
            </span>

            <h2>
              Build your scenario
            </h2>

          </div>


          {/* STOCK */}

          <div className="input-group">

            <label>
              Stock
            </label>

            <select
              value={stock}
              onChange={handleStockChange}
            >

              <option value="RELIANCE">
                RELIANCE
              </option>

              <option value="INFY">
                INFY
              </option>

              <option value="HDFCBANK">
                HDFC BANK
              </option>

            </select>

          </div>


          {/* INVESTMENT */}

          <div className="input-group">

            <label>
              Investment Amount
            </label>

            <div className="input-with-symbol">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={investment}
                min="1000"
                onChange={(e) =>
                  setInvestment(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>


          {/* BUY PRICE */}

          <div className="input-group">

            <label>
              Buy Price
            </label>

            <div className="input-with-symbol">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={buyPrice}
                min="1"
                step="0.01"
                onChange={(e) =>
                  setBuyPrice(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>


          {/* TARGET */}

          <div className="input-group">

            <label>
              If price reaches
            </label>

            <div className="input-with-symbol">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={targetPrice}
                min="1"
                step="0.01"
                onChange={(e) =>
                  setTargetPrice(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>


          {/* QUICK TARGETS */}

          <div
            style={{
              marginTop: "12px",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: "700",
                color: "#9ca3af",
                marginBottom: "8px",
              }}
            >
              QUICK TARGET
            </span>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >

              <button
                type="button"
                onClick={() =>
                  setTargetPercentage(5)
                }
                style={{
                  padding: "7px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                +5%
              </button>

              <button
                type="button"
                onClick={() =>
                  setTargetPercentage(10)
                }
                style={{
                  padding: "7px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                +10%
              </button>

              <button
                type="button"
                onClick={() =>
                  setTargetPercentage(20)
                }
                style={{
                  padding: "7px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                +20%
              </button>

            </div>

          </div>


          {/* SHARES */}

          <div className="shares-info">

            <span>
              Estimated shares
            </span>

            <strong>
              {shares.toFixed(2)}
            </strong>

          </div>


          {/* SIMULATE BUTTON */}

          <button
            type="button"
            onClick={handleSimulation}
            disabled={isSimulating}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "13px",
              border: "none",
              borderRadius: "10px",
              background: "#111827",
              color: "white",
              fontWeight: "600",
              cursor: isSimulating
                ? "wait"
                : "pointer",
            }}
          >
            {isSimulating
              ? "⏳ Running Simulation..."
              : "Run Simulation →"}
          </button>

        </div>


        {/* RESULT CARD */}

        <div className="simulation-result">

          <span className="result-label">
            SIMULATION RESULT
          </span>

          <h2>
            If {stock} reaches ₹
            {safeTargetPrice.toLocaleString(
              "en-IN"
            )}
          </h2>


          <div className="result-main">

            <span>
              Potential Portfolio Value
            </span>

            <strong>
              ₹
              {potentialValue.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </strong>

          </div>


          <div className="result-divider"></div>


          <div className="result-metrics">

            <div>

              <span>
                Investment
              </span>

              <strong>
                ₹
                {safeInvestment.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div>

              <span>
                Potential Profit
              </span>

              <strong
                className={
                  profit >= 0
                    ? "profit-value"
                    : "loss-value"
                }
              >
                {profit >= 0
                  ? "+₹"
                  : "-₹"}

                {Math.abs(
                  profit
                ).toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}

              </strong>

            </div>


            <div>

              <span>
                Return
              </span>

              <strong
                className={
                  returnPercentage >= 0
                    ? "profit-value"
                    : "loss-value"
                }
              >
                {returnPercentage >= 0
                  ? "+"
                  : ""}

                {returnPercentage.toFixed(2)}%

              </strong>

            </div>

          </div>


          {simulated && (

            <div
              style={{
                marginTop: "22px",
                padding: "12px 14px",
                background: "#f8fafc",
                borderRadius: "10px",
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              ✓ Simulation completed using
              your selected assumptions.
            </div>

          )}

        </div>

      </section>


      {/* =========================
          SCENARIOS
      ========================= */}

      <section className="scenario-section">

        <div className="scenario-heading">

          <span>
            SCENARIO ANALYSIS
          </span>

          <h2>
            What could happen?
          </h2>

          <p>
            Compare different possible price
            outcomes for your investment.
          </p>

        </div>


        <div className="scenario-grid">

          {/* BEAR */}

          <div className="whatif-card">

            <div className="scenario-top">

              <span>
                BEAR CASE
              </span>

              <span className="scenario-tag">
                -9%
              </span>

            </div>

            <strong>
              ₹
              {bearPrice.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </strong>

            <div className="scenario-line"></div>

            <div className="scenario-result">

              <span>
                Portfolio Value
              </span>

              <strong>
                ₹
                {bear.value.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </strong>

            </div>

            <div className="scenario-result">

              <span>
                Return
              </span>

              <strong>
                {bear.percentage.toFixed(2)}%
              </strong>

            </div>

          </div>


          {/* BASE */}

          <div className="whatif-card">

            <div className="scenario-top">

              <span>
                BASE CASE
              </span>

              <span className="scenario-tag">
                +5%
              </span>

            </div>

            <strong>
              ₹
              {basePrice.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </strong>

            <div className="scenario-line"></div>

            <div className="scenario-result">

              <span>
                Portfolio Value
              </span>

              <strong>
                ₹
                {base.value.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </strong>

            </div>

            <div className="scenario-result">

              <span>
                Return
              </span>

              <strong>
                +
                {base.percentage.toFixed(2)}%
              </strong>

            </div>

          </div>


          {/* BULL */}

          <div className="whatif-card">

            <div className="scenario-top">

              <span>
                BULL CASE
              </span>

              <span className="scenario-tag">
                +12%
              </span>

            </div>

            <strong>
              ₹
              {bullPrice.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </strong>

            <div className="scenario-line"></div>

            <div className="scenario-result">

              <span>
                Portfolio Value
              </span>

              <strong>
                ₹
                {bull.value.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </strong>

            </div>

            <div className="scenario-result">

              <span>
                Return
              </span>

              <strong>
                +
                {bull.percentage.toFixed(2)}%
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          DISCLAIMER
      ========================= */}

      <section className="simulator-note">

        <span>
          TRADEVISION NOTE
        </span>

        <p>
          This simulation is hypothetical and does
          not represent a prediction or guarantee
          of future market performance. Actual
          returns may differ significantly.
        </p>

      </section>

    </main>
  );
}

export default WhatIfSimulator;