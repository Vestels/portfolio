const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()

const corsOptions = {
    origin: '*',
  };

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(express.json());



const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: 'web@rokszinroland.hu',
      pass: process.env.PASS
    },
    logger: true,
});

app.post('/send-email', (req, res, next) => {
  const { from, subject, message } = req.body;

  const mailOptions = {
    from: from,
    to: 'web@rokszinroland.hu',
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(error);
    }
    res.status(200).send('E-mail sikeresen elküldve.');
  });
});

app.use((err, req, res, next) => {
  console.error('Hiba történt:', err.message);
  res.status(500).send('Hiba történt az e-mail küldése közben.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
