import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// Field should be wrapp by a 'with...'

const IssueFormField = ({value, setValue, placeholder, label, id}) => {

  const onNameChange = (event) => {
    setValue(event.target.value);
  }

  const input = (<TextField required id={id}
      label="Required"
      onChange={onNameChange}
      palceholder={placeholder}/>);

  return (
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={value}
          control={input}
          label={label}
          labelPlacement="start"
        />
      </FormGroup>
  );
};

const MultiLineIssueFormField = ({value, setValue, placeholder, label, id}) => {
  const onValueChange = (event) => {
    setValue(event.target.value);
  };
  const input = (<TextField
          id={id}
          label={label}
          multiline
          rowsMax={4}
          value={value}
          onChange={onValueChange}
        />);

  return (
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={label}
          control={input}
          label={label}
          labelPlacement="start"
        />
      </FormGroup>
  );
};

const IssueReporter = ({service, title, onActivate}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [report, setReport] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClickOpen = () => {
    onActivate();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem color="inherit" onClick={handleClickOpen}>{title}</MenuItem>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
        fullWith={true}
        maxWidth={"lg"}
        fullScreen={fullScreen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Issue Reporter
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Report an issue about the service {service.name}
          </Typography>
          <form className={classes.form} noValidate>
            <FormControl component="fieldset" className={classes.formControl}>
              <IssueFormField value={name} setValue={setName} placeholder={"Yur name"} label={"Your name"} id={"name-input"} />
              <IssueFormField value={email} setValue={setEmail} placeholder={"Your email"} label={"Your email"} id={"email-input"} />
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Switch color="primary" />}
                  label="Functional blocker"
                  labelPlacement="start"
                />
              </FormGroup>
              <MultiLineIssueFormField value={report} setValue={setReport} placeholder={"Describe your issue"} label={"Comment"} id={"report-input"} />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Send report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IssueReporter;