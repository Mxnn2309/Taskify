const express = require('express');
const router = express.Router();

// Schema
const Users = require('../models/UserModel')

// Controller
const { getUser } = require('../controllers/usersController');

router.post('/', getUser);



module.exports = router