const Invoice = require("../models/InvoiceModel");

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find();

    return res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    return res.status(200).json({
      success: true,
      count: invoice.length,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    // console.log(req.body);
    return res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      data: { invoice },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    return res.status(200).json({
      success: true,
      data: { invoice },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
