// API

var express = require("express");
var router = express.Router();

var db = require("../models/index");

router.get("/list", async (req, res, next) => {
  const membersData = await db.Member.findAll();
  res.json(membersData);
});

router.post("/create", async (req, res, next) => {
  const userid = req.body.userid;
  const username = req.body.username;

  const memberData = {
    userid,
    username,
  };

  const createdMemberData = await db.Member.create(memberData);
  res.json(createdMemberData);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const memberData = await db.Member.findOne({ where: { id: id } });
  res.json(memberData);
});

router.post("/modify/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const updateMemberData = {
    userid: req.body.userid,
    username: req.body.username,
  };

  await db.Member.update(updateMemberData, { where: { id: id } });

  res.json({ result: "modify completed", code: "200" });
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  await db.Member.destroy({ where: { id: id } });

  res.json({ result: "delete completed", code: "200" });
});

module.exports = router;
