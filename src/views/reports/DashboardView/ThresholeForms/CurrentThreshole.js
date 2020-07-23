/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';
import { setCurrentThreshle } from 'src/store/actions/energyAction';


export default function FormDialog() {
  const energy = useSelector((state) => state.energy.energy);
  const id = energy._id;
  const [open, setOpen] = React.useState(false);
  const [value, setvalue] = React.useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setvalue(event.target.value);
  };

  const handleSubmit = () => {
    if (value === null || value === undefined) {
      enqueueSnackbar('Please enter the limit', { variant: 'error' });

      // setOpen();
    } else {
      dispatch(setCurrentThreshle(value, id[0]));
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
        <DialogTitle id="form-dialog-title">Current Threshole</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Values to set threshold
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="upperlmt"
            label="Upper Limit"
            type="number"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
