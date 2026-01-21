DROP TABLE IF EXISTS feedback;
CREATE TABLE feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT,
  content TEXT,
  sentiment_label TEXT,
  sentiment_score REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add an index to make filtering fast when you have 1000+ rows
CREATE INDEX idx_sentiment ON feedback(sentiment_label);
CREATE INDEX idx_date ON feedback(created_at);