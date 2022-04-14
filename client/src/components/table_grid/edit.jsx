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
  padding: "6px 148px",
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
  padding: "6px 138px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    backgroundColor: "#FF0000",
    borderColor: "#FFFFFF",
  },
});

export default function FormDialogEdit({
  selected,
  openEdit,
  handleCloseEdit,
}) {
  const [newInvoiceCurrency, setNewInvoiceCurrency] = React.useState("");
  const [newCustPaymentTerms, setNewCustPaymentTerms] = React.useState("");

  const handleInvoiceAmount = (event) => {
    // setSaveButtonClicked(false);
    setNewInvoiceCurrency(event.target.value);
    console.log(newInvoiceCurrency);
    console.log(selected[0]);
  };
  const handleNewCustPaymentTerms = (event) => {
    // setSaveButtonClicked(false);
    setNewCustPaymentTerms(event.target.value);
    console.log(newCustPaymentTerms);
  };

  const handleSave = () => {
    const doc_id = selected[0];
    if (
      newInvoiceCurrency !== "" &&
      newCustPaymentTerms !== "" &&
      doc_id !== " "
    ) {
      axios
        .post("http://localhost:8080/invoice-management/EditSalesOrder", {
          newInvoiceCurrency,
          newCustPaymentTerms,
          doc_id,
        })
        .then((response) => {
          console.log(response);
          handleClose();
          alert("Data Updated Successfully");
          // setData([])
          // setDataPageCount(0);
        })
        .catch((error) => {
          console.log(error);
          alert("Data Not Updated");
        });
    } else {
      alert("Mandatory Fields cannot be empty!");
    }
    // setSaveButtonClicked(true);
  };

  const handleClose = () => {
    handleCloseEdit();
    // setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        className="dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="title">Edit</DialogTitle>

        <Box sx={{ width: "100%" }} className="content">
          <Grid container rowSpacing={2} className="parentGrid">
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Invoice Currency"
                value={newInvoiceCurrency}
                onChange={(event) => handleInvoiceAmount(event)}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>

            <Grid item lg={6}>
              <TextField
                id="filled-basic"
                className="search"
                label="Customer Payment Terms"
                value={newCustPaymentTerms}
                onChange={(event) => handleNewCustPaymentTerms(event)}
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>

        <DialogActions className="dialogAction">
          <ColorButtonS onClick={handleSave}>EDIT</ColorButtonS>
          <ColorButtonC onClick={handleCloseEdit}>CANCEL</ColorButtonC>
        </DialogActions>
      </Dialog>
    </div>
  );
}
