import { useState } from "react";

function Portfolio() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedStock, setSelectedStock] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const holdings = [
    {
      symbol: "RELIANCE",
      company: "Reliance Industries",
      quantity: 10,
      avgPrice: 1400,
      currentPrice: 1428.6,
    },
    {
      symbol: "INFY",
      company: "Infosys",
      quantity: 20,
      avgPrice: 1550,
      currentPrice: 1612.4,
    },
    {
      symbol: "HDFCBANK",
      company: "HDFC Bank",
      quantity: 15,
      avgPrice: 1680,
      currentPrice: 1745.2,
    },
  ];

  const calculateHolding = (item) => {
    const invested =
      item.quantity * item.avgPrice;

    const value =
      item.quantity * item.currentPrice;

    const profit = value - invested;

    const returnPercentage =
      invested > 0
        ? (profit / invested) * 100
        : 0;

    return {
      invested,
      value,
      profit,
      returnPercentage,
    };
  };

  const portfolioData = holdings.map(
    (item) => ({
      ...item,
      ...calculateHolding(item),
    })
  );

  const totalInvested =
    portfolioData.reduce(
      (total, item) =>
        total + item.invested,
      0
    );

  const totalValue =
    portfolioData.reduce(
      (total, item) =>
        total + item.value,
      0
    );

  const totalProfit =
    totalValue - totalInvested;

  const totalReturn =
    totalInvested > 0
      ? (totalProfit / totalInvested) * 100
      : 0;


  /* =========================
     PORTFOLIO ALLOCATION
  ========================= */

  const getAllocation = (value) => {
    return totalValue > 0
      ? (value / totalValue) * 100
      : 0;
  };


  /* =========================
     RISK METRICS
  ========================= */

  const riskScore = 48;
  const diversification = 72;
  const volatility = 48;
  const concentration = 35;


  /* =========================
     REFRESH
  ========================= */

  const refreshAnalysis = () => {
    setIsRefreshing(true);
    setRefreshed(false);
    setSelectedStock(null);

    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshed(true);
    }, 1000);
  };


  /* =========================
     SELECT STOCK
  ========================= */

  const handleStockSelect = (item) => {
    setSelectedStock(item);
  };


  return (
    <main className="portfolio-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="portfolio-header">

        <div>

          <span className="portfolio-label">
            PORTFOLIO & RISK ANALYSIS
          </span>

          <h1>
            Understand your
            <br />
            <span>portfolio.</span>
          </h1>

          <p>
            Track your investments, understand your
            performance, and identify the risk within
            your portfolio.
          </p>

        </div>

        <button
          type="button"
          onClick={refreshAnalysis}
          disabled={isRefreshing}
          style={{
            marginTop: "20px",
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#111827",
            color: "white",
            fontWeight: "600",
            cursor: isRefreshing
              ? "wait"
              : "pointer",
          }}
        >
          {isRefreshing
            ? "⏳ Analyzing..."
            : "↻ Refresh Analysis"}
        </button>

      </section>


      {/* =========================
          VIEW SWITCHER
      ========================= */}

      <section
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >

        {["overview", "performance", "risk"].map(
          (view) => (

            <button
              key={view}
              type="button"
              onClick={() =>
                setSelectedView(view)
              }
              style={{
                padding: "9px 16px",
                borderRadius: "8px",
                border:
                  selectedView === view
                    ? "1px solid #111827"
                    : "1px solid #e5e7eb",
                background:
                  selectedView === view
                    ? "#111827"
                    : "white",
                color:
                  selectedView === view
                    ? "white"
                    : "#374151",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {view}
            </button>

          )
        )}

      </section>


      {/* =========================
          SUMMARY
      ========================= */}

      <section className="portfolio-summary">

        <div className="portfolio-stat">

          <span>
            PORTFOLIO VALUE
          </span>

          <strong>
            ₹
            {totalValue.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

        </div>


        <div className="portfolio-stat">

          <span>
            TOTAL INVESTED
          </span>

          <strong>
            ₹
            {totalInvested.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

        </div>


        <div className="portfolio-stat">

          <span>
            TOTAL P&L
          </span>

          <strong
            className={
              totalProfit >= 0
                ? "portfolio-profit"
                : "loss"
            }
          >
            {totalProfit >= 0 ? "+" : "-"}
            ₹
            {Math.abs(
              totalProfit
            ).toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

          <small>
            {totalReturn >= 0 ? "+" : ""}
            {totalReturn.toFixed(2)}%
          </small>

        </div>

      </section>


      {/* =========================
          OVERVIEW
      ========================= */}

      {selectedView === "overview" && (

        <section className="portfolio-content">

          {/* HOLDINGS */}

          <div className="portfolio-holdings">

            <div className="portfolio-section-heading">

              <div>

                <span>
                  YOUR INVESTMENTS
                </span>

                <h2>
                  Holdings
                </h2>

              </div>

              <span className="stock-count">
                {holdings.length} stocks
              </span>

            </div>


            <div className="portfolio-table">

              <div className="portfolio-table-header">

                <span>STOCK</span>
                <span>QTY</span>
                <span>AVG. PRICE</span>
                <span>CURRENT</span>
                <span>P&L</span>

              </div>


              {portfolioData.map(
                (item) => (

                  <div
                    className="portfolio-row"
                    key={item.symbol}
                    onClick={() =>
                      handleStockSelect(item)
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >

                    <div className="portfolio-stock">

                      <strong>
                        {item.symbol}
                      </strong>

                      <span>
                        {item.company}
                      </span>

                    </div>


                    <span>
                      {item.quantity}
                    </span>


                    <span>
                      ₹
                      {item.avgPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>


                    <strong>
                      ₹
                      {item.currentPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>


                    <div className="portfolio-pnl">

                      <strong
                        className={
                          item.profit >= 0
                            ? "portfolio-profit"
                            : "loss"
                        }
                      >
                        {item.profit >= 0
                          ? "+"
                          : "-"}
                        ₹
                        {Math.abs(
                          item.profit
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </strong>

                      <span>
                        {item.returnPercentage >= 0
                          ? "+"
                          : ""}
                        {item.returnPercentage.toFixed(
                          2
                        )}
                        %
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* RISK */}

          <div className="risk-card">

            <span className="risk-label">
              RISK ANALYSIS
            </span>

            <h2>
              Portfolio Risk
            </h2>

            <div className="risk-score">

              <strong>
                {riskScore}
              </strong>

              <span>
                /100
              </span>

            </div>

            <div className="risk-status">
              Medium Risk
            </div>

            <p>
              Your portfolio has a moderate level
              of risk based on diversification,
              volatility, and concentration.
            </p>


            <div className="risk-factors">

              <div>

                <div>
                  <span>
                    Diversification
                  </span>

                  <strong>
                    {diversification}
                  </strong>
                </div>

                <div className="risk-progress">

                  <div
                    style={{
                      width:
                        `${diversification}%`,
                    }}
                  ></div>

                </div>

              </div>


              <div>

                <div>
                  <span>
                    Volatility
                  </span>

                  <strong>
                    {volatility}
                  </strong>
                </div>

                <div className="risk-progress">

                  <div
                    style={{
                      width:
                        `${volatility}%`,
                    }}
                  ></div>

                </div>

              </div>


              <div>

                <div>
                  <span>
                    Concentration
                  </span>

                  <strong>
                    {concentration}
                  </strong>
                </div>

                <div className="risk-progress">

                  <div
                    style={{
                      width:
                        `${concentration}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =========================
          PERFORMANCE
      ========================= */}

      {selectedView === "performance" && (

        <section
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "28px",
          }}
        >

          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              color: "#9ca3af",
            }}
          >
            PERFORMANCE ANALYSIS
          </span>

          <h2>
            Investment Performance
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "18px",
              marginTop: "25px",
            }}
          >

            {portfolioData.map(
              (item) => (

                <div
                  key={item.symbol}
                  style={{
                    padding: "20px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                  }}
                >

                  <strong>
                    {item.symbol}
                  </strong>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    Invested ₹
                    {item.invested.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </p>

                  <h3>
                    {item.returnPercentage >= 0
                      ? "+"
                      : ""}
                    {item.returnPercentage.toFixed(
                      2
                    )}
                    %
                  </h3>

                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                    }}
                  >
                    Current value ₹
                    {item.value.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </span>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* =========================
          RISK VIEW
      ========================= */}

      {selectedView === "risk" && (

        <section
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "28px",
          }}
        >

          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              color: "#9ca3af",
            }}
          >
            RISK BREAKDOWN
          </span>

          <h2>
            Portfolio Risk Profile
          </h2>

          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.7",
              maxWidth: "700px",
            }}
          >
            TradeVision estimates your portfolio risk
            using diversification, volatility and
            concentration indicators.
          </p>

          <div
            style={{
              marginTop: "25px",
              display: "grid",
              gap: "18px",
            }}
          >

            {[
              [
                "Diversification",
                diversification,
                "Higher values indicate broader exposure across holdings.",
              ],
              [
                "Volatility",
                volatility,
                "Higher values indicate greater sensitivity to price movements.",
              ],
              [
                "Concentration",
                concentration,
                "Higher values indicate greater dependence on fewer holdings.",
              ],
            ].map(
              ([name, value, description]) => (

                <div
                  key={name}
                  style={{
                    padding: "18px",
                    border:
                      "1px solid #eef2f7",
                    borderRadius: "12px",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >

                    <strong>
                      {name}
                    </strong>

                    <strong>
                      {value}/100
                    </strong>

                  </div>

                  <div
                    style={{
                      height: "8px",
                      background: "#f1f5f9",
                      borderRadius: "10px",
                      marginTop: "10px",
                      overflow: "hidden",
                    }}
                  >

                    <div
                      style={{
                        width:
                          `${value}%`,
                        height: "100%",
                        background:
                          "#111827",
                      }}
                    ></div>

                  </div>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#6b7280",
                      fontSize: "12px",
                    }}
                  >
                    {description}
                  </p>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* =========================
          SELECTED STOCK
      ========================= */}

      {selectedStock && (

        <section
          style={{
            marginTop: "25px",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "25px",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
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
                HOLDING DETAILS
              </span>

              <h2>
                {selectedStock.symbol}
              </h2>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                {selectedStock.company}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedStock(null)
              }
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
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >

            <div>
              <span>Quantity</span>
              <strong>
                {selectedStock.quantity}
              </strong>
            </div>

            <div>
              <span>Avg. Price</span>
              <strong>
                ₹
                {selectedStock.avgPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div>
              <span>Current Value</span>
              <strong>
                ₹
                {selectedStock.value.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </strong>
            </div>

            <div>
              <span>Return</span>
              <strong>
                {selectedStock.returnPercentage >= 0
                  ? "+"
                  : ""}
                {selectedStock.returnPercentage.toFixed(
                  2
                )}
                %
              </strong>
            </div>

          </div>

        </section>

      )}


      {/* =========================
          INSIGHTS
      ========================= */}

      <section className="portfolio-insights">

        <div className="insights-heading">

          <span>
            TRADEVISION INSIGHTS
          </span>

          <h2>
            What should you know?
          </h2>

        </div>


        <div className="insight-grid">

          <div className="insight-card">

            <div className="insight-number">
              01
            </div>

            <h3>
              Diversification
            </h3>

            <p>
              Your investments are spread across
              multiple large-cap stocks, reducing
              dependence on a single company.
            </p>

          </div>


          <div className="insight-card">

            <div className="insight-number">
              02
            </div>

            <h3>
              Performance
            </h3>

            <p>
              Your portfolio is currently showing
              positive returns compared with the
              total amount invested.
            </p>

          </div>


          <div className="insight-card">

            <div className="insight-number">
              03
            </div>

            <h3>
              Risk Awareness
            </h3>

            <p>
              Medium portfolio risk suggests that
              market movements can have a noticeable
              impact on your returns.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          REFRESH STATUS
      ========================= */}

      {refreshed && (

        <div
          style={{
            marginTop: "20px",
            padding: "12px 15px",
            background: "#f0fdf4",
            border:
              "1px solid #bbf7d0",
            borderRadius: "10px",
            color: "#166534",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          ✓ Portfolio analysis refreshed successfully.
        </div>

      )}


      {/* =========================
          DISCLAIMER
      ========================= */}

      <section className="portfolio-note">

        <span>
          TRADEVISION NOTE
        </span>

        <p>
          Portfolio risk indicators are simulated
          for demonstration purposes. They are not
          financial advice or a guarantee of future
          performance.
        </p>

      </section>

    </main>
  );
}

export default Portfolio;