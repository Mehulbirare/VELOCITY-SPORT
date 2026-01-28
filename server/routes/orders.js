const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ordersPath = path.join(__dirname, '../data/orders.json');
const productsPath = path.join(__dirname, '../data/products.json');

// Get all orders (Admin only - ideally)
router.get('/', (req, res) => {
    try {
        if (!fs.existsSync(ordersPath)) fs.writeFileSync(ordersPath, '[]');
        const data = fs.readFileSync(ordersPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ message: 'Error reading orders' });
    }
});

// Create new order
router.post('/', (req, res) => {
    const { userId, items, total, shippingAddress } = req.body;
    try {
        if (!fs.existsSync(ordersPath)) fs.writeFileSync(ordersPath, '[]');
        const data = fs.readFileSync(ordersPath, 'utf8');
        const orders = JSON.parse(data);

        const newOrder = {
            id: Date.now(),
            userId,
            items,
            total,
            shippingAddress,
            status: 'Pending',
            date: new Date().toISOString()
        };

        orders.push(newOrder);
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error creating order' });
    }
});

// Get orders by userId
router.get('/user/:userId', (req, res) => {
    try {
        if (!fs.existsSync(ordersPath)) fs.writeFileSync(ordersPath, '[]');
        const data = fs.readFileSync(ordersPath, 'utf8');
        const orders = JSON.parse(data);
        const userOrders = orders.filter(o => o.userId == req.params.userId);
        res.json(userOrders);
    } catch (err) {
        res.status(500).json({ message: 'Error reading user orders' });
    }
});

module.exports = router;
