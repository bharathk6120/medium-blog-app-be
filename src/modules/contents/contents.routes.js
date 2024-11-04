const { ReqValidator } = require("@middlewares");
const { fetch } = require("./contents.controller");
const { fetchContentSchema } = require("./contents.schema");

const router = require("express").Router();

router.get("/:blog_id/:content_id", ReqValidator(fetchContentSchema), fetch);
router.get("/:blog_id", ReqValidator(fetchContentSchema), fetch);

module.exports = router;
