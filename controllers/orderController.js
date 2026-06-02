import Order from '../models/order.js';

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrders };