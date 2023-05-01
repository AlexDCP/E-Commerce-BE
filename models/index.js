// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Handles the products in each category
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// This handles to products for each corresponding category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// This handles the tags for the products
Product.belongsToMany(Tag, {
  through: ProductTag,
});

// This handles the opposite of last
Tag.belongsToMany(Product, {
  through: ProductTag,
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
