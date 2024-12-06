import { Router } from "express";
import { ComplaintController } from "../controllers/ComplaintController";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, ComplaintController.createComplaint);
router.get("/", authenticateToken, ComplaintController.listComplaints);
router.put(
	"/:id",
	authenticateToken,
	authorizeRole("admin"),
	ComplaintController.updateComplaint
);

export default router;