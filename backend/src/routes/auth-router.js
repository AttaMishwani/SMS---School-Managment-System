const express = require("express");
const { login, signup } = require("../controllers/auth-controller");
const router = express.Router();

router.get("/ping", (req, res) => {
    return res.json({ ok: true, msg: "auth route working" });
  });
router.post("/login", login);
router.post("/signup" , signup)

module.exports = router;