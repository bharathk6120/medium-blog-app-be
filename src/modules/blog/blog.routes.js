const { ReqValidator } = require("@middlewares");
const { create, fetch } = require("./blog.controller");
const { createBlogSchema, fetchBlogSchema } = require("./blog.schema");

const router = require("express").Router();

router.post("/create", ReqValidator(createBlogSchema), create);
router.get("/:blog_id", ReqValidator(fetchBlogSchema), fetch);
router.get("/", fetch);

module.exports = router;
