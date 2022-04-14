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

export default function FormDialogView({ openView, handleCloseView }) {
  return (
    <div>
      <Dialog
        open={openView}
        onClose={handleCloseView}
        className="dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="title">Analytics View</DialogTitle>

        <Box sx={{ width: "100%" }} className="content">
          <Grid container rowSpacing={2} className="parentGrid">
            <Grid item xs={6}>
              Clear Date
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              Due Date
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              Baseline Create Date
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item lg={6}>
              Invoice Currency
              <TextField
                id="filled-basic"
                className="search"
                label="Invoice Currency"
                style={{ borderRadius: 12 }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="date"
                className="search"
                style={{ borderRadius: 12 }}
                variant="filled"
                type="date"
                format="YYYY-MM-DD"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <DialogActions className="dialogAction">
          <ColorButtonS onClick={handleCloseView}>SUBMIT</ColorButtonS>

          <ColorButtonC onClick={handleCloseView}>CANCEL</ColorButtonC>
        </DialogActions>
      </Dialog>
    </div>
  );
}
