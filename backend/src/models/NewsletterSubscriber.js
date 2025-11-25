// NewsletterSubscriber.js
import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  isVerified: { 
    type: Boolean, 
    default: false // Standardmäßig nicht bestätigt
  },
  verificationToken: { 
    type: String 
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('NewsletterSubscriber', newsletterSchema);