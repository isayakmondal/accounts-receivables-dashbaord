import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./add.css";
import axios from "axios";

const ColorButtonS = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 120px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    borderColor: "#FFFFFF",
  },
});
const ColorButtonC = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 120px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    backgroundColor: "#FF0000",
    borderColor: "#FFFFFF",
  },
});

export default function FormDialogSearch({
  createData,
  openSearch,
  handleCloseSearch,
}) {
  const [doc_id, setDocId] = React.useState("");
  const [invoice_id, setInvoiceId] = React.useState("");
  const [cust_number, setCustomerNumber] = React.useState("");
  const [buisness_year, setBusinessYear] = React.useState("");

  const handleDocId = (event) => {
    setDocId(event.target.value);
    console.log(doc_id);
  };
  const handleInvoiceId = (event) => {
    setInvoiceId(event.target.value);
    console.log(invoice_id);
  };

  const handleCustomerNumber = (event) => {
    setCustomerNumber(event.target.value);
    console.log(cust_number);
  };
  const handleBusinessYear = (event) => {
    setBusinessYear(event.target.value);
    console.log(buisness_year);
  };

  const final = {
    doc_id: doc_id,
    invoice_id: invoice_id,
    cust_number: cust_number,
    business_year: buisness_year,
  };


  const handleSearch = () => {
    if (
      doc_id !== "" &&
      invoice_id !== "" &&
      cust_number !== " " &&
      buisness_year !== " "
    )
      axios
        .post("http://localhost:8080/invoice-management/advanceSearch", {
          doc_id,
          invoice_id,
          cust_number,
          buisness_year,
        })
        .then((resp) => {
          console.log(resp.data);
          createData(resp.data);
        });
    handleClose();
  };

  const handleClose = () => {
    // setOpen(false);
    handleCloseSearch();
  };
  return (
    <div>
      <Dialog
        open={openSearch}
        onClose={handleCloseSearch}
        className="dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="title">Advance Search</DialogTitle>

        <Box sx={{ width: "100%" }} className="content">
          <Grid container rowSpacing={2} className="parentGrid">
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Document ID"
                style={{ borderRadius: 12 }}
                onChange={(event) => handleDocId(event)}
                variant="filled"
              />
            </Grid>

            <Grid item lg={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Invoice ID"
                style={{ borderRadius: 12 }}
                onChange={(event) => handleInvoiceId(event)}
                variant="filled"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Customer Number"
                style={{ borderRadius: 12 }}
                onChange={(event) => handleCustomerNumber(event)}
                variant="filled"
              />
            </Grid>

            <Grid item lg={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Business Year"
                style={{ borderRadius: 12 }}
                onChange={(event) => handleBusinessYear(event)}
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>

        <DialogActions className="dialogAction">
          <ColorButtonS onClick={handleSearch}>SEARCH</ColorButtonS>

          <ColorButtonC onClick={handleCloseSearch}>CANCEL</ColorButtonC>
        </DialogActions>
      </Dialog>
    </div>
  );
}
