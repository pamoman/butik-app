/*
 * MessageSystem
 */

import React from 'react';
import { useMessage } from 'components/messageSystem/Message';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './Styles';

const MessageSystem = () => {
    const messageContext = useMessage(),
          open = messageContext.message.open,
          text = messageContext.message.text,
          severity = messageContext.message.severity,
          setMessage = messageContext.setMessage,
          classes = useStyles();
    
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const errorClose = (event, reason) => {

        setMessage({ text: "", severity: "", open: false });
    };

    return (
        <Snackbar
            className={classes.messageContainer}
            open={open}
            autoHideDuration={5000}
            onClose={errorClose}
        >
            <Alert className={classes.message} onClose={errorClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default MessageSystem;