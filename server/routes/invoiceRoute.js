const express = require("express");
const router = express.Router();
const {
  getInvoices,
  addInvoice,
  deleteInvoice,
  updateInvoice,
  getInvoice,
} = require("../controllers/invoiceController");

router.route("/").get(getInvoices).post(addInvoice);

router.route("/:id").delete(deleteInvoice).patch(updateInvoice).get(getInvoice);

module.exports = router;
