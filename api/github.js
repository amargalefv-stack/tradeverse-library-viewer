export default async function handler(req, res) {
  const token = process.env.TRADEVERSE_GITHUB_TOKEN;
  const owner = "amargalefv-stack";
  const repo = "tradeverse-project-master";
  const branch = "main";
  if (!token) return res.status(500).json({error:"Falta TRADEVERSE_GITHUB_TOKEN a Vercel."});
  const path = req.method === "GET" ? req.query.path : req.body?.path;
  if (!path || path.includes("..")) return res.status(400).json({error:"Path invalid."});
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${req.method==="GET"?"?ref="+encodeURIComponent(branch):""}`;
  const headers = {
    "Accept":"application/vnd.github+json",
    "Authorization":`Bearer ${token}`,
    "X-GitHub-Api-Version":"2022-11-28",
    "User-Agent":"Tradeverse-Central-Editor"
  };
  try {
    if (req.method === "GET") {
      const r = await fetch(url,{headers});
      const data = await r.json();
      return res.status(r.status).json(data);
    }
    if (req.method === "PUT") {
      const {content, sha, message} = req.body || {};
      if (typeof content !== "string" || !message) return res.status(400).json({error:"content i message obligatoris."});
      const r = await fetch(url,{method:"PUT",headers:{"Content-Type":"application/json",...headers},
        body:JSON.stringify({message,content,branch, ...(sha?{sha}:{})})});
      const data = await r.json();
      return res.status(r.status).json(data);
    }
    return res.status(405).json({error:"Method not allowed"});
  } catch(e) {
    return res.status(500).json({error:e.message});
  }
}
