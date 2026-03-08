const express = require("express");
const { login, signup, user } = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/ping", (req, res) => {
    return res.json({ ok: true, msg: "auth route working" });
  });
router.post("/login", login);
router.post("/signup" , signup);
router.get("/user",authMiddleware,  user)

module.exports = router;