import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import "./add.css";
import { DialogContent } from "@mui/material";
import axios from "axios";

const ColorButtonS = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 130px",
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
  padding: "6px 130px",
  backgroundColor: "#2d4250",
  borderColor: "#FFFFFF",
  border: "solid 1px",
  "&:hover": {
    backgroundColor: "#FF0000",
    borderColor: "#FFFFFF",
  },
});

export default function FormDialogDelete({
  selected,
  openDelete,
  handleCloseDelete,
}) {
  const handleDelete = () => {
    const doc_id = selected[0];
    if (doc_id !== " ") {
      axios
        .post("http://localhost:8080/invoice-management/deleteSalesOrder", {
          doc_id,
        })
        .then((response) => {
          console.log(response);
          handleClose();
          alert("Data deleted Successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Data Not Deleted");
        });
    }
    const handleClose = () => {
      // setOpen(false);
    };
  };

  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        className="dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="title">Delete Records? </DialogTitle>

        <DialogContent className="title">
          Are you sure you want to delete these record[s]?
        </DialogContent>

        <DialogActions className="dialogAction">
          <ColorButtonC onClick={handleCloseDelete}>CANCEL</ColorButtonC>

          <ColorButtonS onClick={handleDelete}>DELETE</ColorButtonS>
        </DialogActions>
      </Dialog>
    </div>
  );
}
