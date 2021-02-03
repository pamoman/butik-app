/*
 * Forgot
 */

import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useMessage } from 'components/messageSystem/Message';
import { reset } from "models/db/db";
import { Grid, Typography, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import useStyles from './Styles';

const Reset = () => {
    const title = "Återställ lösenord",
          [hidden, setHidden] = useState(true),
          [check, setCheck] = useState(true),
          code = new URLSearchParams(useLocation().search).get("code"),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          history = useHistory(),
          classes = useStyles();

    const registerSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        let password = formData.get("password");

        reset(code, password, password)
            .then(data => {
                if ("error" in data) {
                    console.log(data.error);

                    setMessage({ open: true, text: "Ett fel har uppstått, försök igen!", severity: "error" });

                    return false;
                }

                history.push("/login");

                setMessage({ open: true, text: "Klart, logga nu in med det nya lösenordet!", severity: "success" });

                return true;
            });
    };

    const toggleShowPassword = () => {
        setHidden(!hidden);
        setCheck(!check);
    }

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} alignContent="center" justify="center" className="page">
                <Grid item xs={12} md={6}>
                    <h2 className="center">Skriv ditt nya lösenordet nedan.</h2>

                    <form className="form" onSubmit={registerSubmit}>
                        <TextField
                            className="password"
                            id="person-password"
                            name="password"
                            label="Nya lösenordet"
                            size="small"
                            variant="filled"
                            type={hidden ? "password" : "text"}
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
                            label={`${check ? "Visa" : "Dölja"} lösenord`}
                        />

                        <Button
                            name="reset"
                            type="submit"
                            color="primary"
                            size="large"
                            variant="contained"
                        >
                            Bekräfta
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Reset;
