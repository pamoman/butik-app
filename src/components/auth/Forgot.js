/*
 * Forgot
 */

import React, { useState } from 'react';
import { useMessage } from 'components/messageSystem/Message';
import { forgot } from "models/db/db";
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import useStyles from './Styles';

const Forgot = () => {
    const title = "Glömt lösenord",
          [email, setEmail] = useState(""),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          classes = useStyles();

    const registerSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");

        forgot(email)
            .then(data => {
                if ("error" in data) {
                    console.log(data.error);

                    setMessage({ open: true, text: "E-postadressen finns inte!", severity: "error" });

                    return false;
                }

                setEmail("");
                setMessage({ open: true, text: "En epost har skickats till dig!", severity: "success" });

                return true;
            });
    };

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} justify="center" className="page">
                <Grid item xs={12} md={6}>
                    <h2 className="center">Mata in din epost address nedan för att återställa lösenordet.</h2>

                    <form className="form" onSubmit={registerSubmit}>
                        <TextField
                            id="person-email"
                            name="email"
                            label="Epost"
                            type="email"
                            size="small"
                            variant="filled"
                            required
                            InputProps={{ disableUnderline: true }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            name="forgot"
                            type="submit"
                            color="primary"
                            size="large"
                            variant="contained"
                        >
                            Skicka
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Forgot;
