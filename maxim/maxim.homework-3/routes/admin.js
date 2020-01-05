const path = require('path')
const express = require('express');
const app = express();
const rootDir = require('../util/path')
const bodyParser = require('body-parser');
const router = express.Router();
const userControls = require('../controller/users');
//yeni user eklenince bir listede tutmak gerekecek userlari

app.use(bodyParser.urlencoded({ extended: true })); // register body-parser as a middleware


router.get( '/users-list', userControls.getUsersList);
// router.get metodunun ilk parametresi url ile gelen adres parcasina karsilik gelir , burada url root + /admin + /add-user seklindeki kisimdir 
router.get( '/add-user', userControls.newUserForm);
router.post( '/add-user', userControls.newUserSave);



exports.routes = router;