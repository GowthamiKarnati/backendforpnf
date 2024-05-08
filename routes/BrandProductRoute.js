const express =  require('express');
const BrandProductData = require('../middleware/BrandProductsMiddleware');

const router = express()

router.route('/').get(BrandProductData);
module.exports = router;