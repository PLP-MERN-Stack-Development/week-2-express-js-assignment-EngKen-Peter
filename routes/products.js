const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();
let products = [];

// GET all products with optional filtering, pagination, search
router.get('/', (req, res) => {
  let result = [...products];

  const { search, category, page = 1, limit = 10 } = req.query;

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated
  });
});

// GET a single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

// POST a product
router.post('/', auth, validateProduct, (req, res) => {
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

// PUT (update) a product
router.put('/:id', auth, validateProduct, (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product
router.delete('/:id', auth, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index !== -1) {
    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
