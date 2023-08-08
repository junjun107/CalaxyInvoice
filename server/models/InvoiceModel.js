const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    // rate: {
    //   type: Number,
    // },
    // hours: {
    //   type: Number,
    // },
    customerName: {
      type: String,
    },
    total: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    productName: {
      type: String,
    },
    unitPrice: {
      type: Number,
    },
    notes: {
      type: String,
    },
    isPaid: {
      type: String,
    },
    isExpired: {
      type: String,
    },
    status: {
      type: String,
    },
    issueDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
