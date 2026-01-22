# Cloudflare Sentiment Analysis Pipeline

A serverless feedback monitoring system built on the Cloudflare Supercloud. This project uses a microservices architecture to collect, analyze, visualize, and report on user feedback sentiment automatically.

## 📂 Repository Structure

This is a monorepo containing three separate Cloudflare Workers:

* **`/collector`**: A background worker that generates mock user feedback and runs Sentiment Analysis (DistilBERT) before saving to the database. Runs every 30 minutes.
* **`/dashboard`**: A frontend worker that serves a server-side rendered HTML dashboard displaying real-time sentiment trends and logs.
* **`/reporter`**: A scheduled worker that runs daily at 9 AM. It uses LLMs (Llama 3) to summarize negative feedback from the last 24 hours and emails a report.

## 🚀 Tech Stack

* **Runtime:** Cloudflare Workers
* **Database:** Cloudflare D1 (SQLite)
* **AI Models:** Workers AI (@cf/huggingface/distilbert-sst-2-int8, @cf/meta/llama-3-8b-instruct)
* **Email:** Resend API (via fetch)

## 🛠️ How to Deploy

### 1. Setup Database
Create a D1 database in your Cloudflare Dashboard named `feedback-db`.
```bash
npx wrangler d1 create feedback-db

### 2. Connect to Cloudflare
Log in to the Cloudflare Dashboard.

Go to Workers & Pages -> Create Application -> Connect to Git.

Select this repository.

### 3. Deploy Microservices
You must deploy this repo three times (once for each worker), setting the specific Root Directory for each:

App 1 (Collector): Set Root Directory to collector.

App 2 (Dashboard): Set Root Directory to dashboard.

App 3 (Reporter): Set Root Directory to reporter.

### 4. Configure Secrets
For the Reporter worker, go to Settings > Variables in the Cloudflare Dashboard and add:

RESEND_API_KEY: Your email service API key.
