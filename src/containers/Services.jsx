import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';

import { fetchServices, restartServiceById } from '../lib/kafka-services.service';
import ServiceCard from '../components/ServiceCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const classes = useStyles();

  const restartService = async (serviceId) => {
    setLoading(true);
    await restartServiceById(serviceId);
    await loadServices();
  }

  const loadServices = async () => {
      setLoading(true);
      const s = await fetchServices();
      setServices(s);
      setLoading(false);
      setSnackOpen(true);
    };

  useEffect(() => {
    loadServices();
  }, []);

  const s = services.map((srv, index) => (<ServiceCard service={srv} loadServices={loadServices} restartService={restartService} key={index}/>));

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <h1>Wiring services statuses</h1>
      <Grid container spacing={3}>
      {s}
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <div>Restarting...</div>
        <Divider />
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          Service successfully fetched
        </Alert>
      </Snackbar>
    </>
  );
};

export default Services;