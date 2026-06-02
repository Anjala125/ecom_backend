import express from 'express';

const router = express.Router();

import {
  createOrder,
  getOrders
} from '../controllers/orderController.js';

import {
  protect,
  authorizeRoles
} from '../middleware/authMiddleware.js';

router.post('/', protect, createOrder);

router.get('/', protect, authorizeRoles('admin'), getOrders);

export default router;