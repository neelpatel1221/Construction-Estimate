import { Router } from "express";
import {
  loginUser,
  registerUser,
  getRegisterUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { performCalculation } from "../controllers/calculation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/register").get(getRegisterUser);
router.route("/logout").post(verifyJWT, logoutUser);

// secured Routes
router.route("/calculate").post(verifyJWT, performCalculation);
export default router;
