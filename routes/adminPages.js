const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");
const Page = require("../models/pages");

// add page
router.post("/add-page", async (req, res) => {
  try {
    let { title, slug, content } = req.body;
    slug = slugify(slug, { lower: true });
    if (slug == "") slug = slugify(title, { lower: true });

    const newPage = await Page.create({
      title,
      slug,
      content,
      sorting: 100,
    });
    res.status(201).json({
      status: "success",
      data: { page: newPage },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//get pages
router.get("/", async (req, res) => {
  try {
    const page = await Page.find({}).sort({ sorting: 1 });
    res.status(200).json({
      status: "success",
      result: page.length,
      data: { page },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//get page by id(slug)
router.get("/edit-page/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: "success",
      result: page.length,
      data: { page },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//edit page
router.patch("/edit-page/:slug", async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { page },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

// delete page
router.delete("/delete-page/:slug", (req, res) => {
  try {
    Page.findOneAndDelete({ slug: req.params.slug });
    res.status(200).json({
      status: "success",
      data: null,
      message: "delete successfull",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
