import transporter from '../config/mailer.js';

export const sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'nicogleichmann1@gmail.com',
    subject: 'New Contact Form Submission',
    text: message,
    html: `<p>You have a new contact form submission from:</p>
           <ul>
             <li>Name: ${name}</li>
             <li>Email: ${email}</li>
           </ul>
           <p>Message:</p>
           <p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
};