import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// --- 1. SUBSCRIBE (Anmelden) ---
const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email fehlt.' });

  try {
    let subscriber = await NewsletterSubscriber.findOne({ email });

    if (subscriber && subscriber.isVerified) {
      return res.status(400).json({ message: 'Du bist bereits angemeldet!' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    if (!subscriber) {
      subscriber = new NewsletterSubscriber({ email, verificationToken });
    } else {
      subscriber.verificationToken = verificationToken;
    }

    await subscriber.save();

    // Link generieren
    const verifyLink = `${process.env.FRONTEND_URL}/verify-newsletter?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Glow Club" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Dein Zugang zum Glow Club ⚡️", // Neuer Betreff, damit Gmail nicht gruppiert
      
      // 1. Text-Version (Nur Link, kein Button, für alte Geräte)
      text: `Willkommen! Bitte bestätige deine Anmeldung hier: ${verifyLink}`,
      
      // 2. HTML-Version (Vollständiges HTML-Dokument)
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .button { background-color: #000000; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; margin-top: 20px; }
            h2 { color: #00f0ff; text-transform: uppercase; letter-spacing: 1px; }
            p { color: #333333; line-height: 1.6; font-size: 16px; }
            .footer { margin-top: 30px; font-size: 12px; color: #999999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Nur noch ein Klick!</h2>
            <p>Hey,</p>
            <p>Du bist fast drin. Bestätige kurz deine E-Mail, um exklusive Deals und Setup-Inspirationen zu erhalten.</p>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <a href="${verifyLink}" class="button">Bestätigen & Beitreten</a>
                </td>
              </tr>
            </table>
            
            <div class="footer">
              <p>Funktioniert der Button nicht? Kopiere diesen Link:<br>
              ${verifyLink}</p>
              <p>Lumio - Future Lighting</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.status(201).json({ message: 'Bestätigungs-Mail wurde gesendet!' });

  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
       const messages = Object.values(error.errors).map(val => val.message);
       return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: 'Server Fehler', error });
  }
};

// ... Verify, Send, Unsubscribe wie gehabt ...
const verifyNewsletter = async (req, res) => {
  const { token } = req.body;
  try {
    const subscriber = await NewsletterSubscriber.findOne({ verificationToken: token });
    if (!subscriber) return res.status(400).json({ message: 'Ungültiger Link.' });
    subscriber.isVerified = true;
    subscriber.verificationToken = undefined;
    await subscriber.save();
    res.json({ message: 'Erfolgreich bestätigt!' });
  } catch (error) { res.status(500).json({ message: 'Fehler.' }); }
};

const sendNewsletter = async (req, res) => { /* Code wie zuvor */ res.json({msg: 'ok'}); };
const unsubscribe = async (req, res) => { /* Code wie zuvor */ res.json({msg: 'ok'}); };

export { subscribe, verifyNewsletter, sendNewsletter, unsubscribe };