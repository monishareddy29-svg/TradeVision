import { useState } from "react";

function PaperTrading() {
  const INITIAL_BALANCE = 100000;

  const stockPrices = {
    RELIANCE: 1428.6,
    INFY: 1612.4,
    HDFCBANK: 1745.2,
  };

  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [stock, setStock] = useState("RELIANCE");
  const [quantity, setQuantity] = useState(1);
  const [holdings, setHoldings] = useState([]);
  const [trades, setTrades] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const currentPrice = stockPrices[stock];
  const orderValue = currentPrice * Number(quantity || 0);

  const totalInvested = holdings.reduce(
    (total, item) =>
      total + item.quantity * item.averagePrice,
    0
  );

  const portfolioValue = holdings.reduce(
    (total, item) =>
      total +
      item.quantity * stockPrices[item.symbol],
    0
  );

  const profitLoss =
    portfolioValue - totalInvested;

  const returnPercentage =
    totalInvested > 0
      ? (profitLoss / totalInvested) * 100
      : 0;

  /* =========================
     MESSAGE
  ========================= */

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  /* =========================
     BUY
  ========================= */

  const buyStock = () => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      showMessage(
        "Please enter a valid quantity.",
        "error"
      );
      return;
    }

    const cost = qty * currentPrice;

    if (cost > balance) {
      showMessage(
        "Insufficient virtual balance for this order.",
        "error"
      );
      return;
    }

    setBalance((previous) => previous - cost);

    setHoldings((previous) => {
      const existing = previous.find(
        (item) => item.symbol === stock
      );

      if (existing) {
        const newQuantity =
          existing.quantity + qty;

        const newAveragePrice =
          (
            existing.quantity *
              existing.averagePrice +
            qty * currentPrice
          ) / newQuantity;

        return previous.map((item) =>
          item.symbol === stock
            ? {
                ...item,
                quantity: newQuantity,
                averagePrice: newAveragePrice,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          symbol: stock,
          quantity: qty,
          averagePrice: currentPrice,
        },
      ];
    });

    setTrades((previous) => [
      {
        type: "BUY",
        symbol: stock,
        quantity: qty,
        price: currentPrice,
        value: cost,
        time: new Date().toLocaleTimeString(),
      },
      ...previous,
    ]);

    setQuantity(1);

    showMessage(
      `Bought ${qty} ${stock} share${
        qty > 1 ? "s" : ""
      } successfully.`,
      "success"
    );
  };

  /* =========================
     SELL
  ========================= */

  const sellStock = () => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      showMessage(
        "Please enter a valid quantity.",
        "error"
      );
      return;
    }

    const existing = holdings.find(
      (item) => item.symbol === stock
    );

    if (!existing) {
      showMessage(
        `You do not own any ${stock} shares.`,
        "error"
      );
      return;
    }

    if (existing.quantity < qty) {
      showMessage(
        `You only have ${existing.quantity} ${stock} share${
          existing.quantity > 1 ? "s" : ""
        }.`,
        "error"
      );
      return;
    }

    const revenue = qty * currentPrice;

    setBalance((previous) => previous + revenue);

    setHoldings((previous) =>
      previous
        .map((item) =>
          item.symbol === stock
            ? {
                ...item,
                quantity:
                  item.quantity - qty,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

    setTrades((previous) => [
      {
        type: "SELL",
        symbol: stock,
        quantity: qty,
        price: currentPrice,
        value: revenue,
        time: new Date().toLocaleTimeString(),
      },
      ...previous,
    ]);

    setQuantity(1);

    showMessage(
      `Sold ${qty} ${stock} share${
        qty > 1 ? "s" : ""
      } successfully.`,
      "success"
    );
  };

  /* =========================
     RESET
  ========================= */

  const resetPortfolio = () => {
    const confirmed = window.confirm(
      "Reset your paper trading portfolio? All holdings and trade history will be removed."
    );

    if (!confirmed) return;

    setBalance(INITIAL_BALANCE);
    setHoldings([]);
    setTrades([]);
    setQuantity(1);

    showMessage(
      "Paper trading portfolio has been reset.",
      "success"
    );
  };

  return (
    <main className="paper-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="paper-header">

        <div>

          <span className="paper-label">
            PAPER TRADING
          </span>

          <h1>
            Practice trading.
            <br />
            <span>Risk nothing.</span>
          </h1>

          <p>
            Trade with virtual money, test your
            strategies, and understand your performance
            before entering the real market.
          </p>

        </div>

      </section>


      {/* =========================
          MESSAGE
      ========================= */}

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "13px 16px",
            borderRadius: "10px",
            background:
              messageType === "success"
                ? "#f0fdf4"
                : "#fef2f2",
            border:
              messageType === "success"
                ? "1px solid #bbf7d0"
                : "1px solid #fecaca",
            color:
              messageType === "success"
                ? "#166534"
                : "#b91c1c",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}


      {/* =========================
          SUMMARY
      ========================= */}

      <section className="paper-summary">

        <div className="summary-card">

          <span>
            VIRTUAL BALANCE
          </span>

          <strong>
            ₹
            {balance.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

        </div>


        <div className="summary-card">

          <span>
            PORTFOLIO VALUE
          </span>

          <strong>
            ₹
            {portfolioValue.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

        </div>


        <div className="summary-card">

          <span>
            TOTAL P&L
          </span>

          <strong
            className={
              profitLoss >= 0
                ? "profit"
                : "loss"
            }
          >
            {profitLoss >= 0 ? "+" : ""}
            ₹
            {Math.abs(
              profitLoss
            ).toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            )}
          </strong>

          <small>
            {profitLoss >= 0 ? "+" : ""}
            {returnPercentage.toFixed(2)}%
          </small>

        </div>

      </section>


      {/* =========================
          TRADING AREA
      ========================= */}

      <section className="trading-area">

        {/* ORDER PANEL */}

        <div className="order-card">

          <span className="card-label">
            TRADE ORDER
          </span>

          <h2>
            Place an order
          </h2>


          <div className="order-group">

            <label>
              Stock
            </label>

            <select
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
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


          {/* CURRENT PRICE */}

          <div className="current-price">

            <span>
              Current Price
            </span>

            <strong>
              ₹
              {currentPrice.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          {/* QUANTITY */}

          <div className="order-group">

            <label>
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
            />

          </div>


          {/* QUICK QUANTITY */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "10px",
              flexWrap: "wrap",
            }}
          >

            {[1, 5, 10, 25].map(
              (amount) => (

                <button
                  key={amount}
                  type="button"
                  onClick={() =>
                    setQuantity(amount)
                  }
                  style={{
                    padding: "6px 11px",
                    border:
                      "1px solid #e5e7eb",
                    background: "white",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  {amount}
                </button>

              )
            )}

          </div>


          {/* ORDER TOTAL */}

          <div className="order-total">

            <span>
              Order Value
            </span>

            <strong>
              ₹
              {orderValue.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
            </strong>

          </div>


          {/* TRADE BUTTONS */}

          <div className="trade-buttons">

            <button
              className="buy-button"
              onClick={buyStock}
            >
              BUY
            </button>

            <button
              className="sell-button"
              onClick={sellStock}
            >
              SELL
            </button>

          </div>

        </div>


        {/* HOLDINGS */}

        <div className="holdings-card">

          <div className="holdings-heading">

            <div>

              <span className="card-label">
                YOUR PORTFOLIO
              </span>

              <h2>
                Holdings
              </h2>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >

              <span className="holding-count">
                {holdings.length} stocks
              </span>

              <button
                type="button"
                onClick={resetPortfolio}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  padding: "7px 10px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                Reset
              </button>

            </div>

          </div>


          {holdings.length === 0 ? (

            <div className="empty-holdings">

              <div>
                📊
              </div>

              <h3>
                No holdings yet
              </h3>

              <p>
                Buy your first stock to start
                building your virtual portfolio.
              </p>

            </div>

          ) : (

            <div className="holdings-list">

              {holdings.map((item) => {

                const marketValue =
                  item.quantity *
                  stockPrices[item.symbol];

                const invested =
                  item.quantity *
                  item.averagePrice;

                const pnl =
                  marketValue - invested;

                return (

                  <div
                    className="holding-row"
                    key={item.symbol}
                  >

                    <div className="holding-name">

                      <strong>
                        {item.symbol}
                      </strong>

                      <span>
                        {item.quantity} shares
                      </span>

                    </div>


                    <div>

                      <span>
                        Avg. Price
                      </span>

                      <strong>
                        ₹
                        {item.averagePrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Market Value
                      </span>

                      <strong>
                        ₹
                        {marketValue.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </strong>

                    </div>


                    <div>

                      <span>
                        P&L
                      </span>

                      <strong
                        className={
                          pnl >= 0
                            ? "profit"
                            : "loss"
                        }
                      >
                        {pnl >= 0
                          ? "+"
                          : "-"}
                        ₹
                        {Math.abs(
                          pnl
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </strong>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </div>

      </section>


      {/* =========================
          TRADE HISTORY
      ========================= */}

      <section className="trade-history">

        <div className="history-heading">

          <div>

            <span className="card-label">
              ACTIVITY
            </span>

            <h2>
              Trade History
            </h2>

          </div>

          <span>
            {trades.length} trades
          </span>

        </div>


        {trades.length === 0 ? (

          <div className="empty-history">
            No trades yet. Your activity will
            appear here.
          </div>

        ) : (

          <div className="trade-list">

            {trades.map(
              (trade, index) => (

                <div
                  className="trade-row"
                  key={index}
                >

                  <span
                    className={
                      trade.type === "BUY"
                        ? "trade-buy"
                        : "trade-sell"
                    }
                  >
                    {trade.type}
                  </span>

                  <strong>
                    {trade.symbol}
                  </strong>

                  <span>
                    {trade.quantity} shares
                  </span>

                  <span>
                    ₹
                    {trade.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span>
                    ₹
                    {trade.value.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </span>

                  <span className="trade-time">
                    {trade.time}
                  </span>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* =========================
          NOTE
      ========================= */}

      <section className="paper-note">

        <span>
          TRADEVISION NOTE
        </span>

        <p>
          Paper Trading uses virtual money only.
          No real financial transaction takes place.
          This feature is designed for learning and
          strategy practice.
        </p>

      </section>

    </main>
  );
}

export default PaperTrading;