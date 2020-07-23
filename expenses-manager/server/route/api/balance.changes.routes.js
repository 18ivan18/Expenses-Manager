const express = require("express");
const router = express.Router();
const BalanceChange = require("../../models//balanceChangeSchema");
const verifyToken = require("../../util/verify-token");
const error = require("../../util/utils").error;

router.post("/", verifyToken, (req, res) => {
  let { year, month, date } = req.body;
  date += 1;
  const date1 = new Date(year, month, date);
  let balance = {
    type: req.body.type,
    category: req.body.category,
    categoryPicture: req.body.categoryPicture,
    amount: req.body.amount,
    userID: req.body.userID || req.userID,
    description: req.body.description,
  };

  if (year) {
    balance = { ...balance, date: date1 };
  }

  //authenticate req.body
  new BalanceChange(balance)
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: `New ${req.body.type} created.`,
        result: result,
      });
    })
    .catch((err) => {
      error(req, res, 500, err._message, err)
    });
});

router.get("/:type/:id", verifyToken, (req, res) => {
  //authenticate req.body
  if (req.params.id !== req.userID) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
      result: null,
    });
  }
  if (!["income", "payment"].includes(req.params.type)) {
    return res.status(403).json({
      success: false,
      message: "URL fault.",
      result: null,
    });
  }
  BalanceChange.find({
    userID: req.userID,
    type: req.params.type,
  })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `Found user's ${req.params.type}.`,
        result: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err._message,
        result: null,
      });
    });
});

router.get("/category/:type/:category", async (req, res) => {
  const { type, category } = req.params;
  if (!["income", "payment"].includes(type)) {
    return res.status(403).json({
      success: false,
      message: "URL fault.",
      result: null,
    });
  }
  try {
    const result = await BalanceChange.find({ category, type });
    return res.status(200).json({
      success: true,
      message: `Found group's ${type} for category ${category}.`,
      result: result,
    });
  } catch (err) {
    error(req, resp, 500, err._message, err)
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  //authenticate req.body
  const { id } = req.params;
  const result = await BalanceChange.findById(id);
  if (result) {
    return res.status(200).json({
      success: true,
      message: `Found ${result.type}.`,
      result: result,
    });
  }
  return res.status(500).json({
    success: false,
    message: "No",
    result: null,
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  //authenticate req.body
  BalanceChange.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          message: `Deleted.`,
          result: result,
        });
      } else {
        res.status(404).json({
          message: "Balance not found.",
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err._message,
        result: null,
      });
    });
});

router.patch("/:id", verifyToken, (req, res) => {
  //authenticate req.body
  BalanceChange.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          result,
          success: true,
          message: "Successfully updated balance",
        });
      } else {
        res.status(404).json({
          message: "Balance not found.",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

module.exports = router;
