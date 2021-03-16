/*
 * Selector
 */

import React, { useState, useEffect } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from 'models/buy/buy.js';
import { useUser } from "config/auth";
import { TextField, IconButton, ButtonGroup } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Selector = () => {
    const classes = useStyles(),
          [user, setUser] = useUser(),
          [department, setDepartment] = useState(user?.info?.department?.name || "");
    
    const updateDepartment = (e) => {
        const updatedDepartment = e.target.value;

        user.info.department.name = updatedDepartment;

        setUser(user);
        console.log(user.info.department.name);
        setDepartment(updatedDepartment);
    };

    /*---- Data query start ----*/
    const { loading, error, data } = useQuery(DEPARTMENTS);

    useLoadingEffect(loading);

    error && console.log(`Error! ${error.message}`);
    /*---- Data query end ----*/

    return (
        <ButtonGroup color="primary" aria-label="Select">
            <TextField
                id="department"
                select
                SelectProps={{
                    native: true,
                }}
                InputProps={{
                    classes: {
                        root: classes.controlSelector,
                        notchedOutline: classes.notchedOutline
                    },
                }}
                value={department}
                onChange={updateDepartment}
            >
                <option key={`bill-01`} value={"start"} disabled>Välj här</option>

                {data && data.departments.map((d, i) => (
                    <option key={`department-${i}`} value={d.name}>
                        {d.name}
                    </option>
                ))}
            </TextField>
        </ButtonGroup>
    )
}

export default Selector;