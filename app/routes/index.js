const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const productController = require('../controllers/productController');

/* Trang chu */
router.get('/', indexController.homepage);

/* San pham */
router.get('/danh-muc/:categoryId', productController.productCategory);
router.get('/san-pham/:productId', productController.productDetail)

/*  Gioi thieu */
router.get('/gioi-thieu', indexController.about);

/*  Lien he */
router.get('/lien-he', indexController.contact);

/*  Goi lai */
router.post('/callback', productController.callBack);

/*  Cap nhat du lieu */
router.get('/quan-ly/cap-nhat-du-lieu', indexController.refresh);

module.exports = router;