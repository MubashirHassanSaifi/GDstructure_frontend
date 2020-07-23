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
import { setUnitThreshole } from 'src/store/actions/energyAction';
import { useSnackbar } from 'notistack';
// import wait from 'src/utils/wait';


export default function FormDialog() {
  const energy = useSelector((state) => state.energy.energy);
  const id = energy._id;
  const [open, setOpen] = React.useState(false);
  const [value, setvalue] = React.useState(null);
  const dispatch = useDispatch();
  // const energy = useSelector((state) => state.energy.energy);
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line no-underscore-dangle
  // const id = energy.map((f) => f._id);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (value == null || value === undefined) {
      enqueueSnackbar('Please enter the limit', { variant: 'error' });
    } else {
      dispatch(setUnitThreshole(value, id[0]));
      // await wait(1000);
      enqueueSnackbar('Threshole is set successfully', { variant: 'success' });

      setOpen(false);
    }
  };

  const handleChange = (event) => {
    setvalue(event.target.value);
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
        <DialogTitle id="form-dialog-title">Unit Threshole</DialogTitle>
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
            onChange={handleChange}
            fullWidth
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
