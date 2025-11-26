// backend/src/controllers/newsletterController.js
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// 1. SUBSCRIBE (Token generieren & Link senden)
const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email fehlt.' });

  try {
    // Prüfen ob es den User schon gibt
    let subscriber = await NewsletterSubscriber.findOne({ email });

    // Wenn er schon verifiziert ist:
    if (subscriber && subscriber.isVerified) {
      return res.status(400).json({ message: 'Du bist bereits angemeldet!' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    if (!subscriber) {
      // Neu anlegen
      subscriber = new NewsletterSubscriber({ email, verificationToken });
    } else {
      // Existiert, aber nicht verifiziert -> Token erneuern
      subscriber.verificationToken = verificationToken;
    }

    await subscriber.save();

    // Link generieren
    const verifyLink = `${process.env.FRONTEND_URL}/verify-newsletter?token=${verificationToken}`;

    // Mail senden
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
      subject: "Bitte bestätige deine Anmeldung zum Glow Club ✨",
      // WICHTIG: text UND html definieren, damit es nicht doppelt angezeigt wird
      text: `Bitte bestätige deine Anmeldung, indem du diesen Link klickst: ${verifyLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #00f0ff;">Fast geschafft!</h2>
          <p>Klicke auf den Button, um dem Glow Club beizutreten und keine Drops mehr zu verpassen.</p>
          <a href="${verifyLink}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 10px;">Jetzt bestätigen</a>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">Oder Link kopieren: ${verifyLink}</p>
        </div>
      `,
    });

    res.status(201).json({ message: 'Fast fertig! Bitte bestätige die Mail in deinem Postfach.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Fehler', error });
  }
};

// 2. VERIFY (Den Link bestätigen)
const verifyNewsletter = async (req, res) => {
  const { token } = req.body;

  try {
    const subscriber = await NewsletterSubscriber.findOne({ verificationToken: token });

    if (!subscriber) {
      return res.status(400).json({ message: 'Ungültiger Link.' });
    }

    subscriber.isVerified = true;
    subscriber.verificationToken = undefined; // Token löschen
    await subscriber.save();

    // OPTIONAL: Jetzt die eigentliche "Willkommen"-Mail senden (User ist ja jetzt bestätigt)
    // Das kannst du hier einfügen, wenn du willst.

    res.json({ message: 'Erfolgreich zum Newsletter angemeldet!' });

  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Verifizierung.' });
  }
};

// ... sendNewsletter und unsubscribe bleiben gleich (oder ich kann sie dir schicken wenn nötig)

export { subscribe, verifyNewsletter };