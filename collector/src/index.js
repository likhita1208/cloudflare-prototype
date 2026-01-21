export default {
  // 1. FIX: Add this 'fetch' handler so browser visits work
  async fetch(request, env, ctx) {
    // When you visit the URL, force the generation to run immediately
    await generateMockData(env, 20);
    return new Response("Success! Manually generated 20 mock items.", {
        headers: { "content-type": "text/plain" }
    });
  },

  // 2. The Cron Trigger (Runs automatically)
  async scheduled(event, env, ctx) {
    await generateMockData(env, 20);
    console.log("Cron trigger ran successfully");
  }
};

// --- Shared Logic ---
async function generateMockData(env, count) {
  const sources = ["Twitter", "AppStore", "Reddit", "Support"];
  const subjects = ["The interface", "Loading speed", "Support team", "Pricing", "Docs"];
  const verbs = ["is", "feels", "seems", "remains"];
  const adjPos = ["amazing", "fast", "helpful", "clean"];
  const adjNeg = ["clunky", "slow", "expensive", "confusing"];

  const stmt = env.DB.prepare("INSERT INTO feedback (source, content, sentiment_label, sentiment_score) VALUES (?, ?, ?, ?)");
  const batch = [];

  for (let i = 0; i < count; i++) {
    const isPos = Math.random() > 0.5;
    const text = `The product ${subjects[Math.floor(Math.random() * subjects.length)]} ${verbs[0]} ${isPos ? adjPos[Math.floor(Math.random() * adjPos.length)] : adjNeg[Math.floor(Math.random() * adjNeg.length)]}.`;
    const label = isPos ? "POSITIVE" : "NEGATIVE";
    const score = isPos ? 0.95 : 0.15;
    
    batch.push(stmt.bind(sources[Math.floor(Math.random() * sources.length)], text, label, score));
  }
  
  await env.DB.batch(batch);
}