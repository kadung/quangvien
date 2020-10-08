const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

/* GET home page. */
router.get('/', productController.productList);

module.exports = router;