import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import ComplaintInfo from './ComplaintInfo';
import ComplaintDesc from './ComplaintDescription';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function OrderDetailsView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [complaint, setComplaint] = useState(null);
  const { complaintId } = useParams();

  const getComplaint = useCallback(() => {
    axios
      .get(`http://localhost:5000/admin/getComplaint/${complaintId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setComplaint(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getComplaint();
  }, [getComplaint]);

  if (!complaint) {
    return null;
  }
  return (
    <Page
      className={classes.root}
      title="complaint Details"
    >
      <Container maxWidth={false}>
        <Header complaint={complaint} />
        <Box mt={2}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xl={3}
              xs={12}
            >
              <ComplaintInfo complaint={complaint} />
            </Grid>
            <Grid
              item
              md={8}
              xl={9}
              xs={12}
            >
              <ComplaintDesc complaint={complaint} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default OrderDetailsView;
