const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

// Get all products
router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(productsPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ message: 'Error reading products' });
    }
});

// Get product by ID
router.get('/:id', (req, res) => {
    try {
        const data = fs.readFileSync(productsPath, 'utf8');
        const products = JSON.parse(data);
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error reading product' });
    }
});

module.exports = router;
