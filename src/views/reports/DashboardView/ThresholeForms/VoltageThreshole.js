/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setVoltageThreshle } from 'src/store/actions/energyAction';
import { useSnackbar } from 'notistack';


export default function FormDialog() {
  const energy = useSelector((state) => state.energy.energy);
  const id = energy._id;
  const [open, setOpen] = React.useState(false);
  const [lowerValue, setlowervalue] = React.useState(null);
  const [upperValue, setuppervalue] = React.useState(null);
  // const energy = useSelector((state) => state.energy.energy);
  // const Vlowerlmt = energy.V_lowerLmt;
  // const Vupperlmt = energy.V_upperLmt;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlChangeLower = (event) => {
    setlowervalue(event.target.value);
  };
  const handleChangeUpper = (event) => {
    setuppervalue(event.target.value);
  };
  const handleSubmit = () => {
    if (lowerValue === null && upperValue === null) {
      enqueueSnackbar('Please enter limits', { variant: 'error' });
    } else if (lowerValue === null || lowerValue === undefined) {
      enqueueSnackbar('Please enter lower limit', { variant: 'error' });
    } else if (upperValue === null || upperValue === undefined) {
      enqueueSnackbar('Please enter upper limit', { variant: 'error' });
    } else if (lowerValue !== null && upperValue !== null) {
      dispatch(setVoltageThreshle(lowerValue, upperValue, id[0]));

      enqueueSnackbar('Threshole is set successfully', { variant: 'success' });
      setOpen(false);
    }
  };

  return (
    <div>


      <Button
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        Set Threshole
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Voltage Threshole</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Values to set threshold
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="lowerlmt"
            label="Lower Limit"
            type="number"
            onChange={handlChangeLower}
            fullWidth

          />
          <TextField

            margin="dense"
            id="upperlmt"
            label="Upper Limit"
            type="number"
            onChange={handleChangeUpper}
            fullWidth

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Set Threshole
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
