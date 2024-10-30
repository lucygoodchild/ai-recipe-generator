const express = require("express");
const userController = require("./../controllers/userController");
const authenticationController = require("./../controllers/authenticationController");

const router = express.Router();

router.post("/signup", authenticationController.signup);
router.post("/login", authenticationController.login);
router.post("/forgot-password", authenticationController.forgotPassword);
router.patch("/reset-password/:token", authenticationController.resetPassword);
router.patch(
  "/update-password",
  authenticationController.protect,
  authenticationController.updatePassword
);
router.patch("/update-me", userController.updateMe);
router.delete(
  "/delete-me",
  authenticationController.protect,
  userController.deleteMe
);
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getPersonalDetailsOfUser);

module.exports = router;
