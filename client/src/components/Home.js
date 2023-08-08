import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Home = () => {
  const { invoices, getInvoices } = useContext(GlobalContext);

  useEffect(() => {
    getInvoices();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Invoice #",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: ({ value, row }) => {
        return <Link to={`/${row._id}`}>{value}</Link>;
      },
    },

    {
      field: "customerName",
      headerName: "Customer Name",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "issueDate",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      type: "date",
      width: 130,
      valueGetter: (params) => new Date(params.row.issueDate),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "date",
      headerClassName: "super-app-theme--header",
      width: 130,
      valueGetter: (params) => new Date(params.row.dueDate),
    },
    {
      field: "total",
      headerName: "Total(USD)",
      width: 100,
      type: "number",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 130,
      renderCell: (params) => {
        if (params.row.status === "Fulfilled") {
          return (
            <Box
              sx={{
                backgroundColor: "green",
                width: "100%",
                textAlign: "center",
                py: "100%",
                color: "white",
                fontWeight: "600",
              }}
            >
              Fullfilled
            </Box>
          );
        } else if (params.row.status === "Overdue") {
          return (
            <Box
              sx={{
                backgroundColor: "red",
                width: "100%",
                textAlign: "center",
                py: "100%",
                color: "white",
                fontWeight: "600",
              }}
            >
              Overdue
            </Box>
          );
        } else if (params.row.status === "Outstanding") {
          return (
            <Box
              sx={{
                backgroundColor: "orange",
                width: "100%",
                textAlign: "center",
                py: "100%",
                color: "white",
                fontWeight: "600",
              }}
            >
              Outstanding
            </Box>
          );
        }
      },
    },
  ];

  return (
    <Box
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "rgba(47, 40, 44, 0.07)",
        },
      }}
    >
      <Box mx={2} my={2} sx={{}}>
        <Button variant="contained" href="/invoiceform">
          <AddIcon />
          Add Invoic
        </Button>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          my: 6,
        }}
      >
        <DataGrid
          checkboxSelection={false}
          rows={invoices}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            m: 2,
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
