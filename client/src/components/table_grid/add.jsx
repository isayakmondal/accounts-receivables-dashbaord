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
import EnhancedTable from "./table";

const ColorButtonS = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 280px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    backgroundColor: "#0BA8E6",
    borderColor: "#FFFFFF",
  },
});
const ColorButtonC = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 265px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    backgroundColor: "#FF0000",
    borderColor: "#FFFFFF",
  },
});

export default function FormDialogAdd({ openAdd, handleCloseAdd }) {
  const [businessCode, setBusinessCode] = React.useState("");
  const [customerNumber, setCustomerNumber] = React.useState("");
  const [clearDate, setClearDate] = React.useState("");
  const [businessYear, setBusinessYear] = React.useState("");
  const [docId, setDocId] = React.useState("");
  const [postingDate, setPostingDate] = React.useState("");
  const [documentCreateDate, setDocumentCreateDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [invoiceCurrency, setInvoiceCurrency] = React.useState("");
  const [documentType, setDocumentType] = React.useState("");
  const [postingId, setPostingId] = React.useState("");
  const [totalOpenAmount, setTotalOpenAmount] = React.useState("");
  const [baselineCreateDate, setBaselineCreateDate] = React.useState("");
  const [custPaymentTerms, setCustPaymentTerms] = React.useState("");
  const [invoiceId, setInvoiceId] = React.useState("");

  const [addButtonClicked, setAddButtonClicked] = React.useState(false);
  const [openMandatoryFieldsPopUp, setOpenMandatoryFieldsPopUp] =
    React.useState(false);

  const handleAddButton = () => {
    setAddButtonClicked(true);
    if (
      customerNumber !== "" &&
      invoiceId !== "" &&
      businessCode !== "" &&
      clearDate !== "" &&
      dueDate !== "" &&
      businessYear !== "" &&
      docId !== "" &&
      postingDate !== "" &&
      documentCreateDate !== "" &&
      invoiceCurrency !== "" &&
      documentType !== "" &&
      postingId !== "" &&
      totalOpenAmount !== "" &&
      baselineCreateDate !== "" &&
      custPaymentTerms !== ""
    ) {
      console.log(customerNumber);

      axios
        .post("http://localhost:8080/invoice-management/addSalesOrder", {
          businessCode,
          customerNumber,
          clearDate,
          businessYear,
          docId,
          postingDate,
          documentCreateDate,
          dueDate,
          invoiceCurrency,
          documentType,
          postingId,
          totalOpenAmount,
          baselineCreateDate,
          custPaymentTerms,
          invoiceId,
        })
        .then((response) => {
          console.log(response);
          alert("Data Added Successfully");

          // setData([])
          // setDataPageCount(0);
        })
        .catch((error) => {
          console.log(error);
        });
      handleClose();
    } else {
      alert("Mandatory Fields cannot be empty!");
      setOpenMandatoryFieldsPopUp(true);
    }
    // console.log(customerNumber);
    // console.log(clearDate);
  };

  const handleClearButton = () => {
    setAddButtonClicked(false);
    setBusinessCode("");
    setCustomerNumber("");
    setClearDate("");
    setBusinessYear("");
    setDocId("");
    setPostingDate("");
    setDocumentCreateDate("");
    setDueDate("");
    setInvoiceCurrency("");
    setDocumentType("");
    setPostingId("");
    setTotalOpenAmount("");
    setBaselineCreateDate("");
    setCustPaymentTerms("");
    setInvoiceId("");
  };

  const handleClose = () => {
    handleClearButton();
    handleCloseAdd();
    // EnhancedTable();
    //   setOpen(false);
  };
  const handleBusinessCode = (event) => {
    setAddButtonClicked(false);
    setBusinessCode(event.target.value);
    // console.log(businessCode);
  };

  const handleCustomerNumber = (event) => {
    setAddButtonClicked(false);
    setCustomerNumber(event.target.value);
    //console.log(customerNumber);
  };
  const handleClearDate = (event) => {
    setAddButtonClicked(false);
    setClearDate(event.target.value);
    //console.log(customerNumber);
  };
  const handleBusinessYear = (event) => {
    setAddButtonClicked(false);
    setBusinessYear(event.target.value);
    //console.log(clearDate);
  };
  const handleDocId = (event) => {
    setAddButtonClicked(false);
    setDocId(event.target.value);
    //console.log(clearDate);
  };
  const handlePostingDate = (event) => {
    setAddButtonClicked(false);
    setPostingDate(event.target.value);
    //console.log(clearDate);
  };
  const handleDocumentCreateDate = (event) => {
    setAddButtonClicked(false);
    setDocumentCreateDate(event.target.value);
    //console.log(clearDate);
  };
  const handleDueDate = (event) => {
    setAddButtonClicked(false);
    setDueDate(event.target.value);
    //console.log(clearDate);
  };
  const handleInvoiceCurrency = (event) => {
    setAddButtonClicked(false);
    setInvoiceCurrency(event.target.value);
    //console.log(clearDate);
  };
  const handleDocumentType = (event) => {
    setAddButtonClicked(false);
    setDocumentType(event.target.value);
    //console.log(clearDate);
  };
  const handlePostingId = (event) => {
    setAddButtonClicked(false);
    setPostingId(event.target.value);
    //console.log(clearDate);
  };
  const handleTotalOpenAmount = (event) => {
    setAddButtonClicked(false);
    setTotalOpenAmount(event.target.value);
    //console.log(clearDate);
  };
  const handleBaselineCreateDate = (event) => {
    setAddButtonClicked(false);
    setBaselineCreateDate(event.target.value);
    //console.log(clearDate);
  };
  const handleCustPaymentTerms = (event) => {
    setAddButtonClicked(false);
    setCustPaymentTerms(event.target.value);
    //console.log(clearDate);
  };
  const handleInvoiceId = (event) => {
    setAddButtonClicked(false);
    setInvoiceId(event.target.value);
    //console.log(clearDate);
  };

  return (
    <div>
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        className="dialog"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle className="title">Add</DialogTitle>

        <Box sx={{ width: "100%" }} className="content">
          <Grid container rowSpacing={2} className="parentGrid">
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Business Code"
                name="businessCode"
                onChange={(event) => handleBusinessCode(event)}
                value={businessCode}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Customer Number"
                type="number"
                name="custNumber"
                onChange={(event) => handleCustomerNumber(event)}
                value={customerNumber}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="date"
                className="search"
                label="Clear Date"
                onChange={(event) => handleClearDate(event)}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                defaultValue="2017-05-24"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Business Year"
                type="number"
                onChange={(event) => handleBusinessYear(event)}
                value={businessYear}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Document Id"
                type="number"
                onChange={(event) => handleDocId(event)}
                value={docId}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Posting Date"
                onChange={(event) => handlePostingDate(event)}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Document Create Date"
                onChange={(event) => handleDocumentCreateDate(event)}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Due Date"
                onChange={(event) => handleDueDate(event)}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Invoice Currency"
                onChange={(event) => handleInvoiceCurrency(event)}
                value={invoiceCurrency}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Document Type"
                onChange={(event) => handleDocumentType(event)}
                value={documentType}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Posting Id"
                type="number"
                onChange={(event) => handlePostingId(event)}
                value={postingId}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Total Open Amount"
                type="number"
                onChange={(event) => handleTotalOpenAmount(event)}
                value={totalOpenAmount}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Baseline Create Date"
                onChange={(event) => handleBaselineCreateDate(event)}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Customer Payment Terms"
                onChange={(event) => handleCustPaymentTerms(event)}
                value={custPaymentTerms}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic"
                className="search"
                label="Invoice Id"
                type="number"
                onChange={(event) => handleInvoiceId(event)}
                value={invoiceId}
                required={true}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>

        <DialogActions className="dialogAction">
          <ColorButtonS onClick={handleAddButton}>ADD</ColorButtonS>
          <ColorButtonC onClick={handleCloseAdd}>CANCEL</ColorButtonC>
        </DialogActions>
      </Dialog>
    </div>
  );
}
