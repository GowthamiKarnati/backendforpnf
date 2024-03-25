const express = require('express');
const UpdatePhoto = require('../middleware/UpdatePhotoMiddleware')

const router = express()

router.route('/').post(UpdatePhoto);

module.exports=router;