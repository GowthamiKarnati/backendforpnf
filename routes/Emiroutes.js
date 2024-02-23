const express =  require('express');
const Emilist = require('../middleware/EmiMiddleware');

const router = express()

router.route('/').get(Emilist);
module.exports = router;