import React from 'react';
import {
  CircularProgress,
  IconButton
} from '@material-ui/core';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteIconButton(props) {
  const {
    value,
    tableMeta
  } = props;

  const [loading, setLoading] = React.useState(false);
  const handleTrash = async (sensor) => {
    setLoading(true);
    const data = {
      sensor
    };
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    try {
      axios.delete('http://localhost:5000/energysensor/delete', {
        data: {
          sensor
        }
      }, config);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    // setLoading(false);
  };


  return (
    <IconButton
      key={value}
      aria-label="delete"
      onClick={
      () => handleTrash(value)
    }
    >
      {' '}
      {
      loading ? (
        <CircularProgress size={20} />
      ) : <DeleteIcon />
    }
    </IconButton>
  );
}
