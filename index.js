import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.kinghost.net", 
  port: 587,
  secure: false, 
  auth: {
    user: "portal@unimble.com.br",
    pass: "TeamUN@2025",
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    await transporter.sendMail({
      from: `"Portal Unimble" <portal@unimble.com.br>`,
      to,
      subject,
      html,
    });

    res.json({ success: true, message: "E-mail enviado com sucesso" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
