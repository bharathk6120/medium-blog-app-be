const { fetch } = require("./contents.controller");

const router = require("express").Router();

router.get("/:blog_id/:content_id", fetch);
router.get("/:blog_id", fetch);

module.exports = router;
