const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// Pulls all the items with the tag key
router.get('/', async (req, res) => {
  try { 
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This finds a single product by id.
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This is the route to create new tags
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This is the route that updates tags by id and name
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    }
  },
  )
  res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
}});

// This deletes all items with the corresponding id (should only be one)
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json('Category Deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
