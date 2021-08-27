const router = require('express').Router()
const UserControllers = require("../controllers/user")
const { upload } = require("../middlewares/uploadImage")

router.post("/users/signup", upload, UserControllers.signUp)

module.exports = router