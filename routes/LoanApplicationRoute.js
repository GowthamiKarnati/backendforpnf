const express =  require('express');
const LoanApplications =require('../middleware/LoanapplicatiomMiddleware')

const router = express()
 
router.route('/').get(LoanApplications);
module.exports = router;