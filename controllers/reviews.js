const express = require("express")
const router = express.Router()
const Reviews = require("../models/reviews.js")

//GET
router.get("/", (req, res) => {
  Reviews.find({}, (error, foundReviews) => {
    res.json(foundReviews)
  })
})

//DELETE
router.delete("/:id", (req, res) => {
  Reviews.findByIdAndRemove(req.params.id, (error, deleteReviews) => {
    res.json(deleteReviews)
  })
})

//POST
router.post("/", (req, res) => {
  Reviews.create(req.body, (error, createReviews) => {
    res.json(createReviews)
  })
})

//PUT(UPDATE)
router.put("/:id", (req, res) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error, updateReviews) => {
      res.json(updateReviews)
  })
})

module.exports = router
