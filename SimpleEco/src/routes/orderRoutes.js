import express from 'express'
import * as orderController from '../controllers/orderController.js';
const router = express.Router();

router.post('/checkout', orderController.checkoutController);

export default router;