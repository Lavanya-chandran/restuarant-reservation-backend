import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


router.put("/:id", verifyUser, updateUser);

// Delete user route
router.delete("/:id", verifyUser, deleteUser);

// Get user by ID route
router.get("/:id", verifyUser, getUser);

export default router;