import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';


router.route('/').post( addOrderItems).get( getOrders);
router.route('/mine').get( getMyOrders);
router.route('/:id').get( getOrderById);
router.route('/:id/deliver').put( updateOrderToDelivered);

export default router;
