const mongoose = require("mongoose");

// Define the schema for the line items
const lineItemSchema = new mongoose.Schema({
  productName: { type: String },
  quantity: { type: Number },
  unitPrice: { type: Number },
  subtotal: { type: Number },
});

const invoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    products: [lineItemSchema], // Using an array to store multiple line items

    notes: {
      type: String,
    },

    total: { type: Number },

    issueDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
    },
    isExpired: {
      type: Boolean,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
