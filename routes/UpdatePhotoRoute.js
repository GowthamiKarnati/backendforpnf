const express = require('express');
const UpdatePanPhoto = require('../middleware/UpdatePanPhotoMiddleware')

const router = express()

router.route('/').post(UpdatePanPhoto);

module.exports=router;