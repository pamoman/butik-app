/*
 * Register
 */

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useLoadingEffect } from "components/loading/Loading";
import { DEPARTMENTS } from 'models/buy/buy.js';
import { useRegisterUser } from 'models/auth/auth.js';
import BarcodeReader from 'react-barcode-reader';
import scanTag from 'assets/img/scan-tag.png';
import getIcon from 'models/icon/Icon';
import { Grid, Box, Typography, FormControlLabel, Checkbox, Button, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Register = () => {
    const title = "Registrera",
          [tag, setTag] = useState(false),
          [check, setCheck] = useState(false),
          [department, setDepartment] = useState("start"),
          [password1, setPassword1] = useState(""),
          [password2, setPassword2] = useState(""),
          [registerUser] = useRegisterUser(),
          classes = useStyles();
    
    const register = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        let data = {
            "username": tag,
            "firstname": formData.get("firstname"),
            "lastname": formData.get("lastname"),
            "email": formData.get("email"),
            "department": formData.get("department"),
            "password": formData.get("password"),
            "confirmed": true,
            "blocked": false
        };

        registerUser(data);
    };

    /*---- Data query start ----*/
    const { loading, error, data } = useQuery(DEPARTMENTS);

    useLoadingEffect(loading);

    error && console.log(`Error! ${error.message}`);
    /*---- Data query end ----*/

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} justify="center" className="page">
                {!tag ?
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
                        <form className="form" onSubmit={register}>
                            <TextField
                                id="person-firstname"
                                name="firstname"
                                label="Förnamn"
                                type="text"
                                size="small"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                                autoFocus={true}
                            />

                            <TextField
                                id="person-lastname"
                                name="lastname"
                                label="Efternamn"
                                type="text"
                                size="small"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                            />

                            <TextField
                                id="person-email"
                                name="email"
                                label="Epost"
                                type="email"
                                size="small"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                            />

                            <TextField
                                className={classes.invoiceInput}
                                id="department"
                                name="department"
                                label="Förvald Enhet"
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                value={department}
                                required
                                variant="filled"
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option key={`bill-01`} value={"start"} disabled>Välj här</option>

                                {data && data.departments.map((d, i) => (
                                    <option key={`department-${i}`} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </TextField>

                            <TextField
                                className="password"
                                id="person-password-1"
                                name="password"
                                label="Pinkod"
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

                            <Box className={classes.spreadBox}>
                                <Button
                                    className="backToScan"
                                    startIcon={getIcon("LeftArrow")}
                                    onClick={() => setTag("")}
                                >
                                    Tillbaka
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
                                    label={"Visa pinkod"}
                                />
                            </Box>

                            <Button
                                name="login"
                                type="submit"
                                color="primary"
                                size="large"
                                variant="contained"
                                disabled={password1 !== password2}
                            >
                                Registrera
                            </Button>
                        </form>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
};

export default Register;