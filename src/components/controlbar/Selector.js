/*
 * Selector
 */

import React from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from 'models/buy/buy.js';
import { useDepartment } from "config/auth";
import { TextField, ButtonGroup } from '@material-ui/core';
import useStyles from './Styles';

const Selector = () => {
    const classes = useStyles(),
        [department, setDepartment] = useDepartment();

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
                onChange={(e) => setDepartment(e.target.value)}
            >
                <option key={`bill-01`} value={"start"} disabled>Välj här</option>

                {data && data.departments.map((d, i) => (
                    <option key={`department-${i}`} value={d.id}>
                        {d.name}
                    </option>
                ))}
            </TextField>
        </ButtonGroup>
    )
}

export default Selector;