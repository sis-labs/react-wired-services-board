import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red, green } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ServiceConfigurationInfo from './ServiceConfigurationInfo';
import IssueReporter from './IssueReporter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  avatarDown: {
    backgroundColor: red[500],
  },
  avatarUp: {
    backgroundColor: green[500],
  },
}));

const ServiceCard = ({service, restartService, loadServices}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const icon = service.status === "UP" ? (<Icon>check</Icon>) : (<Icon>warning</Icon>);
  const cName = service.status === "UP" ? classes.avatarUp : classes.avatarDown;
  const serviceShort = service.name.toUpperCase().substring(0,1);

  const handleRestartClick = () => {
    restartService(service.id);
  };

  const handleReloadClick = () => {
    loadServices();
  };

  return (
    <>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={cName}>
                {serviceShort}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleMenuClick} />
              </IconButton>
            }
            title={service.name}
            subheader={`version: ${service.version}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {icon} Service is: {service.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" disabled={service.status === 'UP'} onClick={handleRestartClick}>
              Restart
            </Button>
            <Button size="small" color="primary" onClick={handleReloadClick}>
              Refresh
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Menu
          id={`${service.id}-menu`}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <ServiceConfigurationInfo onActivate={handleMenuClose} serviceName={service.name} configuration={service.configuration} title={"Show configuration information"} />
          <IssueReporter onActivate={handleMenuClose} service={service} title={"Report issue"} />
          <MenuItem onClick={handleMenuClose}>Help</MenuItem>
      </Menu>
    </>
  );
};

export default ServiceCard;