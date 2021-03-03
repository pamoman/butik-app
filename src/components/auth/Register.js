/*
 * Register
 */

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useLoadingEffect } from "components/loading/Loading";
import { useHistory } from 'react-router-dom';
import { useMessage } from 'components/messageSystem/Message';
import { DEPARTMENTS } from 'models/buy/buy.js';
import { useRegisterUser } from 'models/auth/auth.js';
import { Grid, Typography, FormControlLabel, Checkbox, Button, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Register = () => {
    const title = "Registrera",
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
            "username": formData.get("username"),
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
                <Grid container spacing={4} justify="center" className="page">
                    <Grid item xs={12} sm={6}>
                        <form className="form" onSubmit={register}>
                            <TextField
                                id="person-username"
                                name="username"
                                label="Tag"
                                type="text"
                                size="small"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
                                autoFocus={true}
                            />

                            <TextField
                                id="person-firstname"
                                name="firstname"
                                label="Förnamn"
                                type="text"
                                size="small"
                                variant="filled"
                                required
                                InputProps={{ disableUnderline: true }}
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
                                error={password1 !== password2}
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
                                label={`${check ? "Dölja" : "Visa"} pinkod`}
                            />
                            
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
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Register;