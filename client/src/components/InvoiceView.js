import {
  Box,
  Chip,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const InvoiceView = () => {
  const { invoice, getInvoice, updateInvoice } = useContext(GlobalContext);

  const { id } = useParams();

  useEffect(() => {
    getInvoice(id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box mx={20}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="space-between"
        sx={{ my: 4 }}
      >
        <grid item xs={6}>
          <img
            src="https://media.licdn.com/dms/image/C560BAQGewMpf2zjNYw/company-logo_200_200/0/1641488670873?e=1699488000&v=beta&t=852ssZPdidERTpE5f_-3IctivtWmIFl7wFC60goA-20"
            alt="logo"
          />
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Calaxy Plant Nursery <br />
            123 Story Dr. Suit 1003 <br />
            Dreamland, CA, 91101
          </Typography>
        </grid>
        <grid item xs={6}>
          <Typography variant="h1" gutterBottom>
            Invoice
          </Typography>
          <Box>
            <Typography variant="h6" gutterBottom>
              Invoice #
            </Typography>
            <Typography variant="h6" gutterBottom>
              {invoice._id}
            </Typography>
          </Box>
        </grid>
      </Grid>

      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#d3d3d3" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total&nbsp;($)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoice.products &&
              invoice.products.map((product) => (
                <TableRow
                  key={product.productName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.unitPrice}</TableCell>
                  <TableCell align="right">{product.subtotal}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid display="flex">
        <Grid item xs={10} sm={6}>
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
              width: "70%",
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

        <Grid item display="flex" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Total $
          </Typography>
          <Typography variant="h6" gutterBottom>
            {invoice.total}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceView;
