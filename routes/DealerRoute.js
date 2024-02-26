const express =  require('express');
const DealerData = require('../middleware/DealerMiddleware')

const router = express()

router.route('/').get(DealerData);
module.exports = router;