const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Gets all products
router.get('/', async (req, res) => {
  try { 
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Finds one category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Creates new category from front end data
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
// This updates by id.
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    }
  },
  )
  res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes category by id.
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json('Category Deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
