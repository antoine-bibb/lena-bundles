import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.body;

  try {
    const filePath = path.join(process.cwd(), "api", "_orders.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    let orders = JSON.parse(fileData);

    orders = orders.filter(o => o.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Failed to delete order" });
  }
}