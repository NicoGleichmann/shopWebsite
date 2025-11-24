// newsletterRoutes.js
import express from 'express';
import { subscribe, unsubscribe, sendNewsletter } from '../controllers/newsletterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.post('/send', protect, admin, sendNewsletter);

export default router;
