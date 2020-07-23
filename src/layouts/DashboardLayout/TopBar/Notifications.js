import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
  Badge
} from '@material-ui/core';
import {
  // Alert as AlertTriangleIcon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Bell as BellIcon,
  Wind as WindIcon,
  UploadCloud as UploadCloudIcon,
  DownloadCloud as DownloadCloudIcon,
  Zap as ZapIcon,
  Power as PowerIcon,
  Activity as ActivityIcon,
  Sliders as SliderIcon,
  BatteryCharging as BatteryChargingIcon
} from 'react-feather';
import { addNotification, clearNotification } from 'src/store/actions/notificationsActions';
import { updateEnergy } from 'src/store/actions/energyAction';
import { useSnackbar } from 'notistack';

const iconsMap = {
  Voltage: BatteryChargingIcon,
  Current: ZapIcon,
  PowerFactor: PowerIcon,
  Unit: ActivityIcon,
  Abnormal: WindIcon,
  PowerFail: SunsetIcon,
  PowerOn: SunriseIcon,
  Connectd_Load_Offline: DownloadCloudIcon,
  Connectd_Load_Online: UploadCloudIcon,
  unbalanced_load: SliderIcon
};

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320
  },
  icon: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.contrastText
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  }
}));

function Notifications() {
  const classes = useStyles();
  const notifications = useSelector((state) => state.notifications.notifications);
  const count = useSelector((state) => state.notifications.count);
  const socket = useSelector((state) => state.socket.socket);
  const userid = useSelector((state) => state.account.user.userid); // for testing
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log(notifications);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeNotification = () => {
    dispatch(clearNotification());
  };

  useEffect(() => {
    socket.on(`${userid}-update`, (data) => {
      dispatch(updateEnergy(data));
    });

    socket.on(`${userid}-notification`, (res) => {
      dispatch(addNotification(res));
      enqueueSnackbar(res.title, {
        variant: res.variant,
        persist: res.persist,
        autoHideDuration: 3000
      });
      if (res.savekey) {
        // console.log(res);
      }
    });
    return () => {
      socket.off();
    };
  }, []);

  return (
    <>
      <Tooltip title="Notifications">

        <Badge
          color="error"
          badgeContent={count}
          variant="dot"
          classes={{ badge: classes.badge }}
        >
          <IconButton
            color="inherit"
            onClick={handleOpen}
            ref={ref}
          >
            <SvgIcon fontSize="small">
              <BellIcon />
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <>
            <List
              className={classes.list}
              disablePadding
            >
              {notifications.map((notification) => {
                const Icon = iconsMap[notification.type];

                return (
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    key={notification.id}
                    to="/app/reports/alerts"
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <Icon />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification.title}
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={notification.created_at}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Box
              p={1}
              display="flex"
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                onClick={hanldeNotification}
                size="small"
                to="#"
              >
                Clear Notifications
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
}

export default Notifications;
