import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const InvoiceForm = () => {
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

  const { addInvoice } = useContext(GlobalContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      customerName,
      productName: products.name,
      unitPrice: products.unitPrice,
      notes,
      total: grandTotal,
      issueDate,
      dueDate,
      isExpired,
      isPaid,
      status,
    };
    addInvoice(newInvoice);

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
    <Box sx={{ mt: 3, marginRight: "5%", marginLeft: "5%", px: 1, pt: 2 }}>
      <Box sx={{ my: 5 }}>
        <Button variant="contained" href="/">
          Home
        </Button>
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

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4}>
            <InputLabel
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              Customer message
            </InputLabel>

            <Box
              mt={1}
              my={2}
              sx={{
                height: 300,
                width: "100%",
              }}
            >
              <Typography variant="body1" gutterBottom>
                Hello! Thank you for your purchase. Please return this invoice
                with payment. Thanks!
              </Typography>
              <Divider component="div" sx={{ my: 2 }}>
                <Chip label="Accepted payment methods" variant="outlined" />
              </Divider>
              <Typography variant="body1" gutterBottom>
                Please pay within 14 days either by:
              </Typography>

              <Typography> PayPal (calaxymail@email.com) </Typography>

              <Divider component="div" sx={{ my: 2 }}>
                <Chip label="Or mail a check to" variant="outlined" />
              </Divider>

              <Typography variant="body1" gutterBottom>
                Calaxy Plant Nursery <br />
                123 Story Dr. Suit 1003 <br />
                Dreamland, CA, 91101
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
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
              rows={12}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
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
            <Stack
              sx={{ border: "2px solid #d3d3d3", py: 10, px: 2 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Total: </Typography>
              <Typography variant="h6">${grandTotal}</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            Save Invoice
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default InvoiceForm;
