export default function handler(req, res) {
    const cookie = req.headers.cookie || "";
    const isLogged = cookie.includes("adminSession=active");
  
    return res.status(200).json({ loggedIn: isLogged });
  }