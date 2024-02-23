import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  getCurrentUserCalculations,
  convertCalcualtionToExcel,
  deleteUserCalculation,
} from "../controllers/user.controller.js";
import { performCalculation } from "../controllers/calculation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/account").get(verifyJWT, getCurrentUser);
router.route("/calculations").get(verifyJWT, getCurrentUserCalculations);
router
  .route("/calculation/download/:calculationId")
  .post(verifyJWT, convertCalcualtionToExcel);
router
  .route("/delete/calculation/:calculationId")
  .post(verifyJWT, deleteUserCalculation);

// secured Routes
router.route("/calculate").post(verifyJWT, performCalculation);
export default router;
