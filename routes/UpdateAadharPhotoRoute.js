const express = require('express');
const UpdateAadharPhoto = require('../middleware/UpdateAadharPhotoMiddleware')

const router = express()

router.route('/').post(UpdateAadharPhoto);

module.exports=router;