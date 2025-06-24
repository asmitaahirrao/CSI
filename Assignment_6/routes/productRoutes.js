const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create product (check duplicate by name)
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  const existingProduct = await Product.findOne({ name: name.trim() });
  if (existingProduct) {
    return res.status(400).json({ message: 'Product already exists' });
  }

  const product = new Product({ name: name.trim(), price });
  await product.save();
  res.status(201).json(product);
});

// Read all
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Read one
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

// Update
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

// Delete
router.delete('/:id', async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  result ? res.json({ message: 'Product deleted' }) : res.status(404).json({ message: 'Product not found' });
});

module.exports = router;