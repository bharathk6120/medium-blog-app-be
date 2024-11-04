const { create } = require("./blog.controller");

const router = require("express").Router();

router.post("/create", create);

module.exports = router;
