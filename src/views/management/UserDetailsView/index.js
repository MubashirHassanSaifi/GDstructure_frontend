/* eslint-disable no-empty */
import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Details from './Details';
import Complaint from './Complaints';
import Logs from './Logs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function UserDetailsView() {
  const classes = useStyles();
  const {
    userId
  } = useParams();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'logs', label: 'Logs' },
    { value: 'complaints', label: 'Complaints' }

  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  const getSingleUser = useCallback(() => {
    axios
      .get(`http://localhost:5000/admin/singleUser/${userId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data);
        }
      });
  }, []);

  const getLogs = useCallback(() => {
    axios
      .get(`http://localhost:5000/admin/userloginHistory/${userId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setLogs(response.data);
        }
      });
  }, []);


  useEffect(() => {
    getSingleUser();
    getLogs();
  }, []);


  if (!user) {
    return null;
  }

  return (

    <Page
      className={classes.root}
      title="User Details"
    >
      <Container maxWidth={false}>
        <Header customer={user} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'details' && <Details user={user} />}
          {currentTab === 'logs' && <Logs logs={logs} />}
          {currentTab === 'complaints' && <Complaint />}
        </Box>
      </Container>
    </Page>
  );
}

export default UserDetailsView;
