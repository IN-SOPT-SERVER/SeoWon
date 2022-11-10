import express, { Router } from "express";

const router: Router = express.Router();

router.use("/content", require("./contentRouter"));

module.exports = router;