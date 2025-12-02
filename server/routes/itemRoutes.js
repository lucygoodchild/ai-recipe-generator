const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.syncItems);
router
  .route("/:type")
  .get(itemController.getItemsOfType)
  .post(itemController.addItem);
router
  .route("/:id")
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
