const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

let products = [];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a specific product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST a new product
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
