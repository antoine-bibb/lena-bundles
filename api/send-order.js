export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { customerName, customerEmail, customerPhone, items, total } = req.body;

  if (!customerName || !customerEmail) {
    return res.status(400).json({ error: "Name and email required" });
  }

  global.orders = global.orders || [];

  const newOrder = {
    id: global.orders.length + 1,
    customerName,
    customerEmail,
    customerPhone,
    items,
    total,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  global.orders.push(newOrder);

  return res.status(200).json({ success: true, order: newOrder });
}