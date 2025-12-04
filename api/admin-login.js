export default function handler(req, res) {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
  
    const { username, password } = req.body;
  
    // CHANGE THESE FOR YOUR CUSTOMER:
    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASS || "lenabundles123";
  
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Fake session
      res.setHeader(
        "Set-Cookie",
        `adminSession=active; Path=/; Max-Age=86400; HttpOnly`
      );
      return res.status(200).json({ success: true });
    }
  
    return res.status(401).json({ error: "Invalid credentials" });
  }