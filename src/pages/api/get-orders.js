export default function handler(req, res) {
    global.orders = global.orders || [];
    return res.status(200).json({ orders: global.orders });
  }