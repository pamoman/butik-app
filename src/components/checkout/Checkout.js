/*
 * Checkout
 */

import React, { useState, Fragment } from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import clsx from 'clsx';
import {
    Box, Typography, TextField, ButtonGroup, Button, Card, CardHeader, Tooltip, CardContent, CardActions,
    Avatar, IconButton, Collapse, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import useStyles from './Styles';
import { useItems } from "components/basket/Basket";