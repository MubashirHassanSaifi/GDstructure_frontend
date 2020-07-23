import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ComplaintListView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [complaints, setComplaints] = useState(null);

  const getComplaints = useCallback(() => {
    axios
      .get('http://localhost:5000/admin/complaintHistory')
      .then((response) => {
        if (isMountedRef.current) {
          setComplaints(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getComplaints();
  }, [getComplaints]);

  if (!complaints) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Complaint  List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results complaints={complaints} />
        </Box>
      </Container>
    </Page>
  );
}

export default ComplaintListView;
