//import _ from 'lodash'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { withGlobalState } from 'react-globally'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, messages, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  console.log(typeof(messages))
  const isMessagesArray = Array.isArray(messages);
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {
            isMessagesArray ? 
              
                <ul>
                {messages.map((mesg, index) => (
                   <li key={index}>{mesg.errorMessage}</li> 
                ))}
                </ul>
              
            : <div>error message</div>
          }    
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class FormMessages extends React.Component {
  state = {
    errorMessage: 'error message', 
  }

  handleClose(){
    console.log("handleClose");
    this.props.setGlobalState(prevGlobalState => ({
      hasMessage: false
    }))
  }

  render() {
    const { globalState } = this.props;
    console.log(">>> " + globalState.hasMessage);
    console.log(">>> " + JSON.stringify(globalState.messages));
    if (globalState.hasMessage) {
      // You can render any custom fallback UI
      
      return (
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={globalState.hasMessage}
              autoHideDuration={6000}
              onClose={this.handleClose.bind(this)}
            >
            <MySnackbarContentWrapper 
              onClose={this.handleClose.bind(this)} 
              variant= {globalState.variant} 
              messages={globalState.messages} 
            />
            </Snackbar>
          </div>
      )
    }
    return (
      <div>  
      </div>
    );
  }
}

FormMessages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withGlobalState(withStyles(styles)(FormMessages));