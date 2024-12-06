import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, FeedbackController.createFeedback);
router.get("/", authenticateToken, FeedbackController.listFeedbacks);

export default router;
