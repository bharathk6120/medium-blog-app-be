const { create, fetch } = require("./blog.controller");

const router = require("express").Router();

router.post("/create", create);
router.get("/:blog_id", fetch);
router.get("/", fetch);

module.exports = router;
