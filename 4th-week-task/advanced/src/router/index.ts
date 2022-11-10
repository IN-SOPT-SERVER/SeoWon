import express, { Router } from "express";
import contentRouter from "./contentRouter";
import userRouter from "./userRouter";

const router: Router = express.Router();

router.use("/content", contentRouter);
router.use("/user", userRouter);

module.exports = router;