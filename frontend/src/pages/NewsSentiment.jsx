import { useState } from "react";

function NewsSentiment() {
  const [stock, setStock] = useState("RELIANCE");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const newsData = {
    RELIANCE: {
      company: "Reliance Industries",
      sentiment: "Positive",
      positive: 78,
      neutral: 18,
      negative: 4,
      summary:
        "The current news environment around Reliance is largely positive, supported by business expansion and improving market expectations.",
      articles: [
        {
          title: "Reliance announces new business expansion plans",
          source: "Business Today",
          time: "2 hours ago",
          sentiment: "Positive Impact",
          description:
            "The announcement has increased investor interest and improved short-term market sentiment.",
          analysis:
            "The expansion announcement may improve investor confidence by highlighting the company's future growth opportunities. TradeVision considers this a positive short-term news signal.",
        },
        {
          title:
            "Reliance shares gain as investors track growth outlook",
          source: "Economic Times",
          time: "5 hours ago",
          sentiment: "Positive Impact",
          description:
            "Market participants are watching the company's growth prospects closely.",
          analysis:
            "The positive movement in the share price combined with investor attention indicates stronger market interest. Continued business performance will be important for maintaining this sentiment.",
        },
        {
          title:
            "Energy sector volatility remains a factor for investors",
          source: "Moneycontrol",
          time: "Yesterday",
          sentiment: "Neutral Impact",
          description:
            "Sector-wide movements could influence short-term price volatility.",
          analysis:
            "Energy-sector volatility can affect Reliance's short-term price movement. This is currently considered a neutral factor rather than a strong positive or negative signal.",
        },
      ],
    },

    INFY: {
      company: "Infosys",
      sentiment: "Positive",
      positive: 69,
      neutral: 24,
      negative: 7,
      summary:
        "Infosys is receiving generally positive coverage, although investors continue to watch technology-sector demand.",
      articles: [
        {
          title:
            "Infosys receives positive outlook from technology sector",
          source: "Business Standard",
          time: "1 hour ago",
          sentiment: "Positive Impact",
          description:
            "Improving technology spending expectations are supporting investor confidence.",
          analysis:
            "Improving technology spending expectations could support future demand for IT services. TradeVision identifies this as a positive sentiment driver for Infosys.",
        },
        {
          title:
            "IT stocks gain as global demand expectations improve",
          source: "CNBC",
          time: "4 hours ago",
          sentiment: "Positive Impact",
          description:
            "The broader IT sector is showing improved market sentiment.",
          analysis:
            "Positive movement across the IT sector can strengthen investor confidence in Infosys. However, broader market conditions should also be monitored.",
        },
        {
          title:
            "Currency movement remains a key factor for IT companies",
          source: "Reuters",
          time: "Yesterday",
          sentiment: "Neutral Impact",
          description:
            "Currency fluctuations may influence near-term results.",
          analysis:
            "Currency fluctuations can influence the financial performance of IT companies. TradeVision currently classifies this as a neutral factor because its impact depends on future currency movements.",
        },
      ],
    },

    HDFCBANK: {
      company: "HDFC Bank",
      sentiment: "Neutral",
      positive: 42,
      neutral: 39,
      negative: 19,
      summary:
        "News sentiment around HDFC Bank is mixed, with positive expectations balanced by concerns around short-term market conditions.",
      articles: [
        {
          title:
            "Banking sector investors monitor changing market conditions",
          source: "Moneycontrol",
          time: "2 hours ago",
          sentiment: "Neutral Impact",
          description:
            "Investors are evaluating the impact of changing financial conditions.",
          analysis:
            "Changing financial conditions may influence banking-sector performance. TradeVision currently considers this a neutral signal because the overall effect remains uncertain.",
        },
        {
          title:
            "HDFC Bank remains in focus among large-cap investors",
          source: "Economic Times",
          time: "6 hours ago",
          sentiment: "Positive Impact",
          description:
            "The bank continues to attract attention from long-term investors.",
          analysis:
            "Continued interest from large-cap investors indicates that HDFC Bank remains an important stock in the banking sector. This provides a positive sentiment contribution.",
        },
        {
          title:
            "Banking stocks experience increased volatility",
          source: "Business Standard",
          time: "Yesterday",
          sentiment: "Negative Impact",
          description:
            "Higher volatility may affect short-term trading decisions.",
          analysis:
            "Higher volatility increases short-term uncertainty and may result in larger price movements. TradeVision therefore treats this as a negative short-term factor.",
        },
      ],
    },
  };

  const currentData = newsData[stock];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setSelectedArticle(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    setAnalyzed(false);
    setSelectedArticle(null);
  };

  return (
    <main className="news-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="news-header">

        <div className="news-heading">

          <span className="news-label">
            NEWS & SENTIMENT ANALYSIS
          </span>

          <h1>
            What's influencing
            <br />
            <span>the market?</span>
          </h1>

          <p>
            TradeVision analyzes financial news and summarizes
            the overall sentiment surrounding a stock.
          </p>

        </div>

        <div className="news-search">

          <label>Select Stock</label>

          <select
            value={stock}
            onChange={handleStockChange}
          >
            <option value="RELIANCE">RELIANCE</option>
            <option value="INFY">INFY</option>
            <option value="HDFCBANK">HDFC BANK</option>
          </select>

          <button
            className="news-analyze-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing
              ? "⏳ Analyzing News..."
              : "✦ Analyze News"}
          </button>

        </div>

      </section>


      {/* =========================
          SENTIMENT OVERVIEW
      ========================= */}

      <section className="sentiment-overview">

        <div className="sentiment-company">

          <span>MARKET SENTIMENT</span>

          <h2>{currentData.company}</h2>

          <div className="sentiment-status">
            ● {currentData.sentiment}
          </div>

          {analyzed && (
            <small style={{ color: "#6b7280" }}>
              ✓ Analysis updated
            </small>
          )}

        </div>


        <div className="sentiment-bars">

          <div className="sentiment-row">

            <div>
              <span>Positive</span>
              <strong>{currentData.positive}%</strong>
            </div>

            <div className="sentiment-progress">
              <div
                className="positive-bar"
                style={{
                  width: `${currentData.positive}%`,
                }}
              ></div>
            </div>

          </div>


          <div className="sentiment-row">

            <div>
              <span>Neutral</span>
              <strong>{currentData.neutral}%</strong>
            </div>

            <div className="sentiment-progress">
              <div
                className="neutral-bar"
                style={{
                  width: `${currentData.neutral}%`,
                }}
              ></div>
            </div>

          </div>


          <div className="sentiment-row">

            <div>
              <span>Negative</span>
              <strong>{currentData.negative}%</strong>
            </div>

            <div className="sentiment-progress">
              <div
                className="negative-bar"
                style={{
                  width: `${currentData.negative}%`,
                }}
              ></div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          NEWS ARTICLES
      ========================= */}

      <section className="news-content">

        <div className="news-content-header">

          <div>
            <span>LATEST COVERAGE</span>
            <h2>What's being reported?</h2>
          </div>

          <span className="article-count">
            {currentData.articles.length} articles
          </span>

        </div>


        <div className="article-list">

          {currentData.articles.map((article, index) => (

            <article
              className="article-card"
              key={index}
            >

              <div className="article-main">

                <div className="article-source">
                  {article.source}
                  <span>•</span>
                  {article.time}
                </div>

                <h3>
                  {article.title}
                </h3>

                <p>
                  {article.description}
                </p>

              </div>


              <div className="article-side">

                <span
                  className={
                    article.sentiment.includes("Negative")
                      ? "article-negative"
                      : article.sentiment.includes("Neutral")
                      ? "article-neutral"
                      : "article-positive"
                  }
                >
                  {article.sentiment}
                </span>

                <button
                  onClick={() =>
                    setSelectedArticle(article)
                  }
                >
                  Read Analysis →
                </button>

              </div>

            </article>

          ))}

        </div>


        {/* =========================
            ARTICLE ANALYSIS PANEL
        ========================= */}

        {selectedArticle && (

          <div
            className="news-analysis-panel"
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
                  TRADEVISION NEWS ANALYSIS
                </span>

                <h2
                  style={{
                    marginTop: "8px",
                    fontSize: "25px",
                  }}
                >
                  {selectedArticle.title}
                </h2>

                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                    marginTop: "8px",
                  }}
                >
                  {selectedArticle.source} •{" "}
                  {selectedArticle.time}
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedArticle(null)
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
                marginTop: "25px",
                paddingTop: "20px",
                borderTop: "1px solid #f1f5f9",
              }}
            >

              <strong>
                TradeVision Interpretation
              </strong>

              <p
                style={{
                  marginTop: "10px",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  fontSize: "14px",
                }}
              >
                {selectedArticle.analysis}
              </p>

            </div>

          </div>

        )}

      </section>


      {/* =========================
          TRADEVISION INTERPRETATION
      ========================= */}

      <section className="news-interpretation">

        <div className="interpretation-card">

          <div className="interpretation-icon">
            ✦
          </div>

          <div>

            <span>
              TRADEVISION INTERPRETATION
            </span>

            <h2>
              What does the news mean?
            </h2>

            <p>
              "{currentData.summary}"
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default NewsSentiment;