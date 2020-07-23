import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    maxWidth: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function UserListView() {
  const classes = useStyles();


  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState(null);

  const getUsers = useCallback(() => {
    axios
      .get('http://localhost:5000/admin/userinfo')
      .then((response) => {
        if (isMountedRef.current) {
          setUsers(response.data);
        }
      });
  }, [isMountedRef]);
  useEffect(() => {
    getUsers();
  }, []);


  if (!users) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Users List"
    >
      <Container maxWidth={false}>
        <Header />

        {users && (
          <Box mt={3}>
            <Results users={users} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default UserListView;
