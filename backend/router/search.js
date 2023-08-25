const express = require("express");

const searchController=require('../controller/search')

const router = express.Router();

router.post('/',searchController.postSearch)

module.exports = router;
