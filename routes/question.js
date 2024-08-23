const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionsControllers");

router.post("/create", questionController.createQuestions);
router.post("/:id/options/create", questionController.addOption);
router.delete("/:id/delete", questionController.deleteQuestions);
router.delete("/options/:id/delete", questionController.deleteOptions);
router.post("/options/:id/add_vote", questionController.addVote);
router.get("/:id", questionController.getQuestion);

module.exports = router;
