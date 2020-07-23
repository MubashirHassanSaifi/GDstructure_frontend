import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import UserEditForm from './UserEditForm';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function UserEditView() {
  const classes = useStyles();
  const { userId } = useParams();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState();

  const getUser = useCallback(() => {
    axios
      .get(`http://localhost:5000/admin/singleUser/${userId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="User Edit"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <UserEditForm user={user} />
        </Box>
      </Container>
    </Page>
  );
}

export default UserEditView;
