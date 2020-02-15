const express = require("express");
const router = new express.Router();
const {
  classifyUrls,
  getHistoryActivity,
  getHistory
} = require("../controllers/HistoryController");
const chalk = require("chalk");

router.get("/history/classify", async (req, res) => {
  try {
    process.stdout.write(`[GET] ${req.path} ... `);
    const classified_urls = await classifyUrls();

    res.send({ classified_urls });
    console.log(chalk.green(" [ OK ]"));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/history/activity", async (req, res) => {
  try {
    process.stdout.write(`[GET] ${req.path} ... `);
    const { all, byMonth, byDate } = await getHistoryActivity();

    res.send({ all, byMonth, byDate });
    console.log(chalk.green(" [ OK ]"));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/history", async (req, res) => {
  try {
    process.stdout.write(`[GET] ${req.path} ... `);
    const data = await getHistory();

    res.send(data);
    console.log(chalk.green(" [ OK ]"));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
