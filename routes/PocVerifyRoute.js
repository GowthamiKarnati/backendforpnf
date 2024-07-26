const express =  require('express');
const VerifiedPoc = require('../middleware/PocVerifyMiddleware')

const router = express()

router.route('/').post(VerifiedPoc);
module.exports = router;