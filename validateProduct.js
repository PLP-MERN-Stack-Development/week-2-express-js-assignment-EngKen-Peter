const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({
      message: 'Invalid product data. Ensure name, description, price (number), category, and inStock (boolean) are provided.'
    });
  }

  next();
};

module.exports = validateProduct;
