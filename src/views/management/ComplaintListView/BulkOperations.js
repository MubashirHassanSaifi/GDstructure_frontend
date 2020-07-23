import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import {
  Button,
  Drawer,
  Grid,
  Hidden,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Check as CheckIcon,
  X as XIcon,
  Trash as TrashIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function BulkOperations({
  className,
  open,
  selected,
  ...rest
}) {
  console.log(selected);
  const classes = useStyles();
  const [status, setstatus] = useState('rejected');

  const handleRejectedStatus = async () => {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const body = {
      status: 'rejected',
      selectedItems: selected
    };
    const res = await axios.post('http://localhost:5000/admin/complaintStatus', body, config);
    window.location.reload();
  };

  const handleCompletedStatus = async () => {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const body = {
      status: 'completed',
      selectedItems: selected
    };
    const res = await axios.post('http://localhost:5000/admin/complaintStatus', body, config);
    window.location.reload();
  };


  return (
    <Drawer
      anchor="bottom"
      open={open}
      PaperProps={{ elevation: 1 }}
      variant="persistent"
    >
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid
          alignItems="center"
          container
          spacing={2}
        >
          <Hidden smDown>
            <Grid
              item
              md={3}
            >
              <Typography
                color="textSecondary"
                variant="subtitle1"
              >
                {selected.length}
                {' '}
                selected
              </Typography>
            </Grid>
          </Hidden>
          <Grid
            item
            md={6}
            xs={12}
          >
            <div className={classes.actions}>
              <Button onClick={handleCompletedStatus}>
                <SvgIcon
                  fontSize="small"
                  className={classes.actionIcon}
                >
                  <CheckIcon />
                </SvgIcon>
                Completed
              </Button>
              <Button onClick={handleRejectedStatus}>
                <SvgIcon
                  fontSize="small"
                  className={classes.actionIcon}
                >
                  <XIcon />
                </SvgIcon>
                Rejected
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
}

BulkOperations.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func,
  onMarkPaid: PropTypes.func,
  onMarkUnpaid: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.array.isRequired
};

BulkOperations.defaultProps = {
  className: '',
  open: false
};

export default BulkOperations;
