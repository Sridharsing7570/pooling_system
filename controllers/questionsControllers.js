const Questions = require("../models/questions");

exports.createQuestions = async (req, res) => {
  const { title } = req.body;
  try {
    const newQuestion = new Questions({ title });
    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.addOption = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const question = await Questions.findById(id);
    question.options.push({ text });
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.deleteQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Questions.findById(id);
    if (question.options.some((Option) => Option.votes > 0)) {
      return res
        .status(400)
        .json({ msg: "Cannot delete a question with votes" });
    }

    await question.remove();
    res.json({ msg: "Question removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteOptions = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Questions.findOne({ "options._id": id });
    const option = question.options.id(id);
    if (option.votes > 0) {
      return res
        .status(400)
        .json({ msg: "Can not delete an option with votes" });
    }

    option.remove();
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.addVote = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Questions.findOne({ "options._id": id });
    const option = question.options.id(id);
    option.votes += 1;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Questions.findById(id);
    res.json(question);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
