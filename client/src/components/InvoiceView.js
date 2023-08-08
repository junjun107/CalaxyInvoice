import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const InvoiceView = () => {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: 0, unitPrice: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [status, setStatus] = useState("");

  const initialProductState = { name: "", quantity: 0, unitPrice: 0 };
  const { invoice, getInvoice, updateInvoice } = useContext(GlobalContext);

  const { id } = useParams();

  const calculateSubtotal = (quantity, unitPrice) => {
    const subtotal = quantity * unitPrice;
    return subtotal.toFixed(2); // Convert to a string with 2 decimal places
  };
  const calculateGrandTotal = () => {
    const grandTotal = products.reduce((total, product) => {
      const subtotal = product.quantity * product.unitPrice;
      return total + subtotal;
    }, 0);
    setGrandTotal(grandTotal.toFixed(2));
    return grandTotal.toFixed(2); // Convert to a string with 2 decimal places
  };
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);

    calculateGrandTotal();
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: 0, unitPrice: 0 }]);
    calculateGrandTotal();
  };

  const calculateDuration = () => {
    const currentDate = new Date();
    const timeDifference = new Date(dueDate).getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setIsExpired(daysDifference < 0);
  };

  useEffect(() => {
    calculateDuration();
    if (isPaid) {
      setStatus("Fulfilled");
    } else if (isExpired && !isPaid) {
      setStatus("Overdue");
    } else if (!isPaid && !isExpired) {
      setStatus("Outstanding");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, dueDate, isPaid, isExpired]);

  useEffect(() => {
    getInvoice(id);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (invoice) {
      setCustomerName(invoice.customerName);
    }
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInvoice = {
      id: invoice._id,
      customerName,
      productName: products.name,
      unitPrice: products.unitPrice,
      notes,
      total: grandTotal,
      isExpired,
      isPaid,
      status,
    };
    updateInvoice(id, updatedInvoice);
    setCustomerName("");
    setProducts([initialProductState]);
    setNotes("");
    setGrandTotal(0);
    setIssueDate("");
    setDueDate("");
    setIsExpired(false);
    setIsPaid(false);
    setStatus("");
  };

  // console.log(invoice);
  return (
    <Box mx={2} my={2}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" href="/" sx={{ mb: 4 }}>
          Home
        </Button>
        <Chip label={invoice._id} variant="outlined" color="primary" />
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid display="flex" justifyContent="space-between" sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6}>
            <InputLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              Customer Name:
            </InputLabel>
            <TextField
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: 4,
            }}
          >
            <FormControlLabel
              checked={isPaid}
              control={<Checkbox />}
              label="Payment Received"
              onChange={(e) => {
                setIsPaid(e.target.checked);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "start",
                fontWeight: 700,
              }}
            >
              Issue Date
            </InputLabel>

            <DatePicker
              placeholderText="Select date"
              value={issueDate}
              onChange={(newValue) => setIssueDate(newValue)}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "start",
                fontWeight: 700,
              }}
            >
              Due Date
            </InputLabel>

            <DatePicker
              placeholderText="Select date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
            />
          </Grid>
        </Grid>

        {products.map((product, index) => (
          <Grid container key={index} display="flex" gap={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                Product Name:
              </InputLabel>
              <TextField
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, "name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                Quantity:
              </InputLabel>
              <TextField
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "quantity",
                    parseInt(e.target.value)
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                Unit Price:
              </InputLabel>
              <TextField
                type="number"
                value={product.unitPrice}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "unitPrice",
                    parseFloat(e.target.value)
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  fontWeight: 600,
                }}
              >
                {calculateSubtotal(product.quantity, product.unitPrice)}
              </Typography>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="contained"
          type="button"
          onClick={handleAddProduct}
          sx={{
            my: 3,
          }}
        >
          Add a new line
        </Button>

        <Grid container justifyContent="space-between" sx={{ p: 2 }}>
          <Grid item xs={12} sm={6}>
            <InputLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              Notes
            </InputLabel>
            <TextField
              sx={{ py: 2 }}
              id="outlined-multiline-static"
              multiline
              fullWidth
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <InputLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                paddingBottom: 2,
              }}
            >
              Summary
            </InputLabel>
            <Box
              sx={{ border: "2px solid gray", py: 6, px: 2 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="h6">Total: </Typography>
              <Typography variant="h6">${grandTotal}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            Update Invoice
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default InvoiceView;
