import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./utils/Database";
import userRoutes from "./routes/UserRoutes";
import complaintRoutes from "./routes/ComplaintRoutes";
import feedbackRoutes from "./routes/FeedbackRoutes";
import contactRoutes from "./routes/ContactRoutes";
import faqRoutes from "./routes/FaqRoutes";
import { excludeAuth } from "./utils/excludeAuth";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/complaints", complaintRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/contacts", contactRoutes);
app.use("/faqs", faqRoutes);

// Connect to Database and Start Server
connectDatabase().then(() => {
	app.listen(PORT, () =>
		console.log(`Server running on http://localhost:${PORT}`)
	);
});
