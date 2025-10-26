// api/send-email.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, msg: "API online. Use POST para enviar." });
  }

  // TODO: na próxima etapa ligamos o SMTP (nodemailer)
  // Por enquanto só ecoa o payload para você testar integração do front.
  const { name, email, motive } = req.body || {};
  return res.status(200).json({ ok: true, received: { name, email, motive } });
}
