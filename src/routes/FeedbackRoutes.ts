import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, FeedbackController.createFeedback);
router.get("/", authenticateToken, FeedbackController.listFeedbacks);
router.post("/reply", authenticateToken, authorizeRole("admin"), FeedbackController.replyFeedback);

export default router;
