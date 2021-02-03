/*
 * Login
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from 'models/auth/auth.js';
import { useMessage } from 'components/messageSystem/Message';
import { Grid, Typography, FormControlLabel, Checkbox, Button, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Login = () => {
    const title = "Logga in",
          [hidden, setHidden] = useState(true),
          [check, setCheck] = useState(false),
          [login] = useLoginMutation(),
          history = useHistory(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          classes = useStyles();

    const logon = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        let person = {
            "username": formData.get("username"),
            "password": formData.get("password")
        };

        login(person.username, person.password)
            .catch(error => { 
                console.log(error);
                setMessage({ open: true, text: "Ogiltid epost eller lösenord!", severity: "error" });
            });
    }

    const toggleShowPassword = () => {
        setHidden(!hidden);
        setCheck(!check);
    }

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} justify="center" className="page">
                <Grid item xs={12} sm={6}>
                    <form className="form" onSubmit={logon}>
                        <TextField
                            id="person-username"
                            name="username"
                            label="Tag"
                            type="number"
                            size="small"
                            variant="filled"
                            required
                            InputProps={{ disableUnderline: true }}
                        />

                        <TextField
                            className="password"
                            id="person-password"
                            name="password"
                            label="Pin"
                            type={hidden ? "password" : "text"}
                            size="small"
                            variant="filled"
                            required
                            InputProps={{ disableUnderline: true }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={check}
                                    onChange={toggleShowPassword}
                                    name="checkedB"
                                    style={{ color: "white" }}
                                />
                            }
                            label={`${check ? "Dölja" : "Visa"} pin`}
                        />
                        
                        <Button
                            name="login"
                            type="submit"
                            color="primary"
                            size="large"
                            variant="contained"
                        >
                            Logga in
                        </Button>

                        <Button
                            name="forgot"
                            type="submit"
                            color="secondary"
                            size="large"
                            variant="contained"
                            onClick={() => history.push("/forgot")}
                        >
                            Glömt pin?
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;