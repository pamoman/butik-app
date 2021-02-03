import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        controlBar: {
            paddingLeft: "1rem",
            paddingRight: "1rem",
            "& .MuiSelect-icon": {
                color: theme.palette.iconButton.primary.main
            },
        },
        controlSelector: {
            border: "none",
            color: theme.palette.iconButton.primary.main,
            fontSize: "1.2rem",
        },
        // Important - removes outline on select field
        notchedOutline: { 
            border: "none",
        },
        leftPanel: {
            "& svg.MuiSvgIcon-root": {
                fontSize: "2rem"
            },
            [theme.breakpoints.down('sm')]: {
                order: 1
            },
        },
        centerPanel: {
            [theme.breakpoints.down('sm')]: {
                order: 3
            }
        },
        rightPanel: {
            "& svg.MuiSvgIcon-root": {
                fontSize: "3rem"
            },
            [theme.breakpoints.down('sm')]: {
                order: 2,
            },
        }
    }
});

export default useStyles;