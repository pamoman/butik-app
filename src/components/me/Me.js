/*
 * Me
 */

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useLoadingEffect } from "components/loading/Loading";
import { useUser } from "config/auth";
import { useMessage } from 'components/messageSystem/Message';
import { DEPARTMENTS } from 'models/buy/buy.js';
import { useUpdateUser } from 'models/auth/auth.js';
import { Grid, Typography, FormControlLabel, Checkbox, Button, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Me = () => {
    const title = "Mitt Konto",
          [check, setCheck] = useState(false),
          [user] = useUser(),
          [firstname, setFirstname] = useState(user.info.firstname),
          [lastname, setLastname] = useState(user.info.lastname),
          [email, setEmail] = useState(user.email),
          [department, setDepartment] = useState(user.info.department.id),
          [password1, setPassword1] = useState(""),
          [password2, setPassword2] = useState(""),
          [updateUser] = useUpdateUser(),
          classes = useStyles();
    
    const save = (e) => {
        e.preventDefault();

        const where = {
            id: user.id
        };

        const data = {
            firstname,
            lastname,
            email,
            department
        };

        password2 && password1 === password2 && (data.password = password2);

        updateUser(where, data)
        .then(() => { setPassword1(""); setPassword2("") });
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
                        <form className="form" onSubmit={save}>
                            <TextField
                                id="person-firstname"
                                name="firstname"
                                label="Förnamn"
                                type="text"
                                size="small"
                                variant="filled"
                                required
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
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
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
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
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                InputProps={{ disableUnderline: true }}
                            />

                            <TextField
                                id="department"
                                name="department"
                                label="Förvald Enhet"
                                select
                                variant="filled"
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
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
                                name="password1"
                                label="Ny Pinkod"
                                type={!check ? "password" : "text"}
                                size="small"
                                variant="filled"
                                required={password2 && true}
                                value={password1}
                                onChange={(e) => /^[0-9]{0,4}$/.test(e.target.value) && setPassword1(e.target.value)}
                                InputProps={{ disableUnderline: true }}
                            />

                            <TextField
                                className="password"
                                id="person-password-2"
                                name="password2"
                                label="Bekräfta Ny Pinkod"
                                type={!check ? "password" : "text"}
                                size="small"
                                variant="filled"
                                required={password1 && true}
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
                                Spara
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Me;