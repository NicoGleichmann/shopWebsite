// newsletterController.js
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import nodemailer from 'nodemailer';

const subscribe = async (req, res) => {
  console.log('Subscribe endpoint hit. Body:', req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new NewsletterSubscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Successfully subscribed to the newsletter' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const sendNewsletter = async (req, res) => {
  const { subject, text } = req.body;

  if (!subject || !text) {
    return res.status(400).json({ message: 'Subject and text are required' });
  }

  try {
    const subscribers = await NewsletterSubscriber.find({});
    const emails = subscribers.map(subscriber => subscriber.email);

    if (emails.length === 0) {
      return res.status(400).json({ message: 'No subscribers to send to' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your Shop" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Sending to yourself as BCC is a good practice
      bcc: emails,
      subject: subject,
      text: text,
    });

    res.status(200).json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    res.status(500).json({ message: 'Failed to send newsletter', error });
  }
};

const unsubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscriber = await NewsletterSubscriber.findOneAndDelete({ email });

    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Successfully unsubscribed from the newsletter' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export { subscribe, sendNewsletter, unsubscribe };
