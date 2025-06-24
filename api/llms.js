export default async function handler(req, res) {
  try {
    const response = await fetch("https://huggingface.co/datasets/open-llm-leaderboard/contents?format=json");
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from upstream" });
    }
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Fetch failed", details: String(err) });
  }
}
