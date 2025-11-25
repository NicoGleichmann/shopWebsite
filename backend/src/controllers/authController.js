// backend/src/controllers/authController.js
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // Node.js Standard-Modul für Zufallswerte
import nodemailer from "nodemailer";

// --- REGISTER ---
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPW = await bcrypt.hash(password, 10);

    // 1. Verifizierungs-Token generieren (zufälliger String)
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 2. User erstellen (aber isVerified ist standardmäßig false durch das Schema)
    const newUser = await User.create({ 
      email, 
      password: hashedPW,
      verificationToken: verificationToken 
    });

    // 3. Bestätigungs-Link bauen (HIER IST DIE ÄNDERUNG)
    // Wir nutzen jetzt die Variable aus der .env Datei
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // 4. E-Mail senden
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
      from: `"Glow Club Auth" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Bitte bestätige deine E-Mail 🔒",
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Willkommen bei Lumio!</h2>
          <p>Bitte klicke auf den Link unten, um deinen Account zu aktivieren:</p>
          <a href="${verifyLink}" style="background: #00f0ff; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">E-Mail bestätigen</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Oder kopiere diesen Link: ${verifyLink}</p>
        </div>
      `,
    });

    // WICHTIG: Wir senden jetzt KEINEN Token zurück, damit der User sich noch nicht einloggen kann
    res.json({ msg: "Registrierung erfolgreich! Bitte prüfe deine E-Mails zur Bestätigung." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error during registration" });
  }
};

// --- VERIFY EMAIL ---
export const verifyEmail = async (req, res) => {
  const { token } = req.body; // Token kommt vom Frontend

  try {
    // User suchen, der diesen Token hat
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ msg: "Ungültiger oder abgelaufener Token." });
    }

    // User freischalten
    user.isVerified = true;
    user.verificationToken = undefined; // Token löschen, da verbraucht
    await user.save();

    res.json({ msg: "E-Mail erfolgreich bestätigt! Du kannst dich jetzt einloggen." });

  } catch (err) {
    res.status(500).json({ err: "Verification failed" });
  }
};

// --- LOGIN ---
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Falsche Zugangsdaten" });

    // NEU: Prüfung auf Verifizierung
    if (!user.isVerified) {
        return res.status(400).json({ msg: "Bitte bestätige erst deine E-Mail Adresse!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Falsche Zugangsdaten" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ err });
  }
};