const API_BASE = "https://api.football-data.org/v4";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pathSegments = req.query.path;
  if (!pathSegments?.length) {
    return res.status(400).json({ error: "Missing API path" });
  }

  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "FOOTBALL_API_KEY is not configured" });
  }

  const apiPath = pathSegments.join("/");
  const query = new URL(req.url, "http://localhost").searchParams;
  query.delete("path");
  const queryString = query.toString();
  const targetUrl = `${API_BASE}/${apiPath}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    });

    const body = await response.text();
    res.status(response.status);
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json"
    );
    return res.send(body);
  } catch (error) {
    console.error("Football API proxy error:", error);
    return res.status(502).json({ error: "Failed to reach football API" });
  }
}
