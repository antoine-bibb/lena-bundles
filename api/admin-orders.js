export default function handler(req, res) {
    const cookie = req.headers.cookie || "";
    const auth = cookie.includes(`admin_token=${global.adminSessionToken}`);
  
    if (!auth) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    global.orders = global.orders || [];
  
    return res.status(200).json({ orders: global.orders });
  }