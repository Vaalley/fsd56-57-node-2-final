// Routes exports
import { Router } from "express";
import authRoutes from "./auth.routes";
// import bookRoutes from "./book.routes";
// import borrowingRoutes from "./borrowing.routes";
// import categoryRoutes from "./category.routes";
// import userRoutes from "./user.routes";

const router = Router();

// API routes
router.use("/auth", authRoutes);
// router.use("/books", bookRoutes);
// router.use("/borrowings", borrowingRoutes);
// router.use("/categories", categoryRoutes);
// router.use("/users", userRoutes);

export default router;
