/*
 * Login
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from 'models/auth/auth.js';
import { useMessage } from 'components/messageSystem/Message';
import BarcodeReader from 'react-barcode-reader';
import scanTag from 'assets/img/scan-tag.png';
import getIcon from 'models/icon/Icon';
import { Grid, Box, Typography, FormControlLabel, Checkbox, Button, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Login = () => {
    const title = "Logga in",
          [tag, setTag] = useState(false),
          [check, setCheck] = useState(false),
          [password, setPassword] = useState(""),
          [login] = useLoginMutation(),
          history = useHistory(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          classes = useStyles({ tag });

    const logon = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        let person = {
            "username": tag,
            "password": formData.get("password")
        };

        login(person.username, person.password)
            .catch(error => { 
                console.log(error);
                setMessage({ open: true, text: "Ogiltid epost eller lösenord!", severity: "error" });
            });
    };

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} justify="center" className="page">
                {!tag
                    ?
                    <Grid item xs={12} sm={6}>
                        <BarcodeReader
                            onError={value => setTag(value)}
                        />
                        
                        <Typography variant="h3" align="center" gutterBottom>
                            Skanna din tagg
                        </Typography>

                        <Box className={classes.tag}>
                            <img src={scanTag} alt="Tag" />
                        </Box>
                    </Grid>
                    :
                    <Grid item xs={12} sm={6}>
                        <form className="form" onSubmit={logon}>
                            <Typography className={classes.backToScanContainer} variant="h4" align="center" gutterBottom>
                                Skriv din pinkod
                            </Typography>

                            <TextField
                                className="password"
                                id="person-password"
                                name="password"
                                label="Pinkod"
                                type={!check ? "password" : "text"}
                                size="small"
                                variant="filled"
                                required
                                value={password}
                                onChange={(e) => /^[0-9]{0,4}$/.test(e.target.value) && setPassword(e.target.value)}
                                InputProps={{ disableUnderline: true }}
                                autoFocus={true}
                            />

                            <Box className={classes.spreadBox}>
                                <Button
                                    className="backToScan"
                                    startIcon={getIcon("LeftArrow")}
                                    onClick={() => setTag("")}
                                >
                                    Till Start
                                </Button>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={check}
                                            onChange={() => setCheck(!check)}
                                            name="checkedB"
                                            style={{ color: "white" }}
                                        />
                                    }
                                    label={`${check ? "Dölja" : "Visa"} pin`}
                                />
                            </Box>

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
                }
            </Grid>
        </Grid>
    );
}

export default Login;