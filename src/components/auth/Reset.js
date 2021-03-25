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
    const title = "Återställ pinkod",
          [check, setCheck] = useState(false),
          [password1, setPassword1] = useState(""),
          [password2, setPassword2] = useState(""),
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

                setMessage({ open: true, text: "Klart, logga nu in med den nya pinkod!", severity: "success" });

                return true;
            });
    };

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} alignContent="center" justify="center" className="page">
                <Grid item xs={12} md={6}>
                    <h2 className="center">Skriv en ny pinkod nedan.</h2>

                    <form className="form" onSubmit={registerSubmit}>
                        <TextField
                            className="password"
                            id="person-password-1"
                            name="password"
                            label="Ny pinkod"
                            type={!check ? "password" : "text"}
                            size="small"
                            variant="filled"
                            required
                            value={password1}
                            onChange={(e) => /^[0-9]{0,4}$/.test(e.target.value) && setPassword1(e.target.value)}
                            InputProps={{ disableUnderline: true }}
                        />

                        <TextField
                            className="password"
                            id="person-password-2"
                            name="password2"
                            label="Bekräfta Pinkod"
                            type={!check ? "password" : "text"}
                            size="small"
                            variant="filled"
                            required
                            value={password2}
                            error={password2 && password2.length === 4 && password1 !== password2}
                            onChange={(e) => /^[0-9]{0,4}$/.test(e.target.value) && setPassword2(e.target.value)}
                            InputProps={{ disableUnderline: true }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={check}
                                    onChange={() => setCheck(!check)}
                                    name="checkedB"
                                    style={{ color: "white" }}
                                />
                            }
                            label={"Visa pinkod"}
                        />

                        <Button
                            name="reset"
                            type="submit"
                            color="primary"
                            size="large"
                            variant="contained"
                            disabled={password1 !== password2}
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
