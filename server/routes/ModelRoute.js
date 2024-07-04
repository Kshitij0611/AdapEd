import express from "express";

import { requestQuestion, storeResult } from "../controller/ModelController.js";
// import { protectQuiz } from "../middleware/quizMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/question/:topic", requestQuestion);
router.post("/result", storeResult);
// router.get("/topics",  getTopics);

export default router;