/*
 * Helper - Icons
 */

import React from 'react';
import TheatersIcon from '@material-ui/icons/Theaters';
import TvIcon from '@material-ui/icons/Tv';
import AppleIcon from '@material-ui/icons/Apple';
import SpeakerIcon from '@material-ui/icons/Speaker';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RoomIcon from '@material-ui/icons/Room';
import BuildIcon from '@material-ui/icons/Build';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import LinkIcon from '@material-ui/icons/Link';
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

// Icon helper
const icon = {
    "Error": <ErrorIcon fontSize="large" color="error" key="Error" />,
    "Projektor": <TheatersIcon fontSize="large" key="Projektor" />,
    "Högtalare": <SpeakerIcon fontSize="large" key="Högtalare" />,
    "TV": <TvIcon fontSize="large" key="TV" />,
    "Apple TV": <AppleIcon fontSize="large" key="Apple TV" />,
    "Skärm": <TvIcon fontSize="large" key="Skärm" />,
    "View": <VisibilityIcon fontSize="large" key="View" />,
    "Up": <ArrowUpwardIcon fontSize="large" key="Up" />,
    "Down": <ArrowDownwardIcon fontSize="large" key="Down" />,
    "Add": <AddBoxIcon fontSize="large" key="Add" />,
    "Edit": <EditIcon fontSize="large" key="Edit" />,
    "Delete": <DeleteIcon fontSize="large" key="Delete" />,
    "Swap": <SwapVerticalCircleIcon fontSize="large" key="Swap" />,
    "Building": <HomeWorkIcon fontSize="large" key="Building" />,
    "Alla": <SelectAllIcon fontSize="large" key="Alla" />,
    "Room": <RoomIcon fontSize="large" key="Room" />,
    "Classroom2": <HomeWorkIcon fontSize="large" key="Classroom2" />,
    "Build": <BuildIcon fontSize="large" key="Build" />,
    "Drop-down": <ArrowDropDownIcon fontSize="large" key="Drop-down" />,
    "Drop-up": <ArrowDropUpIcon fontSize="large" key="Drop-up" />,
    "Level": <SupervisorAccountIcon fontSize="large" key="Level" />,
    "LeftArrow": <ChevronLeftIcon fontSize="large" key="Left" />,
    "RightArrow": <ChevronRightIcon fontSize="large" key="Right" />,
    "Save": <SaveIcon fontSize="large" key="Save" />,
    "expand": <ExpandMoreIcon fontSize="large" key="Expand" />,
    "keyboardUp": <KeyboardArrowUpIcon fontSize="large" key="keyboardUp" />,
    "keyboardDown": <KeyboardArrowDownIcon fontSize="large" key="keyboardDown" />,
    "ToggleOn": <ToggleOnIcon fontSize="large" style={{ color: "rgb(46, 174, 52)" }} key="ToggleOn" />,
    "ToggleOff": <ToggleOffIcon fontSize="large" style={{ color: "red" }} key="ToggleOff" />,
    "ToggleOnDefault": <ToggleOnIcon fontSize="large" style={{ color: "rgb(46, 174, 52)" }} key="ToggleOnDefault" />,
    "ToggleOffDefault": <ToggleOffIcon fontSize="large" style={{ color: "red" }} key="ToggleOffDefault" />,
    "Paid": <CheckCircleIcon fontSize="large" style={{ color: "green" }} key="Paid" />,
    "NotPaid": <ErrorOutlineIcon fontSize="large" style={{ color: "red" }} key="NotPaid" />,
    "Done": <CheckCircleOutlineIcon fontSize="large" key="NotPaid" />,
    "Cancel": <CancelIcon fontSize="large" key="Paid" />,
    "Link": <LinkIcon fontSize="large" key="Link" />,
    "AuthLink": <SupervisorAccountIcon fontSize="large" key="AuthLink" />,
    "AdminLink": <SettingsIcon fontSize="large" key="AdminLink" />,
    "Generate": <LibraryAddIcon fontSize="large" key="Generate" />,
}

const getIcon = (name) => icon[name];

export default getIcon;
