import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "api", "_orders.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const orders = JSON.parse(fileData);

    return res.status(200).json({ orders });

  } catch (err) {
    return res.status(500).json({ error: "Failed to load orders" });
  }
}