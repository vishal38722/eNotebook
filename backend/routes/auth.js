const {
    login,
    register,
    getUserById,
  } = require("../controllers/userController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/getuser/:id", getUserById);
  
  module.exports = router;
