import nodemailer from "nodemailer";
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { customerName, customerEmail, customerPhone, items, total } = req.body;

  const storeEmail = "selenasimpson94@ymail.com"; // CHANGE TO SELENA’S REAL EMAIL
  const twilioSID = process.env.TWILIO_SID;
  const twilioAuth = process.env.TWILIO_AUTH;
  const twilioNumber = process.env.TWILIO_NUMBER;

  // ---------- EMAIL SETUP ----------
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const orderDetails = items
    .map(i => `${i.name} (${i.length}") — $${i.price} x ${i.qty}`)
    .join("\n");

  const messageText = `
New Order Received
-------------------------
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone || "N/A"}

Items:
${orderDetails}

TOTAL: $${total.toFixed(2)}
`;

  try {
    // Send email to store
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: storeEmail,
      subject: "New Order Received",
      text: messageText,
    });

    // Send email to customer
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: customerEmail,
      subject: "Your Lena’s Bundles Order",
      text: `Thank you for your order!\n\n${messageText}`,
    });

    // ---------- SMS (Twilio) ----------
    if (customerPhone && twilioSID) {
      const client = twilio(twilioSID, twilioAuth);

      await client.messages.create({
        from: twilioNumber,
        to: customerPhone,
        body: `Lena’s Bundles: Your order has been received! Total: $${total.toFixed(
          2
        )}. A confirmation email has been sent.`
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Could not send order" });
  }
}